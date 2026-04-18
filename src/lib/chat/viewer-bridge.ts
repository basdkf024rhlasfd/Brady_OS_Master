/**
 * Viewer Bridge — dispatches pending actions from chat tool results
 * to the iframe viewer via the ProjectFrame sendRef.
 */

import type { PortalAction, ViewerMessage } from "@/components/portal/ProjectFrame";

export type PendingAction = PortalAction & {
  /** Optional callback when viewer responds */
  onResponse?: (msg: ViewerMessage) => void;
};

type SendFn = (action: PortalAction) => string;

/**
 * Dispatches an array of pending actions to the viewer iframe.
 * Returns a Map of requestId → onResponse callback for correlation.
 */
export function dispatchActions(
  actions: PendingAction[],
  send: SendFn
): Map<string, (msg: ViewerMessage) => void> {
  const pending = new Map<string, (msg: ViewerMessage) => void>();

  for (const action of actions) {
    const requestId = send({
      type: action.type,
      payload: action.payload,
    });
    if (action.onResponse) {
      pending.set(requestId, action.onResponse);
    }
  }

  return pending;
}

/**
 * Creates a message handler that resolves pending action callbacks.
 * Attach to onViewerMessage in ProjectFrame.
 */
export function createResponseHandler(
  pendingMap: Map<string, (msg: ViewerMessage) => void>
) {
  return (msg: ViewerMessage) => {
    if (!msg.requestId) return;
    const cb = pendingMap.get(msg.requestId);
    if (cb) {
      cb(msg);
      pendingMap.delete(msg.requestId);
    }
  };
}
