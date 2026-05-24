import { Outlet, Link } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../../app/services/api";
import ProductCard from "../../app/components/ProductCard";
import SearchBar from "../../app/components/SearchBar";
import Loader from "../../app/components/Loader";
import { useCart } from "../../app/context/CartContext";
import { useProducts, BEAUTY_CATEGORIES } from "../../app/hooks/useProducts";

function isBeautyCategory(cat) {
  const name = (cat.name || cat.slug || cat || "").toLowerCase().trim();
  return BEAUTY_CATEGORIES.some((bc) => name.includes(bc));
}

export default function Catalog() {
  const { products, loading, error, hasMore, search, loadMore, refetch } = useProducts();
  const { addItem } = useCart();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load categories on mount
  useEffect(() => {
    productsApi
      .getCategories()
      .then((data) => {
        const beautyCats = data.filter((cat) => isBeautyCategory(cat));
        setCategories(beautyCats);
      })
      .catch(console.error);
  }, []);

  const handleSearch = useCallback((query) => {
    search(query);
  }, [search]);

  const handleCategoryFilter = useCallback(async (cat) => {
    setSelectedCategory(cat);
    if (cat) {
      try {
        await productsApi.getByCategory(cat);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  }, [refetch]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Product Catalog</h1>
        <Link to="categories" className="categories-link">
          Browse Categories
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat.slug || cat}
            className={`category-chip ${selectedCategory === (cat.slug || cat) ? "active" : ""}`}
            onClick={() => handleCategoryFilter(cat.slug || cat)}
          >
            {cat.name || cat}
          </button>
        ))}
      </div>

      {loading && products.length === 0 ? (
        <Loader text="Loading products..." />
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>

          {products.length === 0 && !loading && (
            <div className="no-results">
              <p>No products found.</p>
            </div>
          )}

          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      <hr />
      <Outlet />
    </div>
  );
}