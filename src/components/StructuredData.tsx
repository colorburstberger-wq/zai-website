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
      "Authorised Berger Urban Exclusive Paints Store in Gorakhpur. Stocking the complete Berger range — Easy Clean, Breathe Easy, Weathercoat, Luxol, Designory — with full manufacturer warranty. Also supplying Asian Paints products on request. Color Bank shade matching, on-site colour consultation, interior & exterior painting, texture finishes and waterproofing across Gorakhpur.",
    url: SHOP.gmbUrl,
    telephone: SHOP.phone,
    email: SHOP.email,
    foundingDate: String(SHOP.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: "HIG B 98, Rail Vihar Colony Phase 3rd, Taramandal, Siddharth Enclave",
      addressLocality: "Gorakhpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "273017",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.7606",
      longitude: "83.3732",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SHOP.rating,
      reviewCount: String(SHOP.ratingCount),
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
    sameAs: [SHOP.gmbUrl],
  }

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SHOP.fullName} Painting Services`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SHOP.rating,
      reviewCount: String(SHOP.ratingCount),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5" },
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
