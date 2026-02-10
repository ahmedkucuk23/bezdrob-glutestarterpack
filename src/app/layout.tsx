import type { Metadata } from "next"
import { Inter, Bebas_Neue, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GLUTE LAB STARTER PACK™ | Bezdrob - Transformiši Svoje Gluteuse",
  description: "5 modula, 39 video lekcija, 220+ minuta sadržaja. Naučite Tehniku Aktivacije Stopala™ i konačno izgradite gluteuse o kojima ste sanjali. 2000+ transformacija. 60 dana garancije.",
  keywords: ["glute training", "gluteus trening", "Bezdrob", "Imran Bezdrob", "fitness program", "transformacija tijela", "online coaching", "glute starter pack", "trening gluteusa", "aktivacija stopala"],
  authors: [{ name: "Imran Bezdrob" }],
  metadataBase: new URL("https://bezdrob.com"),
  openGraph: {
    title: "GLUTE LAB STARTER PACK™ | Bezdrob",
    description: "Otkrij metodu koju koriste žene koje STVARNO grade gluteuse. 5 modula, 39 video lekcija, 2000+ transformacija. 60 dana garancije.",
    type: "website",
    locale: "bs_BA",
    siteName: "Bezdrob Transformation Program",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GLUTE LAB STARTER PACK by Imran Bezdrob",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GLUTE LAB STARTER PACK™ | Bezdrob",
    description: "Otkrij metodu koju koriste žene koje STVARNO grade gluteuse. 5 modula, 39 video lekcija, 60 dana garancije.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bs" className={`${inter.variable} ${bebasNeue.variable} ${poppins.variable}`}>
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '898728519181561');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-poppins bg-white text-gray-900 antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=898728519181561&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
