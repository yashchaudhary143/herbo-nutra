import { fetchCategories, fetchForms, fetchProducts } from "@/lib/api";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, productPageCopy, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description: seoDescriptions.products,
  path: "/products",
});

type ProductsPageProps = {
  searchParams?: Promise<{
    form?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedForm = resolvedSearchParams?.form;
  const [categories, forms, initialData] = await Promise.all([
    fetchCategories(),
    fetchForms(),
    fetchProducts({ form: selectedForm }),
  ]);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Products"
        title="Browse the product range, then move straight into the table."
        description={productPageCopy.intro}
        media={productPageCopy.heroMedia}
      />

      <section className="section-shell">
        <ProductCatalog
          categories={categories}
          forms={forms}
          initialData={initialData}
          initialFormSlug={selectedForm}
        />
      </section>
    </div>
  );
}
