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
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Transition } from "@headlessui/react";
import { PageProps } from "@/types";

export default function Component({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });
  const handleClick = () => {
    // submit the form
    patch(route("profile.update"));
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
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            autoComplete="name"
          />
          <label
            htmlFor="email"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Email
          </label>
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
        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out"
          enterFrom="opacity-0"
          leave="transition ease-in-out"
          leaveTo="opacity-0"
        >
          <p className="text-sm text-gray-600">Saved.</p>
        </Transition>
      </CardFooter>
    </Card>
  );
}
