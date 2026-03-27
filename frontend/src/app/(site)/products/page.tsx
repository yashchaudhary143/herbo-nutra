import { fetchCategories, fetchProducts } from "@/lib/api";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, productPageCopy, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description: seoDescriptions.products,
  path: "/products",
});

export default async function ProductsPage() {
  const [categories, initialData] = await Promise.all([fetchCategories(), fetchProducts()]);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Products"
        title="Browse the product range, then move straight into the table."
        description={productPageCopy.intro}
        media={productPageCopy.heroMedia}
      />

      <section className="section-shell">
        <ProductCatalog categories={categories} initialData={initialData} />
      </section>
    </div>
  );
}
