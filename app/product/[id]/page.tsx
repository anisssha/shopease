//

// app/product/[id]/ClientProduct.tsx
// app/product/[id]/page.tsx  (SERVER)
import React from "react";
import ClientProduct from "./ClientProduct";
import type { Product } from "@/types";
import {
  fetchAllProducts,
  fetchProduct,
  fetchProductsByCategory,
} from "@/lib/api";

export async function generateStaticParams() {
  // returns [{ id: '1' }, { id: '2' }, ...] — required for output: 'export'
  const products: Product[] = await fetchAllProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  try {
    const product: Product = await fetchProduct(params.id);
    const related: Product[] = (await fetchProductsByCategory(product.category))
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return <ClientProduct product={product} relatedProducts={related} />;
  } catch (err) {
    // Server-side fallback UI
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <p className="text-gray-600">Could not load product details.</p>
        </div>
      </div>
    );
  }
}
