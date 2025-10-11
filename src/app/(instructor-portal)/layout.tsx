import InstructorPortalLayout from "."

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <InstructorPortalLayout>{children}</InstructorPortalLayout>
}
