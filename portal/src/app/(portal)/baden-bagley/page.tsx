import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function BadenBagleyPage() {
  await requireProjectAccess("baden-bagley");

  return (
    <ProjectFrame
      baseUrl="https://basdkf024rhlasfd.github.io/baden-bagley"
      path="/"
      title="Baden Bagley"
    />
  );
}
