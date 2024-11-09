import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps, User, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { DataTableWrapper } from "@/Components/DataTable/DataTableWrapper";
import { Badge } from "@/Components/ui/badge";
import { CreateUserSheet } from "./Create";
import { getInitials } from "@/hooks/helpers";
import { RowActions } from "@/Components/DataTable/RowActions";
import { toast } from "sonner";

export default function Users({ auth }: PageProps) {
  const { users, message, roles, filters } = usePage<UsersPageProps>().props;
  const { delete: destroy } = useForm();

  const handleDelete = (user: User) => {
    destroy(route("users.destroy", user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`User ${user.name} deleted successfully`);
      },
    });
  };

  const columns = [
    {
      key: "user",
      label: "User",
      render: (user: User) => (
        <div className="flex gap-4 items-center">
          <div className="flex overflow-hidden justify-center items-center font-semibold rounded-full size-10 bg-muted text-primary/80">
            {user.avatar ? (
              <img
                src={`${user.avatar}`}
                alt="User Avatar"
                className="object-cover object-center size-full"
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "roles",
      label: "Role",
      className: "hidden sm:table-cell",
      render: (user: User) => (
        <Badge className="text-xs" variant="outline">
          {user.roles.join(", ")}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      className: "hidden sm:table-cell",
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (user: User) => (
        <RowActions
          item={user}
          actions={[
            {
              label: "Edit",
              href: `/users/${user.id}`,
            },
            {
              label: "Delete",
              onClick: () => handleDelete(user),
              variant: "destructive",
              requiresConfirmation: true,
              confirmationMessage: `Are you sure you want to delete ${user.name}?`,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title="Users" />
      <DataTableWrapper<User>
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        routePrefix="users"
        filters={filters}
        createButton={{
          label: "Create User",
          sheet: <CreateUserSheet roles={roles} />,
        }}
      />
    </AuthenticatedLayout>
  );
}
