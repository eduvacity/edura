import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      fold: "17.5rem" /*280px / 16 = 17.5rem (Galaxy Fold folded) */,
      xs: "20rem" /* 320px / 16 = 20rem (iPhone 5/SE)*/,
      sm: "23.4375rem" /* 375px / 16 = 23.4375rem (iPhone 6/7/8, 
                       iPhone X/XS/11 Pro, iPhone 13 Mini, iPhone 14)*/,
      "sm-md":
        "24.375rem" /* 390px / 16 = 24.375rem (iPhone 13, iPhone 14 Pro, iPhone 15, iPhone 16)*/,
      md: "26.75rem" /* 428px / 16 = 26.75rem (iPhone 6/7/8 Plus, iPhone XR/11, iPhone 13 Pro Max, iPhone 14 Plus, iPhone 15 Plus, iPhone 16 Plus)*/,
      lg: "40.8125rem" /* 653px / 16 = 40.8125rem (Galaxy Fold unfolded, iPad Mini in portrait)*/,
      "lg-md":
        "48rem" /* 768px / 16 = 40.8125rem (Galaxy Fold unfolded, iPad Mini in portrait)*/,
      xl: "64rem" /* 1024px / 16 = 64rem (iPad Pro 10.5", iPad Pro 12.9")*/,
      "2xl": "80rem" /* 1280px / 16 = 80rem (small laptops, desktops)*/,
      "3xl": "90rem" /* 1440px / 16 = 90rem (larger desktops)*/,
      "4xl": "120rem" /* 1920px / 16 = 120rem (full HD desktops)*/,
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        pcolor: "#3FA46E",
        pdarkcolor: "#071C23",
        bgcolor: "#F9EDD7",
        orange: "#E3A22B",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        arial: ["Arial", "Helvetica", "sans-serif"],
        satoshi: ["Satoshi", "Helvetica", "sans-serif"],
        jost: ["Jost", "Helvetica", "sans"],
        "avant-garde": ['"ITC Avant Garde Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
