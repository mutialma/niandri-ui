import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Niandri Network Solution — Platform E-Billing ISP',
  description: 'PT Niandri Network Solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
