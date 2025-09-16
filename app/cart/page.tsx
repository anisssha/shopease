// app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } =
    useCart();
  const { toasts, addToast, removeToast } = useToast();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number, title: string) => {
    removeItem(id);
    addToast({
      title: `Removed ${title} from cart`,
      description: "Item removed successfully",
      duration: 3000,
      variant: "info",
    });
  };

  const handleClearCart = () => {
    clearCart();
    addToast({
      title: "Cart cleared",
      description: "Your cart has been emptied",
      duration: 3000,
      variant: "info",
    });
  };

  // If cart is empty — show empty state
  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ToastContainer toasts={toasts} onRemove={removeToast} />

        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything to your cart yet. Start
            shopping to fill it up!
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Main cart UI
  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Clear cart"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg border shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-lg font-semibold text-blue-600 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Decrease quantity for ${item.title}`}
                        type="button"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 border-x border-gray-300 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label={`Increase quantity for ${item.title}`}
                        type="button"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.title)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                      aria-label={`Remove ${item.title} from cart`}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    {formatPrice(getTotalPrice() * 0.08)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {formatPrice(getTotalPrice() * 1.08)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4"
                type="button"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block w-full text-center py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
