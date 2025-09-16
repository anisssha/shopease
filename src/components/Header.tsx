"use client";
import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Store className="w-6 h-6 text-blue-600" />
            <span>ShopEase</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cart
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
