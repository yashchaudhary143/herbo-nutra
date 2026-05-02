export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_count: number;
};

export type Method = {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  category_id: number;
  common_name: string;
  botanical_name: string;
  specification: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  methods: Method[];
};

export type Inquiry = {
  id: number;
  source: string;
  name: string;
  company_name: string;
  email: string;
  phone: string;
  product_requirement: string;
  message: string;
  status: string;
  email_status: string;
  created_at: string;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
};

export type CategoryProductsResponse = PaginatedProducts & {
  category: Category;
};

export type PaginatedInquiries = {
  items: Inquiry[];
  total: number;
  page: number;
  limit: number;
};

export type DashboardStats = {
  categories: number;
  products: number;
  inquiries: number;
  new_inquiries: number;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const serverApiBase = (process.env.API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

async function serverApiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${serverApiBase}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Server API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCategories() {
  try {
    return await serverApiFetch<Category[]>("/api/categories");
  } catch {
    return [] as Category[];
  }
}

export async function fetchProducts(params?: { search?: string; category?: string; method?: string }) {
  const query = new URLSearchParams();
  query.set("limit", "100");
  if (params?.search) {
    query.set("search", params.search);
  }
  if (params?.category) {
    query.set("category", params.category);
  }
  if ("method" in (params ?? {}) && params?.method) {
    query.set("method", params.method);
  }

  try {
    return await serverApiFetch<PaginatedProducts>(`/api/products?${query.toString()}`);
  } catch {
    return { items: [], total: 0, page: 1, limit: 100 } satisfies PaginatedProducts;
  }
}

export async function fetchCategoryProducts(slug: string, params?: { method?: string; search?: string }) {
  const query = new URLSearchParams();
  query.set("limit", "100");
  if (params?.method) {
    query.set("method", params.method);
  }
  if (params?.search) {
    query.set("search", params.search);
  }

  try {
    return await serverApiFetch<CategoryProductsResponse>(
      `/api/categories/${slug}/products?${query.toString()}`,
    );
  } catch {
    return null;
  }
}

export async function fetchMethods() {
  try {
    return await serverApiFetch<Method[]>("/api/methods");
  } catch {
    return [] as Method[];
  }
}

export async function clientApiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    cache: "no-store",
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const contentType = response.headers.get("content-type");
  const payload =
    contentType && contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const detail =
      typeof payload?.detail === "string"
        ? payload.detail
        : typeof payload?.message === "string"
          ? payload.message
          : "Request failed";
    throw new ApiError(detail, response.status);
  }

  return payload as T;
}
