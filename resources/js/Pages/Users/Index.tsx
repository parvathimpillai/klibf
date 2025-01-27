import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { CreateUserSheet } from "./Create";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { columns } from "@/Components/data-table/columns";

export default function Users({ auth }: PageProps) {
  const { users, message, roles, filters } = usePage<UsersPageProps>().props;
  const { delete: destroy } = useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (userId: number) => {
    destroy(route("users.destroy", userId), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
    });
  };

  const handleBulkDelete = () => {
    destroy(route("users.bulk-destroy", { ids: selectedIds }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("users deleted successfully", {
          description: `${selectedIds.length} users deleted successfully`,
          position: "top-center",
        });
        setSelectedIds([]);
        setShowDeleteDialog(false);
      },
      onError: () => {
        toast.error("Failed to delete users", {
          description: "Failed to delete users",
          position: "top-center",
        });
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title="Users" />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users.data} meta={users.meta} />
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected Users</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.length} users? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
