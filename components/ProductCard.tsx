'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="aspect-square bg-gray-50 relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating.rate}</span>
            </div>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-blue-600">
              {formatPrice(product.price)}
            </p>
            <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}