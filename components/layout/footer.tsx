import Link from "next/link";
import { Github, Swords } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-lol-gold/20 bg-lol-darker">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-lol-gold/30 bg-lol-dark">
              <Swords className="h-4 w-4 text-lol-gold" />
            </div>
            <span className="font-display text-sm font-bold">
              <span className="text-lol-gold">RIFT</span>{" "}
              <span className="text-muted-foreground">REWIND</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Built for AWS Game Builder Challenge</span>
            <Link
              href="https://github.com/kennymoua/rift-rewind"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-lol-gold transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="text-[10px] text-muted-foreground/60 text-center md:text-right max-w-xs">
            Not affiliated with Riot Games, Inc. League of Legends and Riot Games are trademarks of Riot Games, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}
