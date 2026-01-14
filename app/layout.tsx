import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rift Rewind - Your League of Legends Year in Review",
  description:
    "Generate a personalized year-end recap of your League of Legends journey with AI-powered insights, stats, and highlights.",
  keywords: [
    "League of Legends",
    "LoL",
    "year in review",
    "stats",
    "recap",
    "AI coach",
    "gaming",
  ],
  authors: [{ name: "Rift Rewind Team" }],
  openGraph: {
    title: "Rift Rewind - Your League of Legends Year in Review",
    description:
      "Generate a personalized year-end recap of your League of Legends journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rift Rewind",
    description: "Your League of Legends Year in Review",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
