import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GLUTE LAB STARTER PACK™ | Bezdrob - Transformiši Svoje Gluteuse",
  description: "5 modula, 39 video lekcija, 655+ minuta sadržaja. Naučite Tehniku Aktivacije Stopala™ i konačno izgradite gluteuse o kojima ste sanjali. 60 dana garancije.",
  keywords: ["glute training", "gluteus trening", "Bezdrob", "fitness program", "transformacija tijela", "online coaching"],
  authors: [{ name: "Imran Bezdrob" }],
  openGraph: {
    title: "GLUTE LAB STARTER PACK™ | Bezdrob",
    description: "Konačno izgradite gluteuse o kojima ste sanjali. 5 modula, 39 video lekcija, 60 dana garancije.",
    type: "website",
    locale: "bs_BA",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLUTE LAB STARTER PACK™ | Bezdrob",
    description: "Konačno izgradite gluteuse o kojima ste sanjali.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bs" className={inter.variable}>
      <body className="font-body bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
