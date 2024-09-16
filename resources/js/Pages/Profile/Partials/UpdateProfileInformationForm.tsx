import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { toast } from "sonner";

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
  className = "",
  user,
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
  };
}) {
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });
  const handleClick = () => {
    // submit the form
    patch(route("profile.update"));
    toast("Profile information updated", {
      description: "the profile information has been updated successfully.",
      action: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
      position: "top-center",
    });
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your account's profile information and email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <Label htmlFor="name" className="block text-sm font-medium">
            Name
          </Label>

          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            autoComplete="name"
          />
          <Label htmlFor="email" className="block mt-4 text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />
        </form>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <Button onClick={handleClick}>Save</Button>
      </CardFooter>
    </Card>
  );
}
