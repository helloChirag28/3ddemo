import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D Product Customizer',
  description: 'Interactive 3D product customization experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}