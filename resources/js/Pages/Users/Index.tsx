import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import Paginations from "@/Components/Pagination";

import { MoreHorizontal, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { CreateUserSheet } from "./Create";
import { useState } from "react";
import { useEffect } from "react";

import { getInitials } from "@/hooks/helpers";

export default function Users({ auth }: PageProps) {
  const { users, message, roles } = usePage<UsersPageProps>().props;

  const pagination = users.meta;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { delete: destroy } = useForm();

  // Display toast message when component mounts if message prop exists
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
      });
    }
  }, [message]);

  // deleteUser
  const deleteUser = (id: number, name: string) => {
    destroy(route("users.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`User ${name} deleted successfully`, {
          position: "top-center",
        });
      },
    });
  };

  return (
    <AuthenticatedLayout auth_user={auth.user} header="Users">
      <Head title="Users" />
      <div>
        {/* add button to create user */}
        <div className="flex gap-4 justify-between">
          {/* add input to search user */}
          <Input type="text" placeholder="Search user" className="w-1/4" />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Button
                variant={"outline"}
                className="mb-4"
                onClick={() => setIsSheetOpen(true)}
              >
                <UserPlus className="mr-2 size-4" />
                Create User
              </Button>
            </SheetTrigger>
            <CreateUserSheet roles={roles} />
          </Sheet>
        </div>
        <div>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Created At
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="overflow-y-auto">
                  {users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
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
                          <div className="">
                            <div className="font-medium">{user.name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={"outline"}>
                          {user.roles.join(", ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.created_at}
                      </TableCell>

                      <TableCell className="text-right">
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link
                                  // route /users/{id}/edit
                                  href={`/users/${user.id}`}
                                  className="block w-full"
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DialogTrigger>Delete</DialogTrigger>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure you want to delete the user{" "}
                                {user.name}?
                              </DialogTitle>
                              <DialogDescription>
                                Once the user is deleted, all of its resources
                                and data will be permanently deleted.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose>
                                <Button variant="secondary">Cancel</Button>
                              </DialogClose>
                              <Button
                                onClick={() => deleteUser(user.id, user.name)}
                                variant="destructive"
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* if pagination is not empty, show the pagination */}
      {pagination.last_page > 1 && (
        <Paginations pagination={pagination} users={users} />
      )}
    </AuthenticatedLayout>
  );
}
