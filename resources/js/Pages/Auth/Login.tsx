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
              className="text-lg font-medium text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-slate-800 rounded-lg px-4 py-2 transition-colors"
            >
              KLIBF
            </Link>
          </div>

          {/* Centered Branding */}
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white-600">
              Welcome to Kerala Legislature
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold text-white">
              <span className="text-yellow-500">
                International Book Festival
              </span>
            </h2>
            <p className="text-lg md:text-2xl font-medium text-white-300 mt-2">
              4<sup className="text-sm">th</sup> Edition
            </p>
            <p className="text-base md:text-xl font-semibold text-yellow-400">
              2026  January 7 – 13
            </p>

            <Link
              href="/"
              className="mt-6 text-md text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Bottom-left */}
          <div className="text-md text-white-300 mt-4"  >
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
                      className="text-sm text-bl hover:underline"
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

              <Button type="submit" disabled={processing} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold">
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
