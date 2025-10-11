import StudentPortalLayout from "."

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <StudentPortalLayout>{children}</StudentPortalLayout>
}
