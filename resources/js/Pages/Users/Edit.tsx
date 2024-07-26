import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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

  console.log(user.data);
  const { data, setData, put, errors, processing } = useForm({
    name: user.data.name,
    email: user.data.email,
    id: user.data.id,
    password: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route("users.update", user.data.id), {
      onSuccess: () => {
        // Handle success (e.g., redirect or show a message)
      },
    });
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
      <div className="mx-auto max-w-6xl">
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
              <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password} // Bind input value to form state
                  onChange={(e) => setData("password", e.target.value)}
                  required
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>

              <CardFooter>
                <Button type="submit" disabled={processing}>
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
