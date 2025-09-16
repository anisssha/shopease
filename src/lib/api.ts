import type { Product } from "@/types";

const BASE = "https://fakestoreapi.com";

/**
 * Fetch all products
 * app/page.tsx expects `fetchProducts`
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/**
 * Convenience alias in case other files expect fetchAllProducts
 */
export const fetchAllProducts = fetchProducts;

/**
 * Fetch single product by id
 */
export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/products/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(
    `${BASE}/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

/**
 * Fetch categories list (app/page.tsx expects `fetchCategories`)
 */
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
