"use client";

import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { PlusCircle, BanknoteArrowDown, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); // Get current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    {
      id: "/add-expense",
      label: "Add Expense",
      icon: <PlusCircle size={20} />,
    },
    {
      id: "/all-expenses",
      label: "All Expenses",
      icon: <BanknoteArrowDown size={20} />,
    },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                💰
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">Expenza</span>
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
                      ? "text-blue-900 font-extrabold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex px-4 py-3 rounded-lg font-medium transition-colors gap-2 items-center
                    ${
                      pathname === item.id
                        ? "text-blue-900 font-extrabold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
