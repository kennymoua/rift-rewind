import Link from "next/link";
import { Hammer, Github, Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-frost-dark/30 bg-mountain-dark/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-forge-ember/40 bg-mountain-dark">
              <Hammer className="h-4 w-4 text-forge-ember" />
            </div>
            <div>
              <div className="font-display font-semibold text-sm">
                <span className="text-forge-ember">THE</span>{" "}
                <span className="text-frost-light">FORGE</span>
              </div>
              <div className="text-[10px] text-frost-blue/60 tracking-wider uppercase">
                Ornn's Workshop • Freljord
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-xs">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-frost-light transition-colors flex items-center gap-1.5"
            >
              <Mountain className="h-3 w-3 text-frost-blue" />
              Methodology
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-frost-light transition-colors flex items-center gap-1.5"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          </nav>

          {/* Disclaimer */}
          <div className="text-[10px] text-muted-foreground/60 text-center md:text-right max-w-xs">
            <p>
              The Forge isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games.
            </p>
            <p className="mt-1 text-frost-blue/40">
              Built in the mountains of Freljord
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
