import HomePageLayoutWrapper from "."

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HomePageLayoutWrapper>{children}</HomePageLayoutWrapper>
}
