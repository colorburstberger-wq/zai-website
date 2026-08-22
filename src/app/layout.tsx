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
  title: "Chroma House — Premium Paints & Décor Studio | Berger & Asian Paints Authorised Dealer",
  description:
    "Chroma House is a premium paints & décor studio and authorised dealer for Berger Paints and Asian Paints. Expert colour consultation, interior & exterior painting, waterproofing, texture finishes and more.",
  keywords: [
    "Chroma House",
    "paint shop",
    "Berger Paints dealer",
    "Asian Paints dealer",
    "interior painting",
    "exterior painting",
    "colour consultation",
    "texture painting",
    "waterproofing",
    "premium paints",
  ],
  authors: [{ name: "Chroma House" }],
  openGraph: {
    title: "Chroma House — Premium Paints & Décor Studio",
    description:
      "Where every wall tells a colour story. Authorised dealer for Berger Paints and Asian Paints.",
    siteName: "Chroma House",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chroma House — Premium Paints & Décor Studio",
    description: "Where every wall tells a colour story.",
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
