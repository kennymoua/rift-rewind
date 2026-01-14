import Link from "next/link";
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          Built with{" "}
          <Heart className="inline-block h-3 w-3 text-red-500" /> for the{" "}
          <span className="font-semibold">AWS Game Builder Challenge</span>
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <span className="text-xs text-muted-foreground">
            Not affiliated with Riot Games
          </span>
        </div>
      </div>
    </footer>
  );
}

