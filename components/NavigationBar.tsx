"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationBar(props: any) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setOpen(false);
  };

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#tracks", label: "Tracks" },
    { href: "#schedule", label: "Schedule" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
    { href: "#team", label: "Team" },
    { href: "#sponsors", label: "Sponsors" },
  ];

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled 
            ? "bg-dnav/95 backdrop-blur-md shadow-lg border-b border-blue-300/30" 
            : "bg-dnav border-b-2 border-blue-800",
          props.className
        )}
      >
        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lmain to-blue-400 rounded-lg flex items-center justify-center nav-glow">
                <span className="text-dheaders font-bold text-sm">MCH</span>
              </div>
              <span className="text-white font-bold text-lg">Mill City Hacks</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className={cn(
                "p-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105",
                "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500",
                "shadow-lg hover:shadow-xl nav-glow",
                open && "rotate-180"
              )}
              onClick={() => setOpen(!open)}
              aria-label="Toggle mobile menu"
            >
              <Image
                alt="Menu"
                src="/images/svgs/navmenu.svg"
                width={24}
                height={24}
                className="filter invert"
              />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-4 py-6 bg-gradient-to-b from-dnav to-blue-700 border-t border-blue-300/30">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "block px-4 py-3 text-white font-semibold text-lg rounded-xl",
                      "transition-all duration-300 ease-in-out transform hover:scale-105",
                      "hover:bg-gradient-to-r hover:from-lmain/20 hover:to-blue-400/20",
                      "hover:shadow-md hover:translate-x-2",
                      "border border-transparent hover:border-lmain/30",
                      open && "nav-slide-in"
                    )}
                    style={{
                      animationDelay: open ? `${index * 50}ms` : undefined
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-lmain to-blue-400 rounded-xl flex items-center justify-center shadow-lg nav-glow">
                  <span className="text-dheaders font-bold text-lg">MCH</span>
                </div>
                <span className="text-white font-bold text-xl">Mill City Hacks</span>
              </div>

              {/* Desktop Menu */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-white font-semibold text-lg rounded-lg",
                      "transition-all duration-300 ease-in-out transform hover:scale-105",
                      "hover:bg-gradient-to-r hover:from-lmain/20 hover:to-blue-400/20",
                      "hover:shadow-lg hover:-translate-y-1",
                      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r",
                      "before:from-lmain before:to-blue-400 before:opacity-0 before:transition-opacity",
                      "before:duration-300 hover:before:opacity-20",
                      "after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5",
                      "after:bg-gradient-to-r after:from-lmain after:to-blue-400 after:transition-all",
                      "after:duration-300 hover:after:w-full hover:after:left-0",
                      "nav-pulse-border"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-16"></div>
    </>
  );
}