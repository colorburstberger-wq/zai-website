// Static content for Berger Urban Exclusive Paints Store, Gorakhpur

export const SHOP = {
  name: "Berger Urban Exclusive",
  fullName: "Berger Urban Exclusive Paints Store",
  shortName: "Berger Urban Exclusive",
  tagline: "Gorakhpur's trusted Berger Paints exclusive store.",
  founded: 2010,
  phone: "+91 94150 00000",
  whatsapp: "+91 94150 00000",
  email: "bergerurbanexclusive.gkp@gmail.com",
  address: "HIG B 98, Rail Vihar Colony Phase 3rd, Taramandal, Siddharth Enclave, Gorakhpur, Uttar Pradesh 273017",
  addressShort: "Siddharth Enclave, Taramandal, Gorakhpur 273017",
  hours: [
    { day: "Monday – Saturday", time: "8:00 AM – 8:30 PM" },
    { day: "Sunday", time: "9:00 AM – 6:00 PM" },
  ],
  mapsQuery: "Berger Urban Exclusive Paints Store Gorakhpur Siddharth Enclave",
  rating: "5.0",
  ratingCount: 23,
  gmbUrl: "https://share.google/9Svv8nrbyb5DO4E8L",
}

export const PARTNERS = [
  {
    name: "Berger Paints",
    href: "https://www.bergerpaints.com/",
    blurb: "Our flagship partnership — we are an authorised Berger Urban Exclusive Paints Store stocking the full Berger interior, exterior & weatherproof range.",
    accent: "#C8102E",
    tag: "Urban Exclusive Store",
    initials: "BP",
  },
  {
    name: "Asian Paints",
    href: "https://www.asianpaints.com/",
    blurb: "In collaboration with Asian Paints — we supply Royale, Apex, Ultima & SmartCare lines on request for our Gorakhpur customers.",
    accent: "#E2231A",
    tag: "Collaboration Partner",
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
      "Silk-smooth emulsion finishes with Berger Easy Clean, Breathe Easy & Luxol — designer accent walls and flawless ceilings crafted to make your interiors glow.",
    features: ["Berger Easy Clean", "Breathe Easy (low odour)", "Accent walls", "Anti-stain top coats"],
    starting: "₹14 / sq ft",
  },
  {
    id: "exterior",
    title: "Exterior Painting",
    icon: "Building2",
    image: "/images/gallery-exterior.png",
    description:
      "Weatherproof exterior systems with Berger Weathercoat, Weathercoat Anti-Dust & Heatguard — UV resistant, anti-fungal, monsoon ready.",
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
      "Full-spectrum waterproofing for terraces, bathrooms, tanks and basements with Berger Aqua Shield system — proven in Gorakhpur's monsoon.",
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
    name: "Berger Easy Clean",
    category: "Interior Emulsion",
    brand: "Berger Paints",
    finish: "Smooth Sheen",
    coverage: "300 – 340 sq ft / L (2 coats)",
    warranty: "8 years",
    swatch: "#A89B7B",
    highlights: ["Anti-stain", "Washable", "Anti-fungal", "Low VOC"],
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
    name: "Berger Breathe Easy",
    category: "Interior Emulsion",
    brand: "Berger Paints",
    finish: "Soft Matt",
    coverage: "320 – 360 sq ft / L (2 coats)",
    warranty: "5 years",
    swatch: "#B5743F",
    highlights: ["Zero odour", "Low VOC", "Kids-safe", "Anti-bacterial"],
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
    name: "Berger Aqua Shield",
    category: "Waterproofing",
    brand: "Berger Paints",
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
    location: "Siddharth Enclave, Gorakhpur",
    brand: "Berger Easy Clean",
    year: "2024",
  },
  {
    title: "Warm Villa Exterior",
    category: "Exterior",
    image: "/images/gallery-exterior.png",
    location: "Taramandal, Gorakhpur",
    brand: "Berger Weathercoat",
    year: "2024",
  },
  {
    title: "Sage Bedroom Retreat",
    category: "Interior",
    image: "/images/gallery-bedroom.png",
    location: "Rail Vihar, Gorakhpur",
    brand: "Berger Breathe Easy",
    year: "2023",
  },
  {
    title: "Mustard Workspace",
    category: "Commercial",
    image: "/images/gallery-office.png",
    location: "Buddh Vihar, Gorakhpur",
    brand: "Berger Luxol",
    year: "2024",
  },
  {
    title: "Terracotta Modular Kitchen",
    category: "Wood Finish",
    image: "/images/gallery-kitchen.png",
    location: "Asuran Chowk, Gorakhpur",
    brand: "Berger Luxol Satin",
    year: "2023",
  },
  {
    title: "Stucco Accent Wall",
    category: "Texture",
    image: "/images/service-texture.png",
    location: "Golghar, Gorakhpur",
    brand: "Berger Designory",
    year: "2024",
  },
]

export const STATS = [
  { value: 1200, suffix: "+", label: "Homes painted", back: "Across Siddharth Enclave, Taramandal, Rail Vihar & 8 more areas in Gorakhpur", icon: "Home" },
  { value: 15, suffix: " yrs", label: "Serving Gorakhpur since 2010", back: "Family-run Berger Urban Exclusive store — never sub-contracted", icon: "Award" },
  { value: 8500, suffix: "+", label: "Sq ft of texture art", back: "Berger Designory stucco, metallic & hand-troweled finishes", icon: "Sparkles" },
  { value: 100, suffix: "%", label: "5-star rated on Google", back: "23 verified Google reviews — all 5 stars", icon: "Heart" },
]

export const TESTIMONIALS = [
  {
    name: "Amit Jaiswal",
    role: "Homeowner, Siddharth Enclave",
    rating: 5,
    text: "Best Berger Paints store in Gorakhpur, hands down. The team understood exactly what I wanted for my living room and recommended Berger Easy Clean. The finish is flawless and stains wipe right off. Truly an Urban Exclusive experience.",
    avatar: "AJ",
    accent: "#E0623A",
  },
  {
    name: "Sunita Mishra",
    role: "Homeowner, Taramandal",
    rating: 5,
    text: "I got my full home painted with Berger Breathe Easy — no smell at all, my kids could sleep in the next room the same evening! The store owner personally came to check the shade match. Genuine, honest people.",
    avatar: "SM",
    accent: "#F2A93B",
  },
  {
    name: "Rakesh Gupta",
    role: "Builder, Asuran Chowk",
    rating: 5,
    text: "I've been buying Berger Weathercoat from this store for all my projects for the past 3 years. Always genuine product, fair price, and they deliver to site the same day. The 5-star Google rating is well deserved.",
    avatar: "RG",
    accent: "#8FA68E",
  },
  {
    name: "Priya Tiwari",
    role: "Homemaker, Rail Vihar Colony",
    rating: 5,
    text: "From selecting the perfect shade with the colour visualizer to the final handover, the whole experience was smooth. They even helped match a custom shade for my pooja room. Highly recommend to anyone in Gorakhpur.",
    avatar: "PT",
    accent: "#4C8C8C",
  },
]

export const FAQS = [
  {
    q: "Are you an authorised Berger Paints store?",
    a: "Yes. We are an authorised Berger Urban Exclusive Paints Store located in Siddharth Enclave, Gorakhpur. Every Berger product we supply is sourced directly from Berger Paints India and carries the original manufacturer warranty. We also collaborate with Asian Paints to supply their products on request.",
  },
  {
    q: "Do you offer on-site colour consultation in Gorakhpur?",
    a: "Absolutely. Our colour experts visit your home or office anywhere in Gorakhpur with a curated Berger fan deck, mood boards and lighting samples. The consultation is free for any project above 600 sq ft of painting.",
  },
  {
    q: "What areas of Gorakhpur do you serve?",
    a: "We are based in Siddharth Enclave, Taramandal, Gorakhpur and serve the entire Gorakhpur district — including Taramandal, Rail Vihar, Buddh Vihar, Asuran Chowk, Golghar, Rapti Nagar, Mahendra Nagar, Civil Lines and beyond. For large commercial projects we travel further on request.",
  },
  {
    q: "How long does a typical 3 BHK interior painting take?",
    a: "A standard 3 BHK interior (about 2,800 – 3,200 sq ft of paintable area) takes 5 to 7 working days with our trained crew. We protect furniture, mask floors and clean up thoroughly at the end of each day.",
  },
  {
    q: "Do you provide a warranty on the paintwork?",
    a: "Yes. Depending on the Berger product line and surface, we offer a 5 to 10-year warranty on the paint application, in addition to Berger's manufacturer product warranty. Waterproofing systems come with up to 10 years of coverage.",
  },
  {
    q: "Can you match an exact colour I have in mind?",
    a: "Yes — we offer computerised colour matching at our store using Berger's Color Bank system. Bring a sample swatch, fabric or even a photo, and we will produce a precise match within minutes.",
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
    title: "Berger Urban Exclusive Store",
    description: "100% genuine Berger products sourced directly from the manufacturer, with full warranty. Also supplying Asian Paints on request.",
  },
  {
    icon: "Palette",
    title: "Color Bank Shade Matching",
    description: "Berger Color Bank on site — we match any shade you bring, in minutes.",
  },
  {
    icon: "Users",
    title: "Family-run Since 2010",
    description: "Honest, family-run store in Siddharth Enclave — no sub-contractors, ever.",
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
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Calculator", href: "#calculator" },
  { label: "Colours", href: "#visualizer" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]
