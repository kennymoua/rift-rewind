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
        // Freljord/Ornn Brand Colors
        forge: {
          ember: "hsl(var(--forge-ember))",
          flame: "hsl(var(--forge-flame))",
          gold: "hsl(var(--forge-gold))",
        },
        frost: {
          blue: "hsl(var(--frost-blue))",
          light: "hsl(var(--frost-light))",
          dark: "hsl(var(--frost-dark))",
        },
        mountain: {
          dark: "hsl(var(--mountain-dark))",
          stone: "hsl(var(--mountain-stone))",
        },
        snow: "hsl(var(--snow-white))",
        ice: "hsl(var(--ice-crystal))",
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
        "ember-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--forge-ember) / 0.3)",
            borderColor: "hsl(var(--forge-ember) / 0.5)",
          },
          "50%": { 
            boxShadow: "0 0 35px hsl(var(--forge-ember) / 0.5)",
            borderColor: "hsl(var(--forge-ember) / 0.8)",
          },
        },
        "frost-pulse": {
          "0%, 100%": { 
            borderColor: "hsl(var(--frost-dark))",
          },
          "50%": { 
            borderColor: "hsl(var(--frost-blue))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        "ember-glow": "ember-glow 2s ease-in-out infinite",
        "frost-pulse": "frost-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "forge-gradient": "linear-gradient(180deg, hsl(var(--forge-flame)) 0%, hsl(var(--forge-ember)) 50%, hsl(var(--forge-gold)) 100%)",
        "frost-gradient": "linear-gradient(180deg, hsl(var(--frost-light)) 0%, hsl(var(--frost-blue)) 50%, hsl(var(--frost-dark)) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
