import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--ui-border)",
        input: "var(--ui-input)",
        ring: "var(--ui-ring)",
        background: "var(--ui-background)",
        foreground: "var(--ui-foreground)",
        primary: {
          DEFAULT: "var(--ui-primary)",
          foreground: "var(--ui-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--ui-secondary)",
          foreground: "var(--ui-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--ui-muted)",
          foreground: "var(--ui-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--ui-accent)",
          foreground: "var(--ui-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--ui-destructive)",
          foreground: "var(--ui-destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--ui-card)",
          foreground: "var(--ui-card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-editorial)", "Arial", "sans-serif"],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

export default config;
