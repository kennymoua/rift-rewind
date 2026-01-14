import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // LoL Brand Colors
        lol: {
          gold: "hsl(var(--lol-gold))",
          "gold-light": "hsl(var(--lol-gold-light))",
          "gold-dark": "hsl(var(--lol-gold-dark))",
          blue: "hsl(var(--lol-blue))",
          "blue-dark": "hsl(var(--lol-blue-dark))",
          "blue-glow": "hsl(var(--lol-blue-glow))",
          bronze: "hsl(var(--lol-bronze))",
          dark: "hsl(var(--lol-dark))",
          darker: "hsl(var(--lol-darker))",
          magic: "hsl(var(--lol-magic))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--lol-gold) / 0.3)",
            borderColor: "hsl(var(--lol-gold) / 0.5)",
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(var(--lol-gold) / 0.5)",
            borderColor: "hsl(var(--lol-gold) / 0.8)",
          },
        },
        "border-glow": {
          "0%, 100%": { 
            borderColor: "hsl(var(--lol-gold-dark))",
          },
          "50%": { 
            borderColor: "hsl(var(--lol-gold))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "lol-gradient": "linear-gradient(180deg, hsl(var(--lol-gold-light)) 0%, hsl(var(--lol-gold)) 50%, hsl(var(--lol-gold-dark)) 100%)",
        "lol-card": "linear-gradient(180deg, hsl(220 35% 12%) 0%, hsl(220 40% 6%) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
