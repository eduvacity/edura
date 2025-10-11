import theme from "@/components/theme/mui"
import StoreProvider from "@/lib/redux/providers"
import ScriptTags from "@/lib/scripts"
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import "monaco-editor/min/vs/editor/editor.main.css"
import type { Metadata, Viewport } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

const dev = process.env.NODE_ENV !== "production"
export const server = dev
  ? "http://localhost:3000"
  : "https://www.eduvacity.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}
export const metadata: Metadata = {
  title: "Eduvacity - learn today, build tomorrow",
  description:
    "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
  keywords:
    "leading universities in Nigeria,universities,university in Nigeria, Education in Nigeria, Tertiary Education,Tertiary Education in Nigeria, Public schools in Nigeria,Learning in Nigeria, Ahmadu Bello University programs,ABU zaria, abu zaria, Learning, Blog, Articles, Education, Knowledge Sharing, Community",
  authors: [{ name: "Abdulkadir Aisha", url: "https://www.eduvacity.com" }],
  openGraph: {
    title: "Eduvacity - learn today, build tomorrow",
    description:
      "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
    url: server,
    siteName: "Eduvacity",
    images: [
      {
        url: "https://www.eduvacity.com/eduvacity.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Eduvacity logo and banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Eduvacity",
    title: "Eduvacity - learn today, build tomorrow",
    description:
      "Choose a course that suits you from leading universities in Nigeria & Africa, gaining experience that guarantees employment with certifications equivalent to on-campus studies.",
    images: ["https://www.eduvacity.com/eduvacity.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <ScriptTags />
      </head>
      <body className="font-avant-garde">
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
