"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, GitCompare, Info, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { isCompareEnabled } from "@/lib/constants";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Compare", href: "/compare", icon: GitCompare, requiresFeature: "compare" },
  { name: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const compareEnabled = isCompareEnabled();

  const filteredNav = navigation.filter((item) => {
    if (item.requiresFeature === "compare" && !compareEnabled) {
      return false;
    }
    return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-lol-gold/20 bg-lol-darker/95 backdrop-blur supports-[backdrop-filter]:bg-lol-darker/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-lol-gold/50 bg-gradient-to-b from-lol-dark to-lol-darker group-hover:border-lol-gold transition-colors">
              <Swords className="h-5 w-5 text-lol-gold" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold">
                <span className="text-lol-gold">RIFT</span>{" "}
                <span className="text-foreground">REWIND</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center">
            <div className="flex items-center border-l border-lol-gold/20 pl-6">
              {filteredNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm font-medium uppercase tracking-wide transition-colors px-4",
                      pathname === item.href
                        ? "text-lol-gold bg-lol-gold/10"
                        : "text-muted-foreground hover:text-lol-gold hover:bg-lol-gold/5"
                    )}
                  >
                    {item.icon && <item.icon className="mr-1.5 h-4 w-4" />}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
