import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { FormEventHandler } from "react";

import { Label } from "@/Components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";

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

  const { data, setData, patch, errors, processing } = useForm({
    name: user.data.name,
    email: user.data.email,
    id: user.data.id,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (data.name !== user.data.name || data.email !== user.data.email) {
      patch(route("users.update", user.data.id), {
        onSuccess: () => {
          toast("User updated", {
            description: "User information has been updated successfully.",
            action: {
              label: "Close",
              onClick: () => {
                toast.dismiss();
              },
            },
            position: "top-right",
          });
        },
      });
    }
  };

  return (
    <AuthenticatedLayout
      user={user.data}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Edit User
        </h2>
      }
    >
      <Head title="Edit User" />
      <div className="mx-auto w-full max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={data.name} // Bind input value to form state
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email} // Bind input value to form state
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>

              <CardFooter>
                <Button type="button" onClick={submit} disabled={processing}>
                  Save
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
