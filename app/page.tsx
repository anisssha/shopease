'use client';

import { useEffect, useState } from 'react';
import { Product, FilterState } from '@/types';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    searchQuery: '',
    sortBy: 'default'
  });

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        addToast('Failed to load products', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters whenever filters or products change
  useEffect(() => {
    let result = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Filter by price range
    if (filters.minPrice > 0) {
      result = result.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice > 0) {
      result = result.filter(product => product.price <= filters.maxPrice);
    }

    // Filter by search query
    if (filters.searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Shop from our curated collection of high-quality products at unbeatable prices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            filters={filters}
            onFiltersChange={setFilters}
            isLoading={isLoading}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600">
                {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} products`}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductGridSkeleton />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => setFilters({
                    categories: [],
                    minPrice: 0,
                    maxPrice: 0,
                    searchQuery: '',
                    sortBy: 'default'
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}