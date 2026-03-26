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
      title: "Botanical ingredient photography",
      note: "Use dried herb, extract powder, or capsule-ready ingredient imagery here.",
      tone: "botanical",
    } satisfies MediaSlot,
  },
  {
    slug: "mushroom-extracts",
    title: "Mushroom Extracts",
    summary: "Functional mushroom ingredients for immunity and wellness products.",
    media: {
      title: "Functional mushroom photography",
      note: "Use mushroom biomass, extract powder, or lab release imagery here.",
      tone: "catalog",
    } satisfies MediaSlot,
  },
  {
    slug: "specialty-botanicals",
    title: "Specialty Botanicals",
    summary: "Polyphenols and plant actives for targeted formulation programs.",
    media: {
      title: "Polyphenols and specialty actives",
      note: "Use bioactive ingredient, QC, or packaging photography here.",
      tone: "lab",
    } satisfies MediaSlot,
  },
  {
    slug: "amino-acids",
    title: "Amino Acids",
    summary: "High-purity ingredients for performance, wellness, and functional product lines.",
    media: {
      title: "Clean blending or batching image",
      note: "Use batching, blending, or quality release photography here.",
      tone: "lab",
    } satisfies MediaSlot,
  },
  {
    slug: "vitamins-minerals",
    title: "Vitamins & Minerals",
    summary: "Fortification ingredients supported by technical review and supply coordination.",
    media: {
      title: "Lab and quality release image",
      note: "Use QC, packaging, or finished ingredient visuals here.",
      tone: "facility",
    } satisfies MediaSlot,
  },
  {
    slug: "botanical-powders",
    title: "Botanical Powders",
    summary: "Powdered ingredients for blends, sachets, capsules, and private-label formats.",
    media: {
      title: "Packaging and warehouse image",
      note: "Use drum packing, lined cartons, or warehouse imagery here.",
      tone: "packaging",
    } satisfies MediaSlot,
  },
];

export const homeContent = {
  heroTitle: "Botanical and nutraceutical ingredients for serious B2B buyers.",
  heroText:
    "Herbo Nutra Extract Pvt. Ltd. supplies herbal extracts and nutraceutical ingredients with a clear catalog, visible process story, and direct inquiry path.",
  heroMedia: {
    title: "Facility, raw herb, and finished ingredient hero",
    note: "Replace with a wide facility image, herb close-up, or production still.",
    tone: "hero",
  } satisfies MediaSlot,
  highlights: [
    {
      title: "Manufacturer-first presentation",
      text: "The site leads with products, process, and buyer trust instead of decorative marketing copy.",
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
    title: "QC and manufacturing image",
    note: "Replace with a real lab, inspection, or production-floor image.",
    tone: "lab",
  } satisfies MediaSlot,
  founderMedia: {
    title: "Founder or leadership portrait",
    note: "Replace with a portrait paired with facility or warehouse context.",
    tone: "portrait",
  } satisfies MediaSlot,
};

export const aboutContent = {
  title: "A cleaner company profile for buyers, formulators, and sourcing teams.",
  intro:
    "Herbo Nutra Extract is presented as a supply and manufacturing partner for companies that need botanical ingredients, technical clarity, and responsive follow-up.",
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
    title: "Facility and warehouse photography",
    note: "Use production area, warehouse, or dispatch photography here.",
    tone: "facility",
  } satisfies MediaSlot,
  qualityMedia: {
    title: "Certificates and QA imagery",
    note: "Use certificates, lab work, or release desk visuals here.",
    tone: "lab",
  } satisfies MediaSlot,
  bullets: [
    "Structured catalog built for quick product shortlisting",
    "Visible manufacturing narrative for buyer reassurance",
    "Contact and inquiry flow designed for trade conversations",
  ],
};

export const processSteps = [
  {
    title: "Raw Material Selection",
    description: "Raw herbs and input materials are screened before processing begins.",
    image: "/process/raw-material.svg",
  },
  {
    title: "Extraction",
    description: "Processing conditions are managed to align output with target specifications.",
    image: "/process/extraction.svg",
  },
  {
    title: "Filtration",
    description: "Clarification supports consistency and cleaner downstream handling.",
    image: "/process/filtration.svg",
  },
  {
    title: "Drying",
    description: "Drying is tuned for stability, handling, and formulation suitability.",
    image: "/process/drying.svg",
  },
  {
    title: "Packaging",
    description: "Packed lots are prepared for traceability, storage, and dispatch.",
    image: "/process/packaging.svg",
  },
];

export const extractionContent = {
  heroMedia: {
    title: "Manufacturing and process-floor image",
    note: "Replace with vessel, line, or supervised production photography.",
    tone: "facility",
  } satisfies MediaSlot,
  sideMedia: {
    title: "QC and packing image",
    note: "Replace with inspection, packing, or dispatch visuals.",
    tone: "packaging",
  } satisfies MediaSlot,
  videoTitle: "Inside Our Extraction Workflow",
  videoUrl: "https://www.youtube.com/embed/qJcMj2G2oBg?si=MSrM4Exb5-cp4c7h",
};

export const founderContent = {
  title: "A simple founder page that builds confidence instead of adding noise.",
  summary:
    "We want buyers to see a company that understands process, product clarity, and commercial follow-up before they request a quotation.",
  body: [
    "Herbo Nutra Extract is built around the idea that ingredient supply should feel clear from the first interaction. Buyers should be able to review the product range, understand how the company works, and contact the team without moving through unnecessary marketing language.",
    "Our focus is on practical buyer needs: reliable product presentation, visible manufacturing logic, and direct communication on specification, quantity, and supply discussions.",
  ],
  values: ["Clarity", "Process discipline", "Reliable follow-up"],
  media: {
    title: "Founder portrait",
    note: "Replace with a portrait in office, facility, or warehouse context.",
    tone: "portrait",
  } satisfies MediaSlot,
};

export const productPageCopy = {
  intro: "Browse categories first, then use the catalog table to compare products quickly.",
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
      title: "Herbal extract category image",
      note: "Replace with herb and finished extract photography.",
      tone: "botanical",
    },
  },
  "mushroom-extracts": {
    overview: "Functional mushroom ingredients for immunity, cognition, and wellness products.",
    applications: ["Immune support", "Cognitive support", "Functional blends"],
    trustNote: "A simple category page keeps mushroom ingredients easy to compare.",
    media: {
      title: "Mushroom extract category image",
      note: "Replace with mushroom biomass or finished extract imagery.",
      tone: "catalog",
    },
  },
  "specialty-botanicals": {
    overview: "Polyphenols, bioactives, and targeted plant actives for formulation programs.",
    applications: ["Antioxidant blends", "Targeted wellness formulas", "Private label ingredients"],
    trustNote: "This category groups the more specialized bioactives into one clear view.",
    media: {
      title: "Specialty botanical category image",
      note: "Replace with QC, active ingredient, or packaging imagery.",
      tone: "lab",
    },
  },
  "amino-acids": {
    overview: "High-purity amino acid ingredients for performance and wellness formulations.",
    applications: ["Sports nutrition", "Daily wellness formulas", "Functional beverage systems"],
    trustNote: "The page is intentionally simple so category review stays fast.",
    media: {
      title: "Amino acid category image",
      note: "Replace with blending or clean finished ingredient visuals.",
      tone: "catalog",
    },
  },
  "vitamins-minerals": {
    overview: "Fortification ingredients for product lines that need clean technical presentation.",
    applications: ["Fortified blends", "General wellness products", "Export-oriented supply"],
    trustNote: "The emphasis is on readability, not decorative page structure.",
    media: {
      title: "Vitamins and minerals category image",
      note: "Replace with QC, packaging, or product photography.",
      tone: "lab",
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
