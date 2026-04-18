"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export type ViewerMessage = {
  source: "mception-viewer";
  type: "state_response" | "action_response" | "ready";
  requestId?: string;
  payload: Record<string, unknown>;
};

export type PortalAction = {
  type: "navigate" | "save_item" | "get_state";
  payload: Record<string, unknown>;
};

export function ProjectFrame({
  baseUrl,
  path = "/",
  title = "Embedded app",
  onViewerReady,
  onViewerMessage,
  sendRef,
}: {
  baseUrl: string;
  path?: string;
  title?: string;
  onViewerReady?: () => void;
  onViewerMessage?: (msg: ViewerMessage) => void;
  sendRef?: React.MutableRefObject<((action: PortalAction) => string) | null>;
}) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [hash, setHash] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendToViewer = useCallback((action: PortalAction): string => {
    const requestId = crypto.randomUUID();
    iframeRef.current?.contentWindow?.postMessage(
      { source: "mception-portal", ...action, requestId },
      "*"
    );
    return requestId;
  }, []);

  // Expose send function to parent via ref
  useEffect(() => {
    if (sendRef) sendRef.current = sendToViewer;
    return () => { if (sendRef) sendRef.current = null; };
  }, [sendRef, sendToViewer]);

  // Listen for viewer messages
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.source !== "mception-viewer") return;
      const msg = event.data as ViewerMessage;
      if (msg.type === "ready") onViewerReady?.();
      onViewerMessage?.(msg);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onViewerReady, onViewerMessage]);

  useEffect(() => {
    setHash(window.location.hash);
    setReady(true);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="relative h-full w-full">
      {(!ready || iframeLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent-brand" />
        </div>
      )}
      {ready && (
        <iframe
          ref={iframeRef}
          src={`${baseUrl}${path}${hash}`}
          title={title}
          className="h-full w-full border-0"
          onLoad={() => setIframeLoading(false)}
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-top-navigation allow-downloads"
        />
      )}
    </div>
  );
}
