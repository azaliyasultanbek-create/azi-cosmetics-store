import { Link } from "react-router";
import { useMemo } from "react";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, onAddToCart }) {
  const { isInWishlist, toggleItem } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const discountPrice = useMemo(() => {
    if (product.discountPercentage) {
      return (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    }
    return null;
  }, [product.price, product.discountPercentage]);

  return (
    <div className="product-card">
      <button
        className={`wishlist-heart ${wishlisted ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          toggleItem(product);
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wishlisted ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <img
            src={product.thumbnail || product.images?.[0] || "https://via.placeholder.com/200"}
            alt={product.title}
            loading="lazy"
          />
        </div>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-brand">{product.brand || product.category}</p>
        <div className="product-card-pricing">
          {discountPrice ? (
            <>
              <span className="product-card-price">${discountPrice}</span>
              <span className="product-card-old-price">${product.price}</span>
              <span className="product-card-discount">-{Math.round(product.discountPercentage)}%</span>
            </>
          ) : (
            <span className="product-card-price">${product.price}</span>
          )}
        </div>
        <div className="product-card-rating">
          <span>{'★'.repeat(Math.round(product.rating || 0))}</span>
          <span>{'☆'.repeat(5 - Math.round(product.rating || 0))}</span>
          <span className="rating-value">({product.rating})</span>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
