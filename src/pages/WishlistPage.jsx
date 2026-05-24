import { Link } from "react-router";
import { useWishlist } from "../../app/context/WishlistContext";
import { useCart } from "../../app/context/CartContext";

export default function WishlistPage() {
  const { items, totalItems, removeItem, clearWishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <h1>My Wishlist</h1>
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/catalog" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist ({totalItems} {totalItems === 1 ? "item" : "items"})</h1>
        <button className="clear-wishlist-btn" onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {items.map((product) => (
          <div key={product.id} className="wishlist-card">
            <Link to={`/product/${product.id}`} className="wishlist-card-link">
              <div className="wishlist-card-image">
                <img
                  src={product.thumbnail || product.images?.[0] || "https://via.placeholder.com/200"}
                  alt={product.title}
                  loading="lazy"
                />
              </div>
              <h3 className="wishlist-card-title">{product.title}</h3>
              <p className="wishlist-card-brand">{product.brand || product.category}</p>
              <div className="wishlist-card-pricing">
                {product.discountPercentage ? (
                  <>
                    <span className="current-price">
                      ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="old-price">${product.price}</span>
                  </>
                ) : (
                  <span className="current-price">${product.price}</span>
                )}
              </div>
            </Link>
            <div className="wishlist-card-actions">
              <button
                className="add-to-cart-btn"
                onClick={() => addItem(product)}
              >
                Add to Cart
              </button>
              <button
                className="remove-wishlist-btn"
                onClick={() => removeItem(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
