import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Berger Urban Exclusive Paints Store, Gorakhpur | Authorised Berger Paints Dealer",
  description:
    "Berger Urban Exclusive Paints Store in Siddharth Enclave, Taramandal, Gorakhpur. Authorised Berger Paints dealer stocking Easy Clean, Breathe Easy, Weathercoat, Luxol & Designory. Color Bank shade matching, on-site colour consultation, interior & exterior painting, texture finishes and waterproofing across Gorakhpur. 5.0-star Google rated.",
  keywords: [
    "Berger Paints Gorakhpur",
    "Berger Urban Exclusive",
    "paint shop Gorakhpur",
    "paint dealer Gorakhpur",
    "Berger Paints dealer",
    "Asian Paints Gorakhpur",
    "interior painting Gorakhpur",
    "exterior painting Gorakhpur",
    "colour consultation Gorakhpur",
    "Berger Weathercoat",
    "Berger Easy Clean",
    "Berger Breathe Easy",
    "Berger Color Bank",
    "texture painting",
    "waterproofing Gorakhpur",
    "Siddharth Enclave Gorakhpur",
    "Taramandal Gorakhpur paint shop",
  ],
  authors: [{ name: "Berger Urban Exclusive Paints Store" }],
  icons: {
    icon: "/images/brand-logo.svg",
    apple: "/images/brand-logo.svg",
  },
  openGraph: {
    title: "Berger Urban Exclusive Paints Store, Gorakhpur",
    description:
      "Gorakhpur's trusted Berger Paints exclusive store. Authorised dealer for Berger Paints, also supplying Asian Paints. 5.0-star Google rated.",
    siteName: "Berger Urban Exclusive Paints Store",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berger Urban Exclusive Paints Store, Gorakhpur",
    description: "Gorakhpur's trusted Berger Paints exclusive store.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
