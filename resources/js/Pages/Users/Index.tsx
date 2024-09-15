import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps, UsersPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
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

export default function Users({ auth }: PageProps) {
  const { users } = usePage<UsersPageProps>().props;
  const pagination = users.meta;

  const { delete: destroy } = useForm();

  // deleteUser
  const deleteUser = (id: number, name: string) => {
    destroy(route("users.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`User ${name} deleted successfully`);
      },
    });
  };

  console.log(usePage<UsersPageProps>().props);

  return (
    <AuthenticatedLayout user={auth.user} header="Users">
      <Head title="Users" />
      <div className="pt-6">
        <div>
          <Sheet>
            <CreateUserSheet />
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <img
                              src={`https://mighty.tools/mockmind-api/content/human/${user.id}.jpg`}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="">
                              <div className="font-medium">{user.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          type
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant={"outline"}>
                            role
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.email}
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
          </Sheet>
        </div>
      </div>
      {/* if pagination is not empty, show the pagination */}
      {pagination.last_page > 1 && (
        <Paginations pagination={pagination} users={users} />
      )}
    </AuthenticatedLayout>
  );
}
