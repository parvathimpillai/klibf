import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  auth: { user: { name: string } | null };
}

export default function Header({ auth }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-teal-600/90 backdrop-blur-md shadow-lg" : "bg-teal-600"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-extrabold tracking-wider text-white">
          Kerala Legislature
        </div>

        <nav className="space-x-6 text-white font-medium">
          {auth.user ? (
            <>
              <a
                href="/admin"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                Dashboard
              </a>
              <Link
                href="/"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                Home
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-teal-200 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
