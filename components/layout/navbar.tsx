"use client";

import Link from "next/link";
import { Hammer, Mountain, Flame } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-frost-dark/30 bg-mountain-dark/95 backdrop-blur supports-[backdrop-filter]:bg-mountain-dark/80">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-3 mr-6 group">
          {/* Forge icon */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded border border-forge-ember/50 bg-gradient-to-b from-mountain-stone to-mountain-dark group-hover:border-forge-ember transition-colors">
            <Hammer className="h-5 w-5 text-forge-ember" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-wide leading-none">
              <span className="text-forge-ember">THE</span>{" "}
              <span className="text-frost-light">FORGE</span>
            </span>
            <span className="text-[10px] text-frost-blue/70 tracking-widest uppercase">
              Freljord
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-6">
          <Link
            href="/compare"
            className="text-sm font-medium text-muted-foreground hover:text-frost-light transition-colors flex items-center gap-1.5"
          >
            <Flame className="h-3.5 w-3.5 text-forge-ember" />
            Compare
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-frost-light transition-colors flex items-center gap-1.5"
          >
            <Mountain className="h-3.5 w-3.5 text-frost-blue" />
            About
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
