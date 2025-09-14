"use client";

import { X, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "./home/ModeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "/", label: "Dashboard" },
    { id: "/add-expense", label: "Add Expense" },
    { id: "/all-expenses", label: "All Expenses" },
  ];

  return (
    <nav className="bg-card border-b border-border dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center dark:bg-primary/80">
              <span className="text-primary-foreground font-bold text-lg">
                💰
              </span>
            </div>
            <span className="text-xl font-bold text-foreground dark:text-gray-100">
              Expenza
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id}
                className={`flex px-4 py-2 rounded-lg font-medium transition-colors gap-2 items-center
                  ${
                    pathname === item.id
                      ? "text-blue-900 font-extrabold dark:text-blue-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Profile & Logout */}
            {status === "authenticated" && (
              <div className="flex items-center space-x-3">
                <Image
                  src={session.user?.image || "https://via.placeholder.com/32"}
                  alt="Profile"
                  width={600}
                  height={600}
                  className="w-8 h-8 rounded-full border border-teal-400 cursor-pointer"
                />

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-black/80 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted dark:hover:bg-gray-800 transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="dark:text-gray-100" />
            ) : (
              <Menu className="dark:text-gray-100" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border dark:border-gray-700">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex px-4 py-3 rounded-lg font-medium transition-colors gap-2 items-center
                    ${
                      pathname === item.id
                        ? "text-blue-900 font-extrabold dark:text-blue-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Profile & Logout */}
            {status === "authenticated" && (
              <div className="flex items-center space-x-3 mt-4">
                <Image
                  src={session.user?.image || "https://via.placeholder.com/32"}
                  alt="Profile"
                  width={600}
                  height={600}
                  className="w-8 h-8 rounded-full border border-teal-400 cursor-pointer"
                />

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-black/80 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
