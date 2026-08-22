import { FAQS, SHOP, SERVICES, TESTIMONIALS } from "@/lib/data/content"

export function StructuredData() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SHOP.fullName,
    description:
      "Premium paints & décor studio. Authorised dealer for Berger Paints and Asian Paints. Interior painting, exterior painting, texture, waterproofing, colour consultation and wood polish.",
    url: "https://chromahouse.studio",
    telephone: SHOP.phone,
    email: SHOP.email,
    foundingDate: String(SHOP.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: SHOP.address,
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    openingHours: ["Mo-Fr 09:30-20:00", "Sa 09:30-21:00", "Su 10:30-18:00"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "327",
    },
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  }

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Chroma House Painting Services",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "327",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating) },
      reviewBody: t.text,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
    </>
  )
}
