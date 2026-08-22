"use client"

import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { BrandMarquee } from "@/components/sections/BrandMarquee"
import { PressStrip } from "@/components/sections/PressStrip"
import { About } from "@/components/sections/About"
import { BrandSpotlight } from "@/components/sections/BrandSpotlight"
import { Services } from "@/components/sections/Services"
import { PaintCalculator } from "@/components/sections/PaintCalculator"
import { ColorVisualizer } from "@/components/sections/ColorVisualizer"
import { ColorMoodQuiz } from "@/components/sections/ColorMoodQuiz"
import { PaletteExplorer } from "@/components/sections/PaletteExplorer"
import { SeasonalTrends } from "@/components/sections/SeasonalTrends"
import { Offers } from "@/components/sections/Offers"
import { Products } from "@/components/sections/Products"
import { Gallery } from "@/components/sections/Gallery"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { ProcessWhyUs } from "@/components/sections/ProcessWhyUs"
import { ComparisonTable } from "@/components/sections/ComparisonTable"
import { Team } from "@/components/sections/Team"
import { AwardBadges } from "@/components/sections/AwardBadges"
import { ServiceArea } from "@/components/sections/ServiceArea"
import { Testimonials } from "@/components/sections/Testimonials"
import { VideoTestimonials } from "@/components/sections/VideoTestimonials"
import { BlogTips } from "@/components/sections/BlogTips"
import { FAQ } from "@/components/sections/FAQ"
import { BookingCalendar } from "@/components/sections/BookingCalendar"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { ScrollToTop } from "@/components/sections/ScrollToTop"
import { FloatingQuickActions, ScrollProgressBar } from "@/components/sections/FloatingQuickActions"
import { PaintCursor } from "@/components/sections/PaintCursor"
import { ClickSplash } from "@/components/sections/ClickSplash"
import { PageLoader } from "@/components/sections/PageLoader"
import { NewsletterPopup } from "@/components/sections/NewsletterPopup"
import { AdminDashboard } from "@/components/sections/AdminDashboard"
import { StickyCTA } from "@/components/sections/StickyCTA"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-x-hidden">
      <PageLoader />
      <ScrollProgressBar />
      <PaintCursor />
      <ClickSplash />
      <NewsletterPopup />
      <AdminDashboard />
      <StickyCTA />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PressStrip />
        <BrandMarquee />
        <About />
        <BrandSpotlight />
        <Services />
        <PaintCalculator />
        <ColorVisualizer />
        <ColorMoodQuiz />
        <PaletteExplorer />
        <Offers />
        <Products />
        <Gallery />
        <BeforeAfter />
        <ProcessWhyUs />
        <ComparisonTable />
        <Team />
        <AwardBadges />
        <ServiceArea />
        <Testimonials />
        <VideoTestimonials />
        <SeasonalTrends />
        <BlogTips />
        <FAQ />
        <BookingCalendar />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingQuickActions />
    </div>
  )
}
