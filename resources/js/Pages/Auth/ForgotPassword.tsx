import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <>
      <Head title="Forgot Password" />

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
          <div className="text-md text-white-300 mt-4">
            © 2025 Secretariat of the Kerala Legislature. All rights reserved.
          </div>
        </div>

        {/* Right Forgot Password Form */}
        <div className="flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-2">
              Forgot Password
            </h2>
            <p className="text-center text-gray-500 mb-6">
              No problem! Enter your email and we’ll send you a reset link.
            </p>

            {status && (
              <div className="mb-4 text-sm font-medium text-green-600 text-center">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  className="block mt-1 w-full"
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/2"
                  onClick={() => history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold"
                >
                  Send Reset Link
                </Button>
              </div>

              <p className="text-center text-sm mt-4">
                Remember your password?{" "}
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
