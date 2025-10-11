import LegalRootLayout from "."

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LegalRootLayout>{children}</LegalRootLayout>
}
