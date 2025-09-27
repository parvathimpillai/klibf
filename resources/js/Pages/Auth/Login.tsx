import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { useEffect, FormEventHandler } from "react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function LoginForm({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <>
      <Head title="Login" />

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

        {/* Right Login Form */}
        <div className="flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-2">LOGIN</h2>
            <p className="text-center text-gray-500 mb-6">
              Enter your email and password to login to your account
            </p>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email or Mobile</Label>
                <Input
                  id="email"
                  type="text"
                  value={data.email}
                  placeholder="Your email or mobile number"
                  autoComplete="username"
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <Link
                      href={route("password.request")}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  autoComplete="current-password"
                  onChange={(e) => setData("password", e.target.value)}
                  required
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <Button type="submit" disabled={processing} className="w-full">
                Login
              </Button>

              <p className="text-center text-sm mt-4">
                DON’T HAVE AN ACCOUNT?{" "}
                <Link
                  href={route("register")}
                  className="font-semibold text-red-600 hover:underline"
                >
                  REGISTER
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
