"use client";

import {
    Bars3Icon,
    BeakerIcon,
    PresentationChartLineIcon,
    TicketIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    href: "/",
    icon: PresentationChartLineIcon,
  },
  {
    name: "Tickets",
    href: "/tickets",
    icon: TicketIcon,
  },
  {
    name: "Matched Algorithm",
    href: "/matched-algorithm",
    icon: BeakerIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reusable function to render links
  const renderLinks = (onClick?: () => void) => {
    return links.map((link) => {
      const LinkIcon = link.icon;
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={onClick} // Optional onClick handler for mobile menu
          className={clsx(
            "flex h-10 items-center justify-start gap-1 p-3 rounded-md",
            {
              "bg-gray-300 dark:bg-gray-600": isActive,
              "hover:bg-gray-200 dark:hover:bg-gray-800": !isActive,
            }
          )}
        >
          <LinkIcon className="w-5" />
          <p className="block">{link.name}</p>
        </Link>
      );
    });
  };

  return (
    <nav className="shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
            {renderLinks()}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none py-2"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute bg-black md:hidden px-4 py-4 pb-4 space-y-2 z-10 w-80">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
}
