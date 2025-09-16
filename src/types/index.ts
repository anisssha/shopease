export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: "price-asc" | "price-desc" | "default";
}
