# ✨ AZI Cosmetics Store

> A modern, feature-rich cosmetics e-commerce web application built with React and React Router.

AZI Cosmetics Store is a full-featured online beauty storefront with product browsing, search, cart management, wishlist, user authentication, dark mode, and product reviews — all backed by the DummyJSON API.

---

## 🚀 Features

### 🛍️ Product Catalog
- **Browse Products** — Grid-based catalog of beauty and cosmetic products
- **Category Filtering** — Filter products by beauty-related categories (Skincare, Fragrances, etc.)
- **Search** — Debounced real-time search across all products
- **Load More** — Pagination support to load additional products
- **Product Detail Page** — Full product info with image gallery, pricing, discounts, and reviews

### 🛒 Shopping Cart
- **Add to Cart** — One-click add from catalog or product detail page
- **Quantity Management** — Increment/decrement item quantities inline
- **Remove Items** — Individual item removal with confirmation toast
- **Clear Cart** — Remove all items at once
- **Cart Summary** — Subtotal, shipping, and total calculation
- **Protected Route** — Cart page requires authentication
- **Persistent Storage** — Cart data saved to `localStorage`

### ❤️ Wishlist
- **Toggle Items** — Add/remove products from wishlist with heart button
- **Wishlist Page** — Dedicated page to view all saved items
- **Quick Add to Cart** — Move items directly from wishlist to cart
- **Clear Wishlist** — Remove all items at once
- **Persistent Storage** — Wishlist data saved to `localStorage`

### 🔐 User Authentication
- **Login / Register** — Email and password-based authentication
- **Session Persistence** — Auth state saved to `localStorage`
- **Protected Routes** — Cart and other sensitive pages gated behind login
- **User Menu** — Display user name and logout button in header

### 🌙 Dark Mode
- **Theme Toggle** — Switch between light and dark themes
- **Persistent Preference** — Theme choice saved to `localStorage`
- **Full Theming** — All components adapt to the active theme

### ⭐ Product Reviews
- **Add Reviews** — Write reviews with a text input
- **Edit / Delete** — Modify or remove your own reviews
- **Seeded Demo Reviews** — Realistic cosmetic-themed sample reviews on first visit
- **Persistent Storage** — Reviews saved to `localStorage`

### 📄 Additional Pages
- **Home** — Hero section, feature highlights, CTA for authenticated users
- **About** — Brand story, offerings, and values
- **Contact** — Contact form with validation (name, email, message)
- **Categories** — Browse beauty categories
- **404 Not Found** — Custom error page

### 🎨 UI/UX Highlights
- Responsive design (mobile, tablet, desktop)
- Smooth hover animations and transitions
- Toast notifications via `react-hot-toast`
- Consistent theming with CSS custom properties
- Modern gradient accents and rounded cards

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **React Router 7** | Client-side routing with file-based config |
| **Vite 8** | Build tool and development server |
| **Axios** | HTTP client for API requests |
| **DummyJSON API** | Product data source |
| **react-hot-toast** | Toast notification system |
| **CSS Custom Properties** | Theming and styling |
| **localStorage** | Client-side data persistence |

---

## 📸 Screenshots

> _(Add your own screenshots by placing images in a `docs/` directory)_

| | |
|---|---|
| **Home Page** — Hero section with CTA | **Product Catalog** — Grid with search & filters |
| *(Add screenshot `docs/screenshot-home.png`)* | *(Add screenshot `docs/screenshot-catalog.png`)* |
| **Product Detail** — Image gallery, pricing, reviews | **Shopping Cart** — Item list with quantity controls |
| *(Add screenshot `docs/screenshot-product.png`)* | *(Add screenshot `docs/screenshot-cart.png`)* |
| **Wishlist** — Saved products | **Login Page** — Authentication form |
| *(Add screenshot `docs/screenshot-wishlist.png`)* | *(Add screenshot `docs/screenshot-login.png`)* |

---

## 📦 Installation

### Prerequisites

- **Node.js** v18+ (recommended)
- **npm** or **yarn** or **pnpm**

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/azi-cosmetics-store.git
cd azi-cosmetics-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Project Structure

```
azi-cosmetics-store/
├── app/                          # Application source
│   ├── components/               # Reusable UI components
│   │   ├── CartItem.jsx
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SearchBar.jsx
│   ├── context/                  # React Context providers
│   │   ├── AuthContext.jsx        # Auth state & methods
│   │   ├── CartContext.jsx        # Cart state & reducer
│   │   ├── ThemeContext.jsx       # Light/dark mode
│   │   └── WishlistContext.jsx    # Wishlist state & reducer
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useProducts.js
│   ├── services/                 # API service layer
│   │   ├── api.js                # Axios client & products API
│   │   └── reviewService.js      # Reviews CRUD
│   ├── utils/                    # Utility functions
│   │   └── formatters.js         # Price, date, text formatting
│   ├── root.jsx                  # Root layout with providers
│   ├── routes.js                 # Route definitions
│   └── style.css                 # Global styles
├── src/                          # Page components
│   ├── index.js                  # React entry point
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Catalog.jsx
│   │   ├── Categories.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── CartPage.jsx
│   │   ├── CartProtected.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── ReviewPage.jsx
│   │   ├── NotFound.jsx
│   │   └── root.jsx
│   └── style.css
├── public/                       # Static assets
├── package.json
├── vite.config.js
└── tsconfig.json
```

---

## 🔌 API Reference

This project uses the [DummyJSON API](https://dummyjson.com/) as its data source:

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Fetch all products (with `limit` and `skip` params) |
| `GET /products/:id` | Fetch a single product by ID |
| `GET /products/categories` | Fetch all categories |
| `GET /products/category/:slug` | Fetch products by category |
| `GET /products/search?q=query` | Search products |

> Products are filtered to show only beauty-related categories (`beauty`, `fragrances`, `skin care`).

---

## 🧪 Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm start
```

---

## 📄 License

This project is for educational/demonstration purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">Made with 💄 by AZI Cosmetics Team</p>
