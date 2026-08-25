"use client"

import dynamic from "next/dynamic"
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
import { ColorBank } from "@/components/sections/ColorBank"
import { SeasonalTrends } from "@/components/sections/SeasonalTrends"
import { Offers } from "@/components/sections/Offers"
import { Products } from "@/components/sections/Products"
import { Gallery } from "@/components/sections/Gallery"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { ProcessWhyUs } from "@/components/sections/ProcessWhyUs"
import { ComparisonTable } from "@/components/sections/ComparisonTable"

// Lazy-load below-fold sections to reduce initial bundle
const Team = dynamic(() => import("@/components/sections/Team").then(m => ({ default: m.Team })), { ssr: true })
const AwardBadges = dynamic(() => import("@/components/sections/AwardBadges").then(m => ({ default: m.AwardBadges })), { ssr: true })
const ServiceArea = dynamic(() => import("@/components/sections/ServiceArea").then(m => ({ default: m.ServiceArea })), { ssr: true })
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })), { ssr: true })
const VideoTestimonials = dynamic(() => import("@/components/sections/VideoTestimonials").then(m => ({ default: m.VideoTestimonials })), { ssr: true })
const BlogTips = dynamic(() => import("@/components/sections/BlogTips").then(m => ({ default: m.BlogTips })), { ssr: true })
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })), { ssr: true })
const BookingCalendar = dynamic(() => import("@/components/sections/BookingCalendar").then(m => ({ default: m.BookingCalendar })), { ssr: true })
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })), { ssr: true })

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
        <ColorBank />
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
