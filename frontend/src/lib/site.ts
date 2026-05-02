import type { Metadata } from "next";

import type { Category } from "@/lib/api";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herbonutraextract.com";

export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? process.env.COMPANY_NAME ?? "Herbo Nutra Extract Pvt. Ltd.",
  shortName: process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME ?? process.env.COMPANY_SHORT_NAME ?? "Herbo Nutra Extract",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? process.env.COMPANY_EMAIL ?? "info@herbonutraextract.com",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? process.env.COMPANY_PHONE ?? "+91 98765 43210",
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ??
    process.env.COMPANY_ADDRESS ??
    "Plot 18, Herbal Industrial Estate, Vadodara, Gujarat 390010, India",
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    process.env.GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps?q=Vadodara%2C%20Gujarat&z=13&output=embed",
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
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/formats", label: "Formats" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/extraction-process", label: "Manufacturing" },
  { href: "/contact", label: "Contact Us" },
];

export const utilityBar = ["Herbal Extracts", "Nutraceutical Ingredients", "Export Support"];

export const homeStats = [
  { value: "B2B", label: "Trade-focused supply" },
  { value: "5", label: "Public process stages" },
  { value: "<24 hrs", label: "Response target" },
];

export const certificationStrip = [
  "ISO 9001",
  "ISO 22000",
  "FSSC 22000",
  "HACCP",
  "GMP",
  "FSSAI",
  "HALAL",
  "KOSHER",
];

export function getPublicCategoryLabel(slug: string, fallback?: string) {
  return (
    fallback ??
    slug
      .split("-")
      .filter(Boolean)
      .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
      .join(" ")
  );
}

const categoryMediaBySlug: Record<string, MediaSlot> = {
  "herbal-extracts": {
    src: "/images/HerbalExtracts.jpg",
    title: "Herbal extracts image",
    note: "Botanical raw material, food ingredient, nutraceutical extract, or finished ingredient photography.",
    tone: "botanical",
  },
  "amino-acids": {
    src: "/images/AminoAcids.jpg",
    title: "Amino acids image",
    note: "Batching, blending, or quality release photography.",
    tone: "lab",
  },
  "plant-sourced-vitamins-minerals": {
    src: "/images/Vitamins&Minerals.jpg",
    title: "Plant sourced vitamins and minerals image",
    note: "Plant-sourced nutrient, QC, packaging, or finished ingredient photography.",
    tone: "lab",
  },
};

const fallbackCategoryMedia: MediaSlot[] = [
  {
    src: "/images/HerbalExtracts.jpg",
    title: "Botanical ingredients image",
    note: "Botanical ingredient photography.",
    tone: "botanical",
  },
  {
    src: "/images/BotanicalPowders.jpg",
    title: "Ingredient powders image",
    note: "Powder texture or ingredient photography.",
    tone: "catalog",
  },
  {
    src: "/images/QualityControl.jpg",
    title: "Quality control image",
    note: "Quality review or technical support imagery.",
    tone: "lab",
  },
  {
    src: "/images/FacilityImage.jpg",
    title: "Facility image",
    note: "Facility or production photography.",
    tone: "facility",
  },
];

export function getCategoryMedia(category: Pick<Category, "slug" | "name">, index = 0): MediaSlot {
  const configured = categoryMediaBySlug[category.slug];
  if (configured) {
    return configured;
  }

  const fallback = fallbackCategoryMedia[index % fallbackCategoryMedia.length];
  return {
    ...fallback,
    title: `${category.name} category image`,
  };
}

export function getCategorySummary(category: Pick<Category, "description" | "name">) {
  return (
    category.description ??
    `${category.name} products presented for technical review, sourcing discussions, and direct inquiry handoff.`
  );
}

export const categoryTeasers = [
  {
    slug: "herbal-extracts",
    title: "Herbal Extracts",
    summary: "Herbal extracts, food ingredients, and nutraceutical ingredients for technical review and formulation use.",
    media: {
      src: "/images/HerbalExtracts.jpg",
      title: "Herbal extracts image",
      note: "Botanical raw material, food ingredient, nutraceutical extract, or finished ingredient photography.",
      tone: "botanical",
    } satisfies MediaSlot,
  },
  {
    slug: "amino-acids",
    title: "Amino Acids",
    summary: "Amino acid ingredients for nutritional, functional, and performance-oriented systems.",
    media: {
      src: "/images/AminoAcids.jpg",
      title: "Amino acids image",
      note: "Batching, blending, or quality release photography.",
      tone: "lab",
    } satisfies MediaSlot,
  },
  {
    slug: "plant-sourced-vitamins-minerals",
    title: "Plant Sourced Vitamins & Minerals",
    summary: "Plant-sourced vitamin and mineral ingredients for clean-label nutrient systems.",
    media: {
      src: "/images/Vitamins&Minerals.jpg",
      title: "Plant sourced vitamins and minerals image",
      note: "Plant-sourced nutrient, QC, packaging, or finished ingredient photography.",
      tone: "lab",
    } satisfies MediaSlot,
  },
];

export const homeContent = {
  tagline: "From Natural Origins to Measured Performance.",
  heroText:
    "We develop ingredients that are consistent, application-ready, and built to perform, combining natural sourcing with controlled processing and evolving formats.",
  heroSubtext: "Consistency in every batch. Clarity in every process.",
  heroMedia: {
    src: "/images/HomeHero.jpg",
    title: "Home hero image",
    note: "Wide facility or ingredient photography.",
    tone: "hero",
  } satisfies MediaSlot,
  positioning: {
    title: "Structured Ingredients for Real World Use",
    text: "Designed with a focus on stability, usability, and repeatable performance across applications.",
  },
  aboutSnapshot: {
    title: "Built Around Understanding, Not Assumption",
    body: [
      "At Herbo Nutra Extract Pvt Ltd, our work begins with understanding how natural materials behave and how they can be processed without losing their intended function.",
      "Our approach is to move beyond extraction alone, and develop ingredients that are stable, consistent, and usable across different formulation systems.",
    ],
  },
  productExperience: {
    title: "Designed for Modern Formulations",
    intro: "Our portfolio reflects what today's formulations actually require:",
    points: [
      "Standardized botanical extracts with defined actives",
      "High-purity functional compounds",
      "Advanced delivery formats for improved performance",
      "Modified forms for better handling and processing",
    ],
    closing:
      "Each product is developed with attention to how it will be used, not just how it is produced.",
  },
  process: {
    title: "Controlled, Measured, Repeatable",
    text:
      "Every stage of production is managed through defined parameters and structured workflows. This allows us to maintain consistency across batches and ensure that materials behave predictably during application. From raw material handling to final output, the focus remains on control, stability, and efficiency.",
  },
  innovation: {
    title: "Adapting Ingredients to Function Better",
    text:
      "We work on formats that improve usability in practical applications.",
    formats: ["Liposomal", "Phytosomal", "Micronized", "Granulated"],
    closing:
      "Ingredients are adapted with practical use, handling, and formulation fit in mind.",
  },
  sustainability: {
    title: "Working with Balance",
    text:
      "Our approach is to maintain a balance between natural sourcing and process efficiency. By focusing on controlled resource use, stable processes, and mindful sourcing, we aim to support long-term usability without unnecessary strain on inputs.",
  },
  global: {
    title: "Consistency That Travels",
    text:
      "We operate with the understanding that ingredients must perform the same way across different environments. Clarity in specifications, stability in quality, and reliability in supply allow materials to be used confidently across diverse requirements.",
  },
  team: {
    title: "Built by People Who Understand the Work",
    text:
      "Our team brings together knowledge of natural materials, processing systems, and quality requirements with a shared focus on getting the fundamentals right, every time.",
  },
  finalStatement: {
    title: "Simple Approach. Consistent Outcome.",
    text:
      "We focus on doing things in a structured way so that every product delivered is reliable, usable, and aligned with real-world requirements.",
  },
  processMedia: {
    src: "/images/HomeManufacturing.jpg",
    title: "Manufacturing image",
    note: "Lab, inspection, or production-floor photography.",
    tone: "lab",
  } satisfies MediaSlot,
  formsMedia: {
    src: "/images/Forms.jpg",
    title: "Advanced ingredient forms image",
    note: "Advanced format and formulation support photography.",
    tone: "lab",
  } satisfies MediaSlot,
};

export const aboutContent = {
  title: "Practical solutions from nature, built around your needs.",
  intro:
    "At Herbo Nutra Extract Pvt Ltd, our focus is simple to provide reliable, well-processed ingredients that work effectively in your formulations.",
  overview:
    "Since 2013, we have been working with botanical extracts and nutraceutical ingredients, gradually expanding into improved formats such as liposomal, phytosomal, micronized, and granulated forms. This allows us to support a wide range of product requirements from standard extracts to more functionally optimized ingredients.",
  applicationUnderstanding: {
    title: "Understanding what matters in your application",
    text:
      "We recognize that every formulation has its own challenges, whether it is solubility, flowability, stability, or consistency. Our role is to help address these through appropriate processing and format selection, so that the ingredient performs as expected in your final product.",
  },
  quality: {
    title: "Consistent quality you can work with",
    text:
      "Our manufacturing approach is built on controlled processes and standardized methods, ensuring that materials remain consistent from batch to batch. This helps our clients maintain product quality, regulatory alignment, and manufacturing efficiency.",
  },
  development: {
    title: "Flexible approach to development",
    text:
      "We work closely with our clients to support practical and workable solutions across product and process requirements.",
    points: [
      "Custom specifications",
      "Format modifications",
      "Process suitability (for tablets, capsules, beverages, etc.)",
    ],
  },
  supply:
    "We understand that beyond product quality, clients also value dependability, communication, and adaptability. Our focus is to build relationships where we can support ongoing requirements with clarity and consistency.",
  technicalSupportTitle: "Documentation support for technical, quality, and regulatory review",
  technicalSupportIntro:
    "To support our clients during technical evaluation, quality review, and regulatory alignment, we provide a structured documentation set with relevant products and discussions.",
  technicalDocuments: [
    "GOA - Guaranteed / General Order Analysis",
    "MOA - Method of Analysis",
    "MSDS - Material Safety Data Sheet",
    "Process Flow Chart",
    "COA - Certificate of Analysis",
    "Specifications - Technical Data Sheet / Product Specifications",
    "Non-GMO Declaration - No Genetic Modified Organism Application",
    "Allergen Declaration",
    "Technical Chromatograms (on request, whenever required)",
  ],
  stats: [
    { value: "Since 2013", label: "Operational journey" },
    { value: "B2B", label: "Commercial focus" },
    { value: "Export-ready", label: "Technical support" },
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
  teamTitle: "The People Behind Herbo Nutra Extract Pvt Ltd",
  teamIntro:
    "Herbo Nutra Extract Pvt Ltd is built on a simple belief, strong systems are created by strong people who understand both science and responsibility. Our team brings together entrepreneurship, technical innovation, market understanding, and quality discipline into one aligned direction. Each individual contributes not just to their function, but to the way we think, build, and deliver natural ingredients for global applications.",
  team: [
    {
      name: "Bhashkar Dwivedi",
      role: "Founder & Director",
      summary:
        "A first-generation entrepreneur and B.Pharm graduate, Bhashkar Dwivedi founded Herbo Nutra Extract Pvt Ltd over 13 years ago with a focused intent to build a structured and reliable herbal extraction company rooted in practical understanding of natural ingredients. His perspective is shaped by both science and observation. He has spent years studying how natural materials behave through processing and how their active potential can be preserved through controlled systems.",
      points: [
        "Building process-driven manufacturing systems from the ground up",
        "Strengthening raw material understanding and consistency",
        "Creating long-term client trust through reliability",
        "Bridging traditional knowledge with modern extraction practices",
      ],
      closing:
        "For him, sustainability and quality are not separate goals, they are built into how the company operates every day.",
    },
    {
      name: "Amit Kumar",
      role: "Sales Head",
      summary:
        "Amit Kumar leads the commercial direction of the company with a strong understanding of market behavior, client expectations, and global demand patterns. His approach goes beyond sales, he focuses on understanding how ingredients are used in real formulations and what clients need for long-term consistency and scale.",
      points: [
        "Building and maintaining strong global client relationships",
        "Translating market requirements into practical supply solutions",
        "Ensuring clarity and coordination between clients and internal teams",
        "Supporting growth through structured and strategic engagement",
      ],
      closing:
        "He plays a key role in ensuring that external expectations and internal capabilities stay closely aligned.",
    },
    {
      name: "Manish Dwivedi",
      role: "Production Head",
      summary:
        "An IIT graduate with extensive experience in processing systems, Manish Dwivedi brings a technical and improvement-focused mindset to manufacturing operations. He is deeply involved in how processes are designed, refined, and scaled. His focus is on making production not just stable, but progressively more efficient and consistent.",
      points: [
        "Developing and optimizing extraction and processing systems",
        "Improving yield and reducing process variability",
        "Introducing structured innovations in manufacturing flow",
        "Strengthening operational discipline and scalability",
      ],
      closing:
        "His role ensures that manufacturing evolves continuously with a strong technical foundation.",
    },
    {
      name: "Vanshika Kaushik",
      role: "Quality Head",
      summary:
        "Vanshika Kaushik leads Quality Assurance and Compliance with expertise as a microbiologist, certified lead auditor, and experienced food safety professional. She plays a critical role in ensuring that every product meets strict global standards of safety, hygiene, and regulatory compliance.",
      points: [
        "Implementation and maintenance of HACCP, ISO, FSSC systems",
        "Microbiological safety and quality control oversight",
        "Audit readiness and regulatory documentation systems",
        "Strengthening traceability and compliance discipline",
      ],
      closing:
        "Her focus ensures that quality is not inspected at the end but built into every stage of the process.",
    },
  ],
  certificationsTitle: "Standards that define our operations",
  certificationsIntro:
    "Our manufacturing and quality systems are aligned with internationally recognized standards that ensure safety, consistency, and regulatory compliance across global markets. These certifications reflect our commitment to maintaining structured processes and reliable product quality.",
  certificationsLead:
    "Certified Standards We Follow",
  certificationsPoints: [
    "ISO 9001 - Quality Management System",
    "ISO 22000 - Food Safety Management System",
    "FSSC 22000 - Food Safety System Certification (GFSI)",
    "HACCP - Hazard Analysis and Critical Control Points",
    "GMP / cGMP - Good Manufacturing Practices",
    "FSSAI - Food Safety and Standards Authority of India compliance",
    "HALAL Certification",
    "KOSHER Certification",
  ],
  certificationsCommitment:
    "These certifications are integrated into our daily operations and are not limited to documentation. They guide process control, hygiene practices, traceability, and product safety standards across all stages of manufacturing.",
  certificationsClosing:
    "Our certified systems support requirements across domestic and international markets, ensuring that our products are suitable for diverse regulatory and customer expectations. Certified systems support consistent quality, safety, and global compliance.",
};

export const extractionContent = {
  title: "Structured processes. Consistent output.",
  summary:
    "At Herbo Nutra Extract Pvt Ltd, manufacturing is built around controlled systems and repeatable processes, ensuring that every batch meets defined quality and performance expectations. Our focus is not only on production, but on how consistently and efficiently it is carried out.",
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
  infrastructureMedia: {
    src: "/images/FacilityImage.jpg",
    title: "Infrastructure image",
    note: "Production unit, warehouse, or manufacturing-floor visuals.",
    tone: "facility",
  } satisfies MediaSlot,
  sections: [
    {
      title: "Designed for process stability",
      text:
        "Our facility operates with defined process parameters at every stage, from raw material handling to final packing. This structured approach helps maintain uniformity, reduce variability, and support scalable production without compromising quality.",
    },
    {
      title: "From raw material to finished ingredient",
      text:
        "Each stage of manufacturing is managed with clear process control, from selection and preparation of raw materials to controlled extraction and processing, filtration and concentration, drying using optimized systems, and final sieving, blending, and finishing. This ensures that the final product is consistent, stable, and ready for application.",
    },
    {
      title: "Integrated processing capabilities",
      text:
        "In addition to conventional extraction, our manufacturing setup supports standardized herbal extracts, micronized powders for improved dispersion, granulated forms for better flow and handling, and liposomal and phytosomal formats for enhanced delivery. This flexibility enables us to offer ingredients that are aligned with modern formulation requirements.",
    },
    {
      title: "Controlled environment, measured output",
      text:
        "Critical parameters such as temperature, pressure, and time are monitored within defined limits to deliver reliable quality across batches.",
    },
    {
      title: "Efficiency built into operations",
      text:
        "Our manufacturing approach is designed to optimize resource use and reduce unnecessary process loss by focusing on yield, stability, and operational consistency.",
    },
    {
      title: "Scalable and reliable production",
      text:
        "With a structured production system in place, we support both regular supply and scale-up requirements while maintaining consistency as volumes increase.",
    },
  ],
  closing: "Manufacturing built on control, consistency, and practical efficiency.",
  infrastructure: {
    title: "Infrastructure and unit",
    text:
      "Our production environment is organized around controlled process zones, quality oversight, and scalable handling systems that support uniformity, traceability, and efficient batch execution.",
  },
  packaging: {
    title: "Packaging and dispatch",
    text:
      "Final packing is handled with attention to stability, traceability, and dispatch readiness so materials remain protected through storage, shipment, and customer use.",
  },
};

export const manufacturingFlowcharts = [
  {
    title: "Herbal Extracts",
    subtitle: "Standardized / Ratio Extracts",
    image: "/images/HerbalExtracts.jpg",
    steps: [
      "Raw Material Procurement",
      "Cleaning & Sorting",
      "Size Reduction (Pulverization)",
      "Extraction (Hydro / Hydro-alcoholic)",
      "Filtration",
      "Concentration (Vacuum Evaporation)",
      "Purification (if required)",
      "Drying (Spray Dryer / Vacuum Dryer)",
      "Sieving",
      "Blending / Standardization",
      "Packing",
    ],
  },
  {
    title: "Plant Sourced Vitamins & Minerals",
    subtitle: "Plant-Sourced Nutrient Systems",
    image: "/images/Vitamins&Minerals.jpg",
    steps: [
      "Plant Source Selection",
      "Cleaning & Pre-processing",
      "Extraction / Isolation",
      "Filtration",
      "Concentration / Precipitation",
      "Purification",
      "Drying (Spray / Tray Dryer)",
      "Milling / Sieving",
      "Standardization (Assay Adjustment)",
      "Blending (if required)",
      "Packing",
    ],
  },
  {
    title: "Amino Acids",
    subtitle: "Fermentation / Hydrolysis Based",
    image: "/images/AminoAcids.jpg",
    steps: [
      "Raw Material / Substrate Preparation",
      "Fermentation / Protein Hydrolysis",
      "Filtration",
      "Deproteinization",
      "Decolorization",
      "Concentration",
      "Crystallization",
      "Centrifugation",
      "Drying",
      "Milling / Sieving",
      "Packing",
    ],
  },
  {
    title: "Liposomal Products",
    subtitle: "Encapsulated Delivery Systems",
    image: "/images/QualityControl.jpg",
    steps: [
      "Active Ingredient Preparation",
      "Lipid Phase Preparation (Phospholipids)",
      "Aqueous Phase Preparation",
      "Homogenization / Emulsification",
      "Liposome Formation (High Shear / Ultrasonication)",
      "Size Reduction (Nano-sizing)",
      "Stabilization",
      "Drying (Spray Dry / Lyophilization) (optional)",
      "Blending",
      "Packing",
    ],
  },
  {
    title: "Micronized Powders",
    subtitle: "Precision Particle Size Control",
    image: "/images/BotanicalPowders.jpg",
    steps: [
      "Raw Material Selection",
      "Pre-drying",
      "Coarse Grinding",
      "Micronization (Jet Mill / Air Classifier Mill)",
      "Particle Size Classification",
      "Sieving",
      "Blending",
      "Packing",
    ],
  },
  {
    title: "Phytosome / Phytosomal Complex",
    subtitle: "Phospholipid-Integrated Botanical Delivery",
    image: "/images/BotanicalExtracts.jpg",
    steps: [
      "Herbal Extract Preparation",
      "Phospholipid Selection",
      "Solvent Mixing (Ethanol / Suitable Solvent)",
      "Complex Formation (Controlled Temperature & Stirring)",
      "Solvent Evaporation",
      "Precipitation of Phytosome Complex",
      "Drying (Vacuum / Spray Drying)",
      "Milling / Sieving",
      "Blending",
      "Packing",
    ],
  },
  {
    title: "Granulated Extracts",
    subtitle: "Improved Flow And Handling",
    image: "/images/Packaging.jpg",
    steps: [
      "Extract Powder Preparation",
      "Binder Solution Preparation",
      "Wet Mixing / Granulation",
      "Granule Formation (RMG / Extruder)",
      "Drying (Fluid Bed Dryer / Tray Dryer)",
      "Sizing / Sieving",
      "Blending",
      "Packing",
    ],
  },
];

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

export const sustainabilityContent = {
  title: "A considered approach to global responsibility.",
  summary:
    "At Herbo Nutra Extract Pvt Ltd, sustainability is part of a larger global system where sourcing, processing, and supply must remain balanced over time.",
  heroMedia: {
    src: "/images/HomeManufacturing.jpg",
    title: "Sustainability image",
    note: "Manufacturing and sourcing image.",
    tone: "lab",
  } satisfies MediaSlot,
  sections: [
    {
      title: "Looking beyond output",
      text:
        "We approach sustainability with the understanding that every stage, raw material, process, and final product, has an extended impact. The emphasis is on continuity, not just production.",
    },
    {
      title: "Where nature meets process",
      text:
        "Working with natural materials requires a careful balance. Our role is to ensure that processing enhances usability without unnecessary strain on resources, maintaining both efficiency and respect for origin.",
    },
    {
      title: "Stability as a principle",
      text:
        "Consistency is not only a quality requirement, it is also a sustainability tool. Stable systems reduce excess consumption, repeated processing, and avoidable loss.",
    },
    {
      title: "Part of a larger supply chain",
      text:
        "Our responsibility extends beyond manufacturing. By supporting traceable sourcing and predictable supply, we contribute to a system that is easier to manage, plan, and sustain across markets.",
    },
    {
      title: "Aligned with a changing global landscape",
      text:
        "As expectations evolve, our approach remains aligned with growing demands for clarity, accountability, and reliability through structured processes and consistent outputs.",
    },
  ],
  practices: [
    "Controlled use of resources through defined process parameters",
    "Solvent recovery and efficient extraction practices",
    "Yield-focused processing to reduce material loss",
    "Stable production systems to avoid rework and excess consumption",
    "Structured waste handling aligned with applicable norms",
    "Sourcing aligned with traceability and long-term continuity",
  ],
  closing:
    "A considered approach balancing responsibility, consistency, and long-term viability.",
};

export const formatsContent = {
  title: "Advanced formats for formulation-led ingredient development.",
  summary:
    "This section brings together the specialized ingredient formats currently available across liposomal, micronized, phytosome, and granulated technologies.",
  heroMedia: {
    src: "/images/QualityControl.jpg",
    title: "Advanced formats and formulation image",
    note: "Laboratory and formulation support image.",
    tone: "lab",
  } satisfies MediaSlot,
  herbalExtractPowder: {
    title: "Herbal Extract Powder",
    text:
      "Concentrated botanical extract powders prepared for consistent dosing, stable handling, and dependable formulation performance.",
    points: [
      "Standardized potency for repeatable formulation results",
      "Particle consistency for smooth blending and processing",
      "Suitable for capsules, tablets, and functional blends",
    ],
    media: {
      src: "/images/BotanicalPowders.jpg",
      title: "Herbal extract powder image",
      note: "Powdered botanical extract or production photography.",
      tone: "catalog",
    } satisfies MediaSlot,
  },
  capabilities: [
    {
      title: "Liposomal",
      text: "Development support for liposomal ingredient formats intended to improve dispersion, delivery, and formulation value.",
    },
    {
      title: "Micronized",
      text: "Micronized ingredient concepts for better particle size control, blending behavior, and formulation performance.",
    },
    {
      title: "Phytosome",
      text: "Phytosome-oriented development for botanical actives that require more advanced delivery positioning.",
    },
    {
      title: "Granulated",
      text: "Granulated ingredient options for improved handling, flow properties, and downstream manufacturing suitability.",
    },
  ],
  points: [
    "Suitable for customer-specific development discussions",
    "Built for formulation, processing, and commercial evaluation",
    "Can support pilot concepts before broader supply planning",
  ],
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
    overview: "Herbal extracts, food ingredients, and nutraceutical ingredients presented for technical review, sourcing discussions, and formulation-specific evaluation.",
    applications: ["Nutraceutical systems", "Functional foods", "Application-specific sourcing"],
    trustNote: "This category keeps herbal, food, and nutraceutical ingredients easy to review alongside technical specifications and form availability.",
    media: {
      src: "/images/HerbalExtracts.jpg",
      title: "Herbal extracts image",
      note: "Botanical extract, food ingredient, or raw material photography.",
      tone: "botanical",
    },
  },
  "plant-sourced-vitamins-minerals": {
    overview: "Plant-sourced vitamins and minerals presented with clean technical visibility and sourcing support.",
    applications: ["Fortified blends", "Daily wellness products", "Label-friendly nutrient systems"],
    trustNote: "This category keeps plant-sourced vitamin and mineral review straightforward and specification-led.",
    media: {
      src: "/images/Vitamins&Minerals.jpg",
      title: "Plant sourced vitamins minerals image",
      note: "Plant-sourced nutrient, QC, packaging, or finished ingredient visuals.",
      tone: "lab",
    },
  },
  "amino-acids": {
    overview: "Amino acid ingredients for nutritional, functional, and performance-oriented applications.",
    applications: ["Sports nutrition", "Daily wellness formulas", "Functional beverage systems"],
    trustNote: "This page keeps amino acid data simple and readable for faster review.",
    media: {
      src: "/images/AminoAcids.jpg",
      title: "Amino acids image",
      note: "Clean batching or finished ingredient visuals.",
      tone: "catalog",
    },
  },
};

export const contactCopy = {
  prompt: "Contact us for product inquiries, documentation support, and partnership discussions.",
  details: [
    "Phone for quick follow-up",
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
  formats:
    "Review Herbo Nutra Extract's advanced ingredient formats across liposomal, micronized, phytosome, and granulated technologies.",
  sustainability:
    "Review Herbo Nutra Extract Pvt. Ltd.'s sustainability approach across sourcing, process stability, resource efficiency, and traceable supply systems.",
  process:
    "Review Herbo Nutra Extract's manufacturing systems, infrastructure, packaging flow, and process pathways across all major ingredient forms.",
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
