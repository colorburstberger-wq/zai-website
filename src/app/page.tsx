"use client"

import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { BrandMarquee } from "@/components/sections/BrandMarquee"
import { About } from "@/components/sections/About"
import { BrandSpotlight } from "@/components/sections/BrandSpotlight"
import { Services } from "@/components/sections/Services"
import { ColorVisualizer } from "@/components/sections/ColorVisualizer"
import { Products } from "@/components/sections/Products"
import { Gallery } from "@/components/sections/Gallery"
import { ProcessWhyUs } from "@/components/sections/ProcessWhyUs"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { ScrollToTop } from "@/components/sections/ScrollToTop"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <About />
        <BrandSpotlight />
        <Services />
        <ColorVisualizer />
        <Products />
        <Gallery />
        <ProcessWhyUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
