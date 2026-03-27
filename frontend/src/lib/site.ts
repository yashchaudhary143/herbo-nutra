import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herbonutraextract.com";

export const company = {
  name: "Herbo Nutra Extract Pvt. Ltd.",
  shortName: "Herbo Nutra Extract",
  email: "info@herbonutraextract.com",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  address: "Plot 18, Herbal Industrial Estate, Vadodara, Gujarat 390010, India",
  mapEmbedUrl: "https://www.google.com/maps?q=Vadodara%2C%20Gujarat&z=13&output=embed",
};

export type MediaTone =
  | "hero"
  | "botanical"
  | "facility"
  | "lab"
  | "packaging"
  | "portrait"
  | "catalog";

export type MediaSlot = {
  src?: string;
  title: string;
  note: string;
  tone: MediaTone;
};

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/extraction-process", label: "Manufacturing" },
  { href: "/founder-note", label: "Founder" },
  { href: "/contact", label: "Contact" },
];

export const utilityBar = ["Herbal Extracts", "Nutraceutical Ingredients", "Export Support"];

export const homeStats = [
  { value: "B2B", label: "Trade-focused supply" },
  { value: "5", label: "Public process stages" },
  { value: "<24 hrs", label: "Response target" },
];

export const certificationStrip = ["FSSAI", "GMP", "ISO", "Traceability", "Documentation"];

export const categoryTeasers = [
  {
    slug: "herbal-extracts",
    title: "Herbal Extracts",
    summary: "Standardized botanicals for nutraceutical and ayurvedic formulations.",
    media: {
      src: "/images/HerbalExtracts.jpg",
      title: "Herbal extracts image",
      note: "Herb and finished extract photography.",
      tone: "botanical",
    } satisfies MediaSlot,
  },
  {
    slug: "mushroom-extracts",
    title: "Mushroom Extracts",
    summary: "Functional mushroom ingredients for immunity and wellness products.",
    media: {
      src: "/images/MushroomExtracts.jpg",
      title: "Mushroom extracts image",
      note: "Mushroom biomass or finished extract imagery.",
      tone: "catalog",
    } satisfies MediaSlot,
  },
  {
    slug: "specialty-botanicals",
    title: "Specialty Botanicals",
    summary: "Polyphenols and plant actives for targeted formulation programs.",
    media: {
      src: "/images/BotanicalExtracts.jpg",
      title: "Polyphenols and specialty actives",
      note: "Bioactive ingredient, QC, or packaging photography.",
      tone: "lab",
    } satisfies MediaSlot,
  },
  {
    slug: "amino-acids",
    title: "Amino Acids",
    summary: "High-purity ingredients for performance, wellness, and functional product lines.",
    media: {
      src: "/images/AminoAcids.jpg",
      title: "Clean blending or batching image",
      note: "Batching, blending, or quality release photography.",
      tone: "lab",
    } satisfies MediaSlot,
  },
  {
    slug: "vitamins-minerals",
    title: "Vitamins & Minerals",
    summary: "Fortification ingredients supported by technical review and supply coordination.",
    media: {
      src: "/images/Vitamins&Minerals.jpg",
      title: "Lab and quality release image",
      note: "QC, packaging, or finished ingredient visuals.",
      tone: "facility",
    } satisfies MediaSlot,
  },
  {
    slug: "botanical-powders",
    title: "Botanical Powders",
    summary: "Powdered ingredients for blends, sachets, capsules, and private-label formats.",
    media: {
      src: "/images/BotanicalPowders.jpg",
      title: "Packaging and warehouse image",
      note: "Drum packing, lined cartons, or warehouse imagery.",
      tone: "packaging",
    } satisfies MediaSlot,
  },
];

export const homeContent = {
  heroTitle: "Botanical and nutraceutical ingredients for serious B2B buyers.",
  heroText:
    "Herbo Nutra Extract Pvt. Ltd. supplies herbal extracts and nutraceutical ingredients for formulation, sourcing, and export requirements.",
  heroMedia: {
    src: "/images/HomeHero.jpg",
    title: "Home hero image",
    note: "Wide facility or ingredient photography.",
    tone: "hero",
  } satisfies MediaSlot,
  highlights: [
    {
      title: "Manufacturing focus",
      text: "Products, process visibility, and buyer support stay central across the site.",
    },
    {
      title: "Clear technical catalog",
      text: "Search by common name, botanical name, and specification without leaving the page.",
    },
    {
      title: "Direct commercial path",
      text: "Contact forms are visible where buyers actually decide to contact a supplier.",
    },
  ],
  processMedia: {
    src: "/images/HomeManufacturing.jpg",
    title: "Manufacturing image",
    note: "Lab, inspection, or production-floor photography.",
    tone: "lab",
  } satisfies MediaSlot,
  founderMedia: {
    title: "Founder or leadership portrait",
    note: "Founder portrait or leadership context.",
    tone: "portrait",
  } satisfies MediaSlot,
};

export const aboutContent = {
  title: "A manufacturing partner for herbal extracts and nutraceutical ingredients.",
  intro:
    "Herbo Nutra Extract supports brands, formulators, and sourcing teams with botanical ingredients, technical clarity, and responsive commercial support.",
  mission:
    "Support long-term ingredient relationships through straightforward communication, process visibility, and dependable product presentation.",
  vision:
    "Make nutraceutical sourcing feel more structured and less uncertain from first contact onward.",
  stats: [
    { value: "India", label: "Manufacturing base" },
    { value: "B2B", label: "Commercial focus" },
    { value: "Export-ready", label: "Documentation posture" },
  ],
  facilityMedia: {
    src: "/images/FacilityImage.jpg",
    title: "Facility image",
    note: "Production area, warehouse, or dispatch photography.",
    tone: "facility",
  } satisfies MediaSlot,
  qualityMedia: {
    src: "/images/QualityControl.jpg",
    title: "Quality control image",
    note: "Lab work or release desk visuals.",
    tone: "lab",
  } satisfies MediaSlot,
  bullets: [
    "Structured catalog built for quick product shortlisting",
    "Visible manufacturing narrative for buyer reassurance",
    "Direct contact flow for specification and supply discussions",
  ],
};

export const processSteps = [
  {
    title: "Raw Material Selection",
    description: "Raw herbs and input materials are screened before processing begins.",
    image: "/images/RawMaterial.jpg",
  },
  {
    title: "Extraction",
    description: "Processing conditions are managed to align output with target specifications.",
    image: "/images/Extraction.jpg",
  },
  {
    title: "Filtration",
    description: "Clarification supports consistency and cleaner downstream handling.",
    image: "/images/Filtration.jpg",
  },
  {
    title: "Drying",
    description: "Drying is tuned for stability, handling, and formulation suitability.",
    image: "/images/Drying.jpg",
  },
  {
    title: "Packaging",
    description: "Packed lots are prepared for traceability, storage, and dispatch.",
    image: "/images/Packaging.jpg",
  },
];

export const extractionContent = {
  heroMedia: {
    src: "/images/ProcessHero.jpg",
    title: "Process hero image",
    note: "Vessel, line, or production photography.",
    tone: "facility",
  } satisfies MediaSlot,
  sideMedia: {
    src: "/images/Packaging.jpg",
    title: "Packaging image",
    note: "Inspection, packing, or dispatch visuals.",
    tone: "packaging",
  } satisfies MediaSlot,
  videoTitle: "Inside Our Extraction Workflow",
  videoUrl: "https://www.youtube.com/embed/qJcMj2G2oBg?si=MSrM4Exb5-cp4c7h",
};

export const founderContent = {
  title: "A founder's perspective on quality, clarity, and long-term supply relationships.",
  summary:
    "Our approach is built around clear product presentation, disciplined manufacturing, and dependable commercial follow-up.",
  body: [
    "Herbo Nutra Extract is built around the idea that ingredient supply should feel clear from the first interaction. Buyers should be able to review the product range, understand how the company works, and contact the team without delay.",
    "Our focus is on practical buyer needs: reliable product presentation, visible manufacturing logic, and direct communication on specification, pricing, and supply discussions.",
  ],
  values: ["Clarity", "Process discipline", "Reliable follow-up"],
  media: {
    title: "Founder portrait",
    note: "Portrait in office, facility, or warehouse context.",
    tone: "portrait",
  } satisfies MediaSlot,
};

export const productPageCopy = {
  intro: "Use the catalog directly to search products, compare specifications, and narrow the range quickly.",
  heroMedia: {
    src: "/images/HerbalExtracts.jpg",
    title: "Product catalog image",
    note: "Product catalog hero image.",
    tone: "botanical",
  } satisfies MediaSlot,
  categoryTrustPoints: [
    "Common name, botanical name, and specification shown together",
    "Category pages keep context visible without adding clutter",
    "Contact links stay close to the product data",
  ],
};

export const categoryContentBySlug: Record<
  string,
  {
    overview: string;
    applications: string[];
    trustNote: string;
    media: MediaSlot;
  }
> = {
  "herbal-extracts": {
    overview: "Standardized botanicals for nutraceutical, ayurvedic, and wellness development.",
    applications: ["Capsules and tablets", "Functional blends", "Traditional wellness formulas"],
    trustNote: "This page keeps the technical table central while giving buyers enough context to stay oriented.",
    media: {
      src: "/images/HerbalExtracts.jpg",
      title: "Herbal extracts image",
      note: "Herb and finished extract photography.",
      tone: "botanical",
    },
  },
  "mushroom-extracts": {
    overview: "Functional mushroom ingredients for immunity, cognition, and wellness products.",
    applications: ["Immune support", "Cognitive support", "Functional blends"],
    trustNote: "This category keeps mushroom ingredients easy to compare and review.",
    media: {
      src: "/images/MushroomExtracts.jpg",
      title: "Mushroom extracts image",
      note: "Mushroom biomass or finished extract imagery.",
      tone: "catalog",
    },
  },
  "specialty-botanicals": {
    overview: "Polyphenols, bioactives, and targeted plant actives for formulation programs.",
    applications: ["Antioxidant blends", "Targeted wellness formulas", "Private label ingredients"],
    trustNote: "This category groups the more specialized bioactives into one clear view.",
    media: {
      src: "/images/BotanicalExtracts.jpg",
      title: "Specialty botanicals image",
      note: "QC, active ingredient, or packaging imagery.",
      tone: "lab",
    },
  },
  "amino-acids": {
    overview: "High-purity amino acid ingredients for performance and wellness formulations.",
    applications: ["Sports nutrition", "Daily wellness formulas", "Functional beverage systems"],
    trustNote: "The page is intentionally simple so category review stays fast.",
    media: {
      src: "/images/AminoAcids.jpg",
      title: "Amino acids image",
      note: "Blending or clean finished ingredient visuals.",
      tone: "catalog",
    },
  },
  "vitamins-minerals": {
    overview: "Fortification ingredients for product lines that need clean technical presentation.",
    applications: ["Fortified blends", "General wellness products", "Export-oriented supply"],
    trustNote: "The emphasis is on readability, not decorative page structure.",
    media: {
      src: "/images/Vitamins&Minerals.jpg",
      title: "Vitamins and minerals image",
      note: "QC, packaging, or product photography.",
      tone: "lab",
    },
  },
  "botanical-powders": {
    overview: "Powdered botanical ingredients for blends, sachets, capsules, and private-label formats.",
    applications: ["Blended formulas", "Capsules and sachets", "Private label ingredients"],
    trustNote: "This page keeps the botanical powder range easy to scan and compare.",
    media: {
      src: "/images/BotanicalPowders.jpg",
      title: "Botanical powders image",
      note: "Powder texture, packaging, or warehouse context.",
      tone: "packaging",
    },
  },
};

export const contactCopy = {
  prompt: "Use this page for company contact, documentation questions, and partnership discussions.",
  details: [
    "Phone and WhatsApp for quick follow-up",
    "Email for technical and commercial coordination",
    "Map and address details for company visibility",
  ],
  heroMedia: {
    src: "/images/ContactProductSupport.jpg",
    title: "Contact and product support image",
    note: "Product support, sampling, or packaging context.",
    tone: "packaging",
  } satisfies MediaSlot,
  sideMedia: {
    src: "/images/QualityControl.jpg",
    title: "Support and QA image",
    note: "QA or support context for contact follow-up.",
    tone: "lab",
  } satisfies MediaSlot,
};

export const seoDescriptions = {
  home:
    "Herbo Nutra Extract Pvt. Ltd. supplies herbal extracts and nutraceutical ingredients through a clear B2B catalog and inquiry workflow.",
  about:
    "Learn about Herbo Nutra Extract Pvt. Ltd., its manufacturing profile, quality approach, and B2B ingredient focus.",
  products:
    "Browse herbal extracts, amino acids, vitamins, minerals, and nutraceutical ingredients in a structured B2B catalog.",
  process:
    "Review the Herbo Nutra extraction process from raw material selection to final packaging.",
  founder:
    "Read the founder’s note and the company approach behind Herbo Nutra Extract’s B2B ingredient business.",
  inquiry:
    "Send a B2B inquiry to Herbo Nutra Extract for product requirements, quotations, and supply discussions.",
  contact:
    "Contact Herbo Nutra Extract Pvt. Ltd. for nutraceutical ingredients, manufacturing support, and partnership inquiries.",
};

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      type: "website",
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressCountry: "IN",
  },
};
