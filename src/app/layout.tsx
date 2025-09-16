import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEase - Modern E-commerce Store",
  description:
    "Discover amazing products at great prices. Your one-stop shop for everything you need.",
  keywords: "ecommerce, shopping, products, online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="bg-white border-t py-8 mt-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>
                  &copy; 2024 ShopEase. Made with ❤️ for amazing shopping
                  experiences.
                </p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
