/**
 * Single source of truth for company details.
 * Update here and every page, the footer, metadata and structured data follow.
 */
export const site = {
  name: "Soulcast Robotics",
  shortName: "Soulcast",
  url: "https://soulcastrobotics.com",
  tagline: "Work, reimagined.",
  description:
    "Soulcast Robotics is an AI and robotics company from Kozhikode, Kerala, building intelligent machines that will change how people work in every industry. Launching soon.",
  email: "admin@soulcastrobotics.com",
  whatsapp: {
    display: "+91 96055 56054",
    // International format without "+" or spaces, as wa.me expects
    number: "919605556054",
  },
  address: {
    locality: "Kozhikode",
    region: "Kerala",
    country: "India",
    countryCode: "IN",
  },
  keywords: [
    "Soulcast Robotics",
    "AI company Kerala",
    "robotics company Kozhikode",
    "artificial intelligence",
    "industrial robotics",
    "automation",
    "future of work",
  ],
} as const;

/**
 * Navigation. Add entries here as new pages ship (e.g. { label: "About", href: "/about" }).
 * The header renders this list automatically.
 */
export const nav: { label: string; href: string }[] = [
  { label: "Vision", href: "/#vision" },
  { label: "Contact", href: "/#contact" },
];

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
