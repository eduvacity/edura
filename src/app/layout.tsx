import theme from "@/components/theme/mui"
import StoreProvider from "@/lib/redux/providers"
import ScriptTags from "@/lib/scripts"
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import "monaco-editor/min/vs/editor/editor.main.css"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

const dev = process.env.NODE_ENV !== "production"
export const server = dev ? "http://localhost:3000" : "https://www.Edura.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}
export const metadata: Metadata = {
  title: "Edura - learn today, build tomorrow",
  description:
    "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
  keywords:
    "leading universities in Nigeria,universities,university in Nigeria, Education in Nigeria, Tertiary Education,Tertiary Education in Nigeria, Public schools in Nigeria,Learning in Nigeria, Ahmadu Bello University programs,ABU zaria, abu zaria, Learning, Blog, Articles, Education, Knowledge Sharing, Community",
  authors: [{ name: "Abdulkadir Aisha", url: "https://www.Edura.com" }],
  openGraph: {
    title: "Edura - learn today, build tomorrow",
    description:
      "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
    url: server,
    siteName: "Edura",
    images: [
      {
        url: "https://www.Edura.com/Edura.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Edura logo and banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Edura",
    title: "Edura - learn today, build tomorrow",
    description:
      "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
    images: ["https://www.edura.com/edura.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180" }],
  },
}
// Use a CSS variable so Tailwind + MUI can share it

const outfit = localFont({
  src: [
    { path: "./fonts/Outfit-Thin.woff", weight: "100", style: "normal" },
    { path: "./fonts/Outfit-ExtraLight.woff", weight: "200", style: "normal" },
    { path: "./fonts/Outfit-Light.woff", weight: "300", style: "normal" },
    { path: "./fonts/Outfit-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/Outfit-Medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/Outfit-SemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/Outfit-Bold.woff", weight: "700", style: "normal" },
    { path: "./fonts/Outfit-ExtraBold.woff", weight: "800", style: "normal" },
    { path: "./fonts/Outfit-Black.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        <ScriptTags />
      </head>
      <body className="font-sans">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <StoreProvider>{children}</StoreProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  )
}
