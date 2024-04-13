export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="bg-neutral-200">{children}</div>
}
