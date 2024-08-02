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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";
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
    <AuthenticatedLayout user={auth.user}>
      <Head title="Users" />
      <div className="pt-6">
        <div className="mx-auto max-w-7xl">
          <Sheet>
            <CreateUserSheet />

            <Card>
              <CardHeader className="px-7">
                <div className="flex">
                  <div className="">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      Here you can view all users and their details
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 justify-end items-center ml-auto">
                    <SheetTrigger className="inline-flex gap-2 justify-center items-center px-3 h-10 text-sm font-medium whitespace-nowrap rounded-md border transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground">
                      <UserPlus className="w-5 h-5" />
                      <span className="sr-only sm:not-sr-only">
                        Create user
                      </span>
                    </SheetTrigger>
                  </div>
                </div>
              </CardHeader>
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
                          <div className="font-medium">{user.name}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {user.email}
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
              <CardFooter className="px-6 py-4 border-t">
                <Paginations pagination={pagination} users={users} />
              </CardFooter>
            </Card>
          </Sheet>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
