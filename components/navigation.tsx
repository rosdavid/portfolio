"use client";

import { usePathname } from "next/navigation";
import {
  User,
  Code,
  Play,
  Briefcase,
  Mail,
  Building,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  current?: boolean;
}

export function Navigation() {
  const pathname = usePathname();

  // Same navigation items for all pages
  const navItems: NavItem[] = [
    { label: "About", href: "#about", icon: User },
    { label: "Experience", href: "#experience", icon: Building },
    { label: "Skills", href: "#skills", icon: Code },
    { label: "Demos", href: "#showcase", icon: Play },
    { label: "Projects", href: "#projects", icon: Briefcase },
    { label: "Blog", href: "/blog", icon: BookOpen, external: true },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
    } else if (href.startsWith("#")) {
      // If we're on blog page and clicking an anchor link, go to home page with anchor
      if (pathname?.startsWith("/blog")) {
        window.location.href = `/${href}`;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = href;
    }
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const isCurrent =
      item.current ||
      (item.href === "/blog" && pathname?.startsWith("/blog")) ||
      (!item.external && !item.href.startsWith("#") && pathname === item.href);

    return (
      <button
        onClick={() => handleNavClick(item.href, item.external)}
        className={`text-sm font-medium transition-all duration-300 relative group cursor-pointer bg-transparent border-none p-2 rounded-full overflow-hidden ${
          isCurrent
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg">
          {item.label}
        </span>
        {/* Animated background pill */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
        {/* Animated underline from center */}
        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      </button>
    );
  };

  const MobileNavButton = ({ item }: { item: NavItem }) => {
    const isCurrent =
      item.current ||
      (item.href === "/blog" && pathname?.startsWith("/blog")) ||
      (!item.external && !item.href.startsWith("#") && pathname === item.href);
    const Icon = item.icon;

    return (
      <button
        onClick={() => handleNavClick(item.href, item.external)}
        className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 cursor-pointer bg-transparent border-none ${
          isCurrent
            ? "text-foreground bg-white/10"
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs font-medium truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop Navigation - Floating and Centered */}
      <nav className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-2 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavButton key={item.label} item={item} />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-t border-white/10 shadow-2xl shadow-black/20">
        <div className="container mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <MobileNavButton key={item.label} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
