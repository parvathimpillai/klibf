import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/Components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";

export function CreateUserSheet() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleClose = () => {
    reset(); // Reset the form fields
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("users.store"));
  };
  return (
    <SheetContent className="w-[400px] sm:w-[900px] sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Create User</SheetTitle>
        <SheetDescription>
          <form onSubmit={submit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mt-4">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />
              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <Button type="submit" disabled={processing}>
              Create User
            </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
