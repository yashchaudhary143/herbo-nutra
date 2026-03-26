import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { company, organizationSchema, siteUrl } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: company.name,
    template: `%s | ${company.name}`,
  },
  description:
    "Herbo Nutra Extract Pvt. Ltd. supplies herbal extracts, amino acids, vitamins, and nutraceutical ingredients with export-focused quality systems.",
  applicationName: company.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "herbal extracts",
    "nutraceutical ingredients",
    "ayurvedic extracts",
    "private label nutraceuticals",
    "export quality botanical extracts",
  ],
  openGraph: {
    title: company.name,
    description:
      "Professional nutraceutical and herbal extract manufacturing with structured product catalog and B2B inquiry handling.",
    siteName: company.name,
    url: siteUrl,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
