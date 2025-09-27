import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FormEventHandler, useEffect } from "react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function RegisterForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
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
    <>
      <Head title="Register" />

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Branding Section */}
        <div className="bg-gray-900 text-white flex flex-col relative p-8">
          {/* Top-left Home Link */}
          <div className="absolute top-4 left-4">
            <Link
              href={route("home")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-slate-800 rounded-lg px-4 py-2 transition-colors"
            >
              KLIBF
            </Link>
          </div>

          {/* Centered Branding */}
          <div className="flex flex-col items-center justify-center h-full">
            {/* <h1 className="text-xl font-bold text-indigo-400 mb-4">KLIBF</h1> */}
            <h2 className="text-2xl font-semibold mb-2">
              Kerala Legislature International Book Festival
            </h2>
            <p className="text-center text-sm text-gray-300">
              Kerala Legislative Assembly
            </p>
            <Link
              href="/"
              className="mt-6 text-sm text-indigo-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
          {/* Bottom-left */}
          <div className="text-xs text-gray-600">
            © 2025 Secretariat of the Kerala Legislature. All rights reserved.
          </div>
        </div>

        {/* Right Register Form */}
        <div className="flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-2">REGISTER</h2>
            <p className="text-center text-gray-500 mb-6">
              Create your account to continue
            </p>

            <form onSubmit={submit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  placeholder="Your full name"
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  placeholder="Your email"
                  autoComplete="username"
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  value={data.phone}
                  placeholder="10-digit mobile number"
                  onChange={(e) => setData("phone", e.target.value)}
                  required
                />
                <InputError message={errors.phone} className="mt-2" />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  autoComplete="new-password"
                  onChange={(e) => setData("password", e.target.value)}
                  required
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  autoComplete="new-password"
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

              <Button type="submit" disabled={processing} className="w-full">
                Register
              </Button>

              <p className="text-center text-sm mt-4">
                ALREADY HAVE AN ACCOUNT?{" "}
                <Link
                  href={route("login")}
                  className="font-semibold text-red-600 hover:underline"
                >
                  LOGIN
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
