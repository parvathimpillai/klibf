import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import DeleteUserForm from "../Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "../Profile/Partials/UpdateProfileInformationForm";

export default function EditUser() {
  const { user } = usePage().props as unknown as {
    user: {
      data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
      };
    };
  }; // Define user type

  return (
    <AuthenticatedLayout
      user={user.data}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid sticky top-32 gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <h1 className="text-3xl font-semibold text-primary">Settings</h1>
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div className="grid overflow-auto gap-6">
          <UpdateProfileInformationForm
            mustVerifyEmail={false}
            status={status}
            className="max-w-xl"
            user={user.data}
          />

          <UpdatePasswordForm className="max-w-xl" isAdmin={true} />

          <DeleteUserForm className="max-w-xl" isAdmin={true} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
