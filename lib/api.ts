// import { Product } from '@/types';

// const BASE_URL = 'https://fakestoreapi.com';

// export async function fetchProducts(): Promise<Product[]> {
//   try {
//     const response = await fetch(`${BASE_URL}/products`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// }

// export async function fetchProduct(id: string): Promise<Product> {
//   try {
//     const response = await fetch(`${BASE_URL}/products/${id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch product');
//     }
//     const product = await response.json();
//     return product;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     throw error;
//   }
// }

// export async function fetchCategories(): Promise<string[]> {
//   try {
//     const response = await fetch(`${BASE_URL}/products/categories`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch categories');
//     }
//     const categories = await response.json();
//     return categories;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw error;
//   }
// }

// export async function fetchProductsByCategory(category: string): Promise<Product[]> {
//   try {
//     const response = await fetch(`${BASE_URL}/products/category/${category}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch products by category');
//     }
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     throw error;
//   }
// }

// src/lib/api.ts
// src/lib/api.ts
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
