// Static content for Chroma House — Premium Paints & Décor Studio

export const SHOP = {
  name: "Chroma House",
  fullName: "Chroma House — Premium Paints & Décor Studio",
  tagline: "Where every wall tells a colour story.",
  founded: 2009,
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "hello@chromahouse.studio",
  address: "14, Colour Street, Lake Town, Kolkata, West Bengal 700089",
  hours: [
    { day: "Mon – Fri", time: "9:30 AM – 8:00 PM" },
    { day: "Saturday", time: "9:30 AM – 9:00 PM" },
    { day: "Sunday", time: "10:30 AM – 6:00 PM" },
  ],
  mapsQuery: "Chroma House Paints Kolkata",
}

export const PARTNERS = [
  {
    name: "Berger Paints",
    href: "https://www.bergerpaints.com/",
    blurb: "Trusted partner since 2009 — Berger's full interior, exterior & weatherproof range.",
    accent: "#C8102E",
    tag: "Authorised Dealer",
    initials: "BP",
  },
  {
    name: "Asian Paints",
    href: "https://www.asianpaints.com/",
    blurb: "Authorised signature dealer — Asian Paints Luxury, Royale, Apex & Ultima lines.",
    accent: "#E2231A",
    tag: "Signature Dealer",
    initials: "AP",
  },
] as const

export const SERVICES = [
  {
    id: "interior",
    title: "Interior Painting",
    icon: "Brush",
    image: "/images/gallery-living-room.png",
    description:
      "Silk-smooth emulsion finishes, premium Royale & Luxury emulsions, designer accent walls and flawless ceilings crafted to make your interiors glow.",
    features: ["Premium emulsions", "Acrylic & PU finishes", "Accent walls", "Anti-stain top coats"],
    starting: "₹14 / sq ft",
  },
  {
    id: "exterior",
    title: "Exterior Painting",
    icon: "Building2",
    image: "/images/gallery-exterior.png",
    description:
      "Weatherproof exterior systems with Apex Ultima, Heatguard & Berger Weathercoat — UV resistant, anti-fungal, monsoon ready.",
    features: ["UV protection", "Anti-fungal", "Crack-bridging", "10-year warranty options"],
    starting: "₹18 / sq ft",
  },
  {
    id: "texture",
    title: "Texture & Designer Walls",
    icon: "Sparkles",
    image: "/images/service-texture.png",
    description:
      "Hand-troweled stucco, metallic Italian plasters, sandstone textures and Berger Designory art walls — bespoke finishes that turn walls into art.",
    features: ["Italian Marmorino", "Metallic plasters", "Sand-stone finish", "Custom stencils"],
    starting: "₹65 / sq ft",
  },
  {
    id: "waterproofing",
    title: "Waterproofing Solutions",
    icon: "Droplets",
    image: "/images/service-waterproofing.png",
    description:
      "Full-spectrum waterproofing for terraces, bathrooms, tanks and basements with Asian Paints SmartCare & Berger Aqua system.",
    features: ["Terrace waterproofing", "Bathroom seal", "Crystalline tank", "10-yr warranty"],
    starting: "₹45 / sq ft",
  },
  {
    id: "consultation",
    title: "Colour Consultation",
    icon: "Palette",
    image: "/images/service-consultation.png",
    description:
      "Free in-home colour consultation with our certified colour experts. We bring swatches, mood boards and lighting to your door.",
    features: ["Free site visit", "Mood boards", "Lighting check", "3D visual preview"],
    starting: "Free",
  },
  {
    id: "wood",
    title: "Wood & Metal Finishes",
    icon: "Frame",
    image: "/images/gallery-kitchen.png",
    description:
      "PU & melamine polish for furniture, doors and modular kitchens. Premium metallic, pearl & mat finishes with brushless spray application.",
    features: ["PU polish", "Melamine finish", "Metallic pearl", "Spray application"],
    starting: "₹38 / sq ft",
  },
]

export const PRODUCTS = [
  {
    name: "Asian Paints Royale Luxury",
    category: "Interior Emulsion",
    brand: "Asian Paints",
    finish: "Luxurious Soft Sheen",
    coverage: "320 – 360 sq ft / L (2 coats)",
    warranty: "8 years",
    swatch: "#A89B7B",
    highlights: ["Anti-fungal", "Anti-stain", "Teflon surface protector", "Low VOC"],
  },
  {
    name: "Berger Weathercoat Anti-Dust",
    category: "Exterior Emulsion",
    brand: "Berger Paints",
    finish: "Smooth Matt",
    coverage: "260 – 300 sq ft / L (2 coats)",
    warranty: "7 years",
    swatch: "#C9885B",
    highlights: ["Anti-dust", "Anti-algal", "UV resistant", "Crack-resistance"],
  },
  {
    name: "Asian Paints Apex Ultima",
    category: "Exterior Emulsion",
    brand: "Asian Paints",
    finish: "Smooth Matt",
    coverage: "270 – 300 sq ft / L (2 coats)",
    warranty: "10 years",
    swatch: "#B5743F",
    highlights: ["Lamination effect", "Anti-algal", "Dirt-resistance", "Colour-fast"],
  },
  {
    name: "Berger Luxol Satin Enamel",
    category: "Wood & Metal",
    brand: "Berger Paints",
    finish: "Satin Gloss",
    coverage: "160 – 180 sq ft / L (2 coats)",
    warranty: "5 years",
    swatch: "#D9A441",
    highlights: ["Premium satin", "Marine-grade", "Scratch-proof", "Smooth flow"],
  },
  {
    name: "Asian Paints SmartCare Dampproof",
    category: "Waterproofing",
    brand: "Asian Paints",
    finish: "Cementitious Coating",
    coverage: "20 sq ft / kg (2 coats)",
    warranty: "7 years",
    swatch: "#8FA68E",
    highlights: ["Negative waterproofing", "Crystalline action", "Bridge cracks", "Eco-friendly"],
  },
  {
    name: "Berger Designory Texture",
    category: "Texture",
    brand: "Berger Paints",
    finish: "Hand-troweled",
    coverage: "6 – 10 sq ft / kg",
    warranty: "5 years",
    swatch: "#B65C3F",
    highlights: ["Italian stucco", "Hand-applied", "Metallic option", "Custom patterns"],
  },
]

export const PALETTE_SWATCHES = [
  { name: "Terracotta Glow", hex: "#E0623A", mood: "Warm & grounding", category: "Warm" },
  { name: "Saffron Sun", hex: "#F2A93B", mood: "Bright & joyful", category: "Warm" },
  { name: "Mustard Field", hex: "#D9A441", mood: "Earthy & bold", category: "Warm" },
  { name: "Clay Hut", hex: "#B65C3F", mood: "Rustic & cozy", category: "Warm" },
  { name: "Sage Garden", hex: "#8FA68E", mood: "Calm & natural", category: "Calm" },
  { name: "Rose Quartz", hex: "#D98C8C", mood: "Soft & elegant", category: "Soft" },
  { name: "Teal Lagoon", hex: "#4C8C8C", mood: "Cool & restful", category: "Cool" },
  { name: "Ivory Cream", hex: "#F4E9D6", mood: "Timeless & clean", category: "Neutral" },
  { name: "Charcoal Slate", hex: "#3B3A36", mood: "Moody & modern", category: "Bold" },
  { name: "Paprika Spice", hex: "#B23A1B", mood: "Spicy & energetic", category: "Bold" },
  { name: "Linen White", hex: "#F2EAD3", mood: "Airy & pure", category: "Neutral" },
  { name: "Forest Pine", hex: "#3F5C3A", mood: "Deep & serene", category: "Cool" },
  { name: "Blush Petal", hex: "#E8C5C5", mood: "Gentle & romantic", category: "Soft" },
  { name: "Cinnamon Stick", hex: "#A0522D", mood: "Rich & spicy", category: "Warm" },
  { name: "Ocean Mist", hex: "#7BA7BC", mood: "Cool & restful", category: "Cool" },
  { name: "Sand Dune", hex: "#D4B896", mood: "Timeless & clean", category: "Neutral" },
]

export const VISUALIZER_COLORS = [
  { name: "Warm Terracotta", hex: "#E0623A" },
  { name: "Saffron Sun", hex: "#F2A93B" },
  { name: "Sage Garden", hex: "#8FA68E" },
  { name: "Rose Quartz", hex: "#D98C8C" },
  { name: "Teal Lagoon", hex: "#4C8C8C" },
  { name: "Ivory Cream", hex: "#F4E9D6" },
  { name: "Clay Hut", hex: "#B65C3F" },
  { name: "Charcoal Slate", hex: "#3B3A36" },
]

export const GALLERY = [
  {
    title: "Terracotta Living Room",
    category: "Interior",
    image: "/images/gallery-living-room.png",
    location: "Salt Lake, Kolkata",
    brand: "Asian Paints Royale",
    year: "2024",
  },
  {
    title: "Warm Villa Exterior",
    category: "Exterior",
    image: "/images/gallery-exterior.png",
    location: "Rajarhat, Kolkata",
    brand: "Berger Weathercoat",
    year: "2024",
  },
  {
    title: "Sage Bedroom Retreat",
    category: "Interior",
    image: "/images/gallery-bedroom.png",
    location: "Ballygunge, Kolkata",
    brand: "Asian Paints Royale",
    year: "2023",
  },
  {
    title: "Mustard Workspace",
    category: "Commercial",
    image: "/images/gallery-office.png",
    location: "Sector V, Kolkata",
    brand: "Berger Luxol",
    year: "2024",
  },
  {
    title: "Terracotta Modular Kitchen",
    category: "Wood Finish",
    image: "/images/gallery-kitchen.png",
    location: "New Town, Kolkata",
    brand: "Berger Luxol Satin",
    year: "2023",
  },
  {
    title: "Stucco Accent Wall",
    category: "Texture",
    image: "/images/service-texture.png",
    location: "Alipore, Kolkata",
    brand: "Berger Designory",
    year: "2024",
  },
]

export const STATS = [
  { value: 4500, suffix: "+", label: "Homes painted", back: "Across Salt Lake, New Town, Ballygunge & 9 more areas", icon: "Home" },
  { value: 15, suffix: " yrs", label: "Craftsmanship since 2009", back: "Family-run studio — never sub-contracted", icon: "Award" },
  { value: 12000, suffix: "+", label: "Sq ft of texture art", back: "Italian stucco, metallic & hand-troweled finishes", icon: "Sparkles" },
  { value: 98, suffix: "%", label: "Client referral rate", back: "Word-of-mouth is our best marketing", icon: "Heart" },
]

export const TESTIMONIALS = [
  {
    name: "Ananya Banerjee",
    role: "Homeowner, Salt Lake",
    rating: 5,
    text: "The Chroma House team transformed our 3BHK with Asian Paints Royale. Their colour consultant walked us through every shade in our lighting — the result is breathtaking. Spotless execution and on-time delivery.",
    avatar: "AB",
    accent: "#E0623A",
  },
  {
    name: "Rohan Mehta",
    role: "Architect, Studio Form",
    rating: 5,
    text: "We have specified Chroma House on three of our projects this year. Berger Weathercoat exteriors still look fresh after a brutal monsoon. Their texture team is genuinely artisanal.",
    avatar: "RM",
    accent: "#F2A93B",
  },
  {
    name: "Sneha & Arjun",
    role: "Newly-wed couple, New Town",
    rating: 5,
    text: "From the first phone call to the final cleanup, the experience was world-class. They brought 30 swatches to our home, helped us pick a sage accent wall, and finished in 4 days flat.",
    avatar: "SA",
    accent: "#8FA68E",
  },
  {
    name: "Mr. Krishnan",
    role: "Property Manager, Merlin Group",
    rating: 5,
    text: "For 8 towers of residential exteriors, Chroma House delivered on schedule and within budget. Their waterproofing work has held up flawlessly for two monsoons now. Highly recommended.",
    avatar: "MK",
    accent: "#4C8C8C",
  },
]

export const FAQS = [
  {
    q: "Are you an authorised dealer for Berger and Asian Paints?",
    a: "Yes. We are an authorised dealer for both Berger Paints and Asian Paints. Every product we supply is sourced directly from the manufacturer and carries the original manufacturer warranty.",
  },
  {
    q: "Do you offer a free on-site colour consultation?",
    a: "Absolutely. Our certified colour experts visit your home or office with a curated fan deck, mood boards and lighting samples. The consultation is free for any project above 800 sq ft of painting.",
  },
  {
    q: "What areas do you serve?",
    a: "We are based in Lake Town, Kolkata and serve the entire Kolkata metropolitan area — including Salt Lake, New Town, Rajarhat, Ballygunge, Alipore and Howrah. For large commercial projects we travel further on request.",
  },
  {
    q: "How long does a typical 3 BHK interior painting take?",
    a: "A standard 3 BHK interior (about 2,800 – 3,200 sq ft of paintable area) takes 5 to 7 working days with our trained crew. We protect furniture, mask floors and clean up thoroughly at the end of each day.",
  },
  {
    q: "Do you provide a warranty on the paintwork?",
    a: "Yes. Depending on the product line and surface, we offer a 5 to 10-year warranty on the paint application, in addition to the manufacturer's product warranty. Waterproofing systems come with up to 10 years of coverage.",
  },
  {
    q: "Can you match an exact colour I have in mind?",
    a: "Yes — we offer computerised colour matching at our store. Bring a sample swatch, fabric or even a photo, and our spectrophotometer will produce a precise match within minutes.",
  },
]

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    description: "Free site visit, measurement and colour consultation with mood boards.",
    icon: "Phone",
  },
  {
    step: "02",
    title: "Quotation",
    description: "Transparent itemised quote with product brand, coverage and warranty.",
    icon: "FileText",
  },
  {
    step: "03",
    title: "Preparation",
    description: "Surface prep, putty, primer — the foundation of a 10-year finish.",
    icon: "Wrench",
  },
  {
    step: "04",
    title: "Application",
    description: "Trained crew, premium paint, daily clean-up, dust-free experience.",
    icon: "Brush",
  },
  {
    step: "05",
    title: "Handover",
    description: "Final walkthrough, touch-up, warranty card & care guide.",
    icon: "CheckCircle2",
  },
]

export const WHY_US = [
  {
    icon: "ShieldCheck",
    title: "Authorised Dealer",
    description: "100% genuine Berger & Asian Paints products with full manufacturer warranty.",
  },
  {
    icon: "Palette",
    title: "Certified Colour Experts",
    description: "In-house colour consultants trained by Asian Paints & Berger academies.",
  },
  {
    icon: "Users",
    title: "Trained In-house Crew",
    description: "No sub-contractors. Our 24 painters are trained, insured and uniformed.",
  },
  {
    icon: "Clock",
    title: "On-time, Every Time",
    description: "We commit to a delivery date in writing — and we honour it.",
  },
  {
    icon: "Sparkles",
    title: "Dust-free Promise",
    description: "Floor masking, furniture covers and daily site clean-up.",
  },
  {
    icon: "BadgePercent",
    title: "Price-match Guarantee",
    description: "Find a lower authorised-dealer price and we will match it.",
  },
]

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Quiz", href: "#quiz" },
  { label: "Estimate", href: "#calculator" },
  { label: "Colours", href: "#visualizer" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]
