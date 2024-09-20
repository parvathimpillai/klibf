import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

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
        roles: string[];
        created_at: string;
      };
    };
  }; // Define user type

  return (
    <AuthenticatedLayout user={user.data} header={`${user.data.name} Settings`}>
      <Head title="Profile" />

      <div className="mx-auto   w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="grid overflow-auto gap-6 w-full lg:grid-cols-2">
          <UpdateProfileInformationForm
            mustVerifyEmail={false}
            status={status}
            className="max-w-xl"
            user={user.data}
          />

          <UpdatePasswordForm className="max-w-xl" isAdmin={true} />

          <DeleteUserForm
            className="max-w-xl"
            userId={user.data.id}
            isAdmin={true}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
