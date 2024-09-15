import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Dashboard({ auth, props }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            soluta doloribus consectetur corrupti minus quia distinctio
            quibusdam omnis, suscipit obcaecati exercitationem maiores ex
            assumenda qui voluptatibus dicta fugit quas eos.
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
