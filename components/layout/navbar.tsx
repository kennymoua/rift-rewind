"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, GitCompare, Info } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rift-purple to-rift-cyan">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-rift-purple to-rift-cyan bg-clip-text text-transparent">
              Rift Rewind
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {filteredNav.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon && <item.icon className="mr-1.5 h-4 w-4" />}
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

