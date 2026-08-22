"use client"

import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { BrandMarquee } from "@/components/sections/BrandMarquee"
import { About } from "@/components/sections/About"
import { BrandSpotlight } from "@/components/sections/BrandSpotlight"
import { Services } from "@/components/sections/Services"
import { PaintCalculator } from "@/components/sections/PaintCalculator"
import { ColorVisualizer } from "@/components/sections/ColorVisualizer"
import { Offers } from "@/components/sections/Offers"
import { Products } from "@/components/sections/Products"
import { Gallery } from "@/components/sections/Gallery"
import { ProcessWhyUs } from "@/components/sections/ProcessWhyUs"
import { Team } from "@/components/sections/Team"
import { Awards } from "@/components/sections/Awards"
import { ServiceArea } from "@/components/sections/ServiceArea"
import { Testimonials } from "@/components/sections/Testimonials"
import { BlogTips } from "@/components/sections/BlogTips"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { ScrollToTop } from "@/components/sections/ScrollToTop"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <About />
        <BrandSpotlight />
        <Services />
        <PaintCalculator />
        <ColorVisualizer />
        <Offers />
        <Products />
        <Gallery />
        <ProcessWhyUs />
        <Team />
        <Awards />
        <ServiceArea />
        <Testimonials />
        <BlogTips />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
