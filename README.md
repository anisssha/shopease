# ShopEase - Modern E-commerce Storefront

A modern, responsive e-commerce storefront built with Next.js, TypeScript, and Tailwind CSS. Features a complete shopping experience with product catalog, filtering, search, and cart functionality.

## 🚀 Live Demo

[View Live Demo](http://localhost:3000) _(Will be updated after deployment)_

## ✨ Features

### Product Catalog

- **Product Grid**: Responsive grid layout showcasing products with images, titles, prices, and ratings
- **Advanced Filtering**: Filter by category (multi-select) and price range (min/max inputs)
- **Smart Search**: Debounced search functionality by product title
- **Sorting Options**: Sort products by price (low to high, high to low)
- **Loading States**: Beautiful skeleton loaders while data loads
- **Empty States**: Helpful messages when no products match filters

### Product Details

- **Detailed View**: Large product images, descriptions, ratings, and category information
- **Add to Cart**: Quantity selector with immediate cart integration
- **Related Products**: Shows up to 4 products from the same category
- **Responsive Design**: Optimized for all screen sizes

### Shopping Cart

- **Cart Management**: Add, remove, and update item quantities
- **Persistent Storage**: Cart data persists using localStorage
- **Price Calculation**: Real-time total calculation with tax estimation
- **Visual Feedback**: Toast notifications for all cart actions
- **Order Summary**: Clear breakdown of costs including tax and shipping

### User Experience

- **Responsive Design**: Mobile-first approach that scales beautifully
- **Accessibility**: Semantic HTML, proper labeling, keyboard navigation
- **Performance**: Optimized images, lazy loading, and efficient state management
- **Error Handling**: Comprehensive error states and user feedback

## 🛠 Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Source**: FakeStore API
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 🏗 Architecture

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── cart/              # Cart page
│   ├── product/[id]/      # Product detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── Header.tsx         # Site header with navigation
│   ├── ProductCard.tsx    # Product grid item
│   ├── ProductFilters.tsx # Filter and search controls
│   ├── ProductSkeleton.tsx # Loading states
│   └── Toast.tsx          # Notification system
├── contexts/              # React contexts
│   └── CartContext.tsx    # Cart state management
├── hooks/                 # Custom React hooks
│   └── useToast.ts        # Toast notification hook
├── lib/                   # Utilities and API
│   ├── api.ts             # FakeStore API integration
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript definitions
    └── index.ts           # Type definitions
```

### State Management

- **Cart State**: Managed via React Context with localStorage persistence
- **Product Data**: Fetched from FakeStore API with local caching
- **Filter State**: Local component state with URL synchronization potential
- **Toast Notifications**: Custom hook for user feedback

### Data Flow

1. **Initial Load**: Fetch products and categories from FakeStore API
2. **Filtering**: Client-side filtering and sorting of products
3. **Product Details**: Fetch individual product data by ID
4. **Cart Operations**: Context-based state management with localStorage sync
5. **User Feedback**: Toast notifications for all user actions

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/anisssha/shopease.git
   cd shopease
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Implementation Decisions

### State Management Choice

- **React Context over Redux**: Chose Context API for its simplicity and adequate performance for this scale
- **localStorage Integration**: Automatic cart persistence without external dependencies

### API Integration

- **FakeStore API**: Reliable, well-documented mock API perfect for demonstration
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Loading States**: Skeleton loaders provide smooth user experience

### Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Component Splitting**: Modular architecture for better code splitting
- **Debounced Search**: Prevents excessive API calls during typing

### Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Form Labels**: All inputs properly labeled for screen readers
- **Keyboard Navigation**: Full keyboard accessibility throughout
- **Color Contrast**: WCAG compliant color combinations

## 🔧 Trade-offs and Known Issues

### Trade-offs Made

1. **Client-side Filtering**: Chose client-side over server-side for simplicity, though this limits scalability
2. **Mock API Limitations**: FakeStore API doesn't support real filtering, so implemented client-side
3. **No Authentication**: Focused on core e-commerce features rather than user management
4. **Simplified Checkout**: Mock checkout process to focus on cart functionality

### Known Issues

1. **SEO Optimization**: Could benefit from server-side rendering for product pages
2. **Pagination**: Not implemented due to API limitations
3. **Real-time Inventory**: No stock management due to mock API constraints
4. **Payment Integration**: Would require Stripe or similar payment processor

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Real payment integration
- [ ] Order history and tracking
- [ ] Advanced search with filters
- [ ] Product comparison
- [ ] Dark mode theme toggle

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing mock e-commerce data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling approach
- [Lucide React](https://lucide.dev/) for the beautiful icon set
- [Next.js](https://nextjs.org/) for the robust React framework

---

Built with ❤️ for modern e-commerce experiences.
