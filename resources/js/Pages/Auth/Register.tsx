
import { Head, Link, useForm } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { useEffect, FormEventHandler } from "react";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function RegisterForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            {/* Entrez votre email ci-dessous pour vous connecter à votre compte, trad to english */}
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  autoComplete="username"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              {/* Phone number field can be added here if needed */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  className="mt-1 block w-full"
                  autoComplete="tel"
                  onChange={(e) => setData("phone", e.target.value)}
                />
                <InputError message={errors.phone} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">
                  Confirm Password
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" disabled={processing}>
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  );
}
