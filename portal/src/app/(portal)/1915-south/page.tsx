import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

<<<<<<< HEAD
export default async function Page1915South() {
=======
export default async function NineteenFifteenSouthPage() {
>>>>>>> origin/main
  await requireProjectAccess("1915-south");

  return (
    <ProjectFrame
      baseUrl="/1915-south/viewer"
      path="/index.html"
<<<<<<< HEAD
      title="1915 South"
=======
      title="1915 South | Ashley"
>>>>>>> origin/main
    />
  );
}
