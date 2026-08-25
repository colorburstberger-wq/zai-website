// Real Berger Paints shades with official Berger colour codes
// Source: bergerpaints.com/colour/colour-catalogue/

export interface BergerShade {
  name: string
  hex: string
  code: string
  mood: string
  category: string
}

export const BERGER_SHADES: BergerShade[] = [
  // Earth Tones
  { name: "Brunette", hex: "#977A6E", code: "8D2554", mood: "Deep & grounding", category: "Earth" },
  { name: "Spring Banquet", hex: "#CEE4E1", code: "7P1449", mood: "Natural & warm", category: "Earth" },
  { name: "Calm Seas", hex: "#AED4D3", code: "7T1443", mood: "Serene & balanced", category: "Earth" },
  { name: "Pinetree Trail", hex: "#448688", code: "7D1447", mood: "Forest & grounding", category: "Earth" },
  { name: "Mowed Lawn", hex: "#7B723E", code: "7A2411", mood: "Earthy & natural", category: "Earth" },
  { name: "Garden Escape", hex: "#B2D6CE", code: "7T1459", mood: "Lush & calming", category: "Earth" },
  // Blue
  { name: "Frosted Ice", hex: "#D1EAEF", code: "5P0123", mood: "Cool & airy", category: "Blue" },
  { name: "Robin's Egg", hex: "#AFDDED", code: "5P0142", mood: "Fresh & classic", category: "Blue" },
  { name: "Blue Streak", hex: "#69BAD8", code: "5T1077", mood: "Bright & energetic", category: "Blue" },
  { name: "Bright Turquoise", hex: "#1791B6", code: "5D1087", mood: "Tropical & bold", category: "Blue" },
  { name: "Open Sky", hex: "#72B2D5", code: "5T1101", mood: "Airy & open", category: "Blue" },
  { name: "Azure Sky", hex: "#87ADCA", code: "5T1157", mood: "Calm & dreamy", category: "Blue" },
  // Green
  { name: "Brazen Green", hex: "#006259", code: "4A2183", mood: "Bold & deep", category: "Green" },
  { name: "Lime Kiss", hex: "#CFD020", code: "4A0400", mood: "Fresh & zesty", category: "Green" },
  { name: "Fuji Apple", hex: "#EDDB78", code: "4T2863", mood: "Warm & fruity", category: "Green" },
  { name: "Mint Leaf", hex: "#E9EFB8", code: "3T0851", mood: "Soft & fresh", category: "Green" },
  { name: "Hanging Willows", hex: "#ABA55A", code: "4D2107", mood: "Natural & earthy", category: "Green" },
  { name: "Prairie Path", hex: "#E9F2D3", code: "3P0857", mood: "Light & airy", category: "Green" },
  // Neutral
  { name: "Elusive Grey", hex: "#858784", code: "8A0427", mood: "Sophisticated & calm", category: "Neutral" },
  { name: "Charcoal Sky", hex: "#484A52", code: "8A0348", mood: "Moody & modern", category: "Neutral" },
  { name: "Flying Seagull", hex: "#DEDEDB", code: "8P1959", mood: "Airy & light", category: "Neutral" },
  { name: "Desert Sage", hex: "#80898D", code: "8A0426", mood: "Muted & versatile", category: "Neutral" },
  { name: "Silver Queen", hex: "#9FA5A3", code: "8T1693", mood: "Cool & elegant", category: "Neutral" },
  { name: "Victorious Grey", hex: "#9EA2A0", code: "8T2691", mood: "Balanced & timeless", category: "Neutral" },
  // White
  { name: "Savvy White", hex: "#F0EFE7", code: "3P1843", mood: "Clean & crisp", category: "White" },
  { name: "White Swan", hex: "#F2EEE5", code: "2P1847", mood: "Pure & elegant", category: "White" },
  { name: "Steamed Milk", hex: "#EEEADB", code: "7P1545", mood: "Soft & warm", category: "White" },
  { name: "Frozen Ice", hex: "#F8F6EB", code: "4P1849", mood: "Cool & luminous", category: "White" },
  { name: "Powder Puff", hex: "#EFF0EC", code: "3P1845", mood: "Gentle & airy", category: "White" },
  { name: "Sugar Icing", hex: "#FAF4DD", code: "3P0237", mood: "Sweet & delicate", category: "White" },
]

// Total: 30 shades across 5 categories
