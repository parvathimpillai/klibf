import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Pages/Components/Header";
// Update the import path if the file exists elsewhere, for example:
import Hero from "@/Pages/Components/Hero";
// Or create the file at resources/js/Components/Hero.tsx if it does not exist.

export default function Home({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />

      <div className="bg-gray-50 dark:bg-black dark:text-white">
        {/* Header */}
        <Header auth={auth} />

        {/* Hero Section */}
        <Hero />

        {/* Optional Footer */}
        <footer className="py-8 text-center text-black dark:text-white/70">
          Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>
      </div>
    </>
  );
}
