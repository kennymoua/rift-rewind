export { ThemeProvider } from "./theme-provider";
export { ThemeToggle } from "./theme-toggle";
export { Navbar } from "./navbar";
export { Footer } from "./footer";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

