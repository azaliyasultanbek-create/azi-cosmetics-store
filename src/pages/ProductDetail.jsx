import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { productsApi } from "../../app/services/api";
import { useCart } from "../../app/context/CartContext";
import { useWishlist } from "../../app/context/WishlistContext";
import Loader from "../../app/components/Loader";

const STORAGE_KEY = "product_reviews";
const SEEDED_KEY = "product_reviews_seeded";

const DEMO_REVIEWS = [
  { id: 1, body: "This foundation gives such a natural finish! It blends effortlessly and doesn't oxidize. My new holy grail.", user: "GlowGetter", date: "2024-12-10T10:00:00Z" },
  { id: 2, body: "The lipstick shade is gorgeous and it stays on for hours without drying my lips. Love the creamy texture!", user: "BeautyBee", date: "2024-12-08T14:30:00Z" },
  { id: 3, body: "Perfect everyday moisturizer. Lightweight, absorbs quickly, and my skin feels so hydrated. No sticky residue.", user: "SkincareJunkie", date: "2024-12-05T09:15:00Z" },
  { id: 4, body: "The eyeshadow palette pigmentation is incredible! Buttery smooth and blends like a dream. Worth every penny.", user: "MakeupArtist23", date: "2024-11-28T16:45:00Z" },
  { id: 5, body: "Obsessed with this serum! My dark spots have faded noticeably after just two weeks. Highly recommend for glowing skin.", user: "RadiantSkin", date: "2024-11-20T11:20:00Z" },
];

function getStoredReviews() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);


  useEffect(() => {
    const alreadySeeded = localStorage.getItem(SEEDED_KEY);

    if (alreadySeeded) {
      const stored = getStoredReviews();
      setReviews(stored);
      setLoadingReviews(false);
    } else {
      // First visit — seed realistic cosmetic demo reviews
      saveStoredReviews(DEMO_REVIEWS);
      setReviews(DEMO_REVIEWS);
      localStorage.setItem(SEEDED_KEY, "true");
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    if (!loadingReviews) {
      saveStoredReviews(reviews);
    }
  }, [reviews, loadingReviews]);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await productsApi.getById(id);
        if (!cancelled) {
          setProduct(data);
          setSelectedImage(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load product");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddReview = () => {
    if (!text.trim()) return;

    if (editingId !== null) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, body: text } : r
        )
      );
      setEditingId(null);
    } else {
      const newReview = {
        id: Date.now(),
        body: text,
        date: new Date().toISOString(),
      };
      setReviews((prev) => [newReview, ...prev]);
    }
    setText("");
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEditReview = (review) => {
    setText(review.body);
    setEditingId(review.id);
  };

  if (loading) return <Loader text="Loading product..." />;

  if (error) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/catalog")}>
          Back to Catalog
        </button>
      </div>
    );
  }

  if (!product) return null;

  const discountPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const allImages = product.images?.length
    ? product.images
    : [product.thumbnail];

  return (
    <div className="product-detail-page">
      <Link to="/catalog" className="back-link">
        ← Back to Catalog
      </Link>

      <div className="product-detail-layout">
        {}
        <div className="product-detail-gallery">
          <div className="product-detail-main-image">
            <img
              src={allImages[selectedImage] || product.thumbnail}
              alt={product.title}
            />
          </div>

          {allImages.length > 1 && (
            <div className="product-detail-thumbnails">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${
                    index === selectedImage ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {}
        <div className="product-detail-info">
          <h1>{product.title}</h1>

          {product.brand && (
            <p className="product-brand">{product.brand}</p>
          )}

          <p className="product-category">{product.category}</p>

          <div className="product-detail-pricing">
            {discountPrice ? (
              <>
                <span className="current-price">
                  ${discountPrice}
                </span>
                <span className="old-price">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="current-price">
                ${product.price}
              </span>
            )}
          </div>

                    <p>{product.description}</p>

          <div className="product-detail-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => {
                addItem(product);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>

            <button
              className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
              onClick={() => toggleItem(product)}
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist(product.id) ? "♥" : "♡"} Wishlist
            </button>
          </div>
        </div>
      </div>
            <div style={{ marginTop: "40px" }}>
        <h2>Reviews</h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a review..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "12px",
              border: "2px solid #fce4ec",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            onClick={handleAddReview}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: editingId ? "#2e7d32" : "#c71585",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              onClick={() => { setEditingId(null); setText(""); }}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #888",
                backgroundColor: "transparent",
                color: "#888",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : !reviews.length ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #fce4ec",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "12px",
                backgroundColor: "var(--color-white, white)",
                boxShadow: "0 2px 8px rgba(199,21,133,0.06)",
              }}
            >
              <p style={{ margin: "0 0 4px 0", lineHeight: 1.5 }}>{r.body}</p>
              {r.user && (
                <p style={{ margin: "0 0 8px 0", fontSize: "0.8rem", color: "#888" }}>
                  — {r.user}
                </p>
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEditReview(r)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid #c71585",
                    backgroundColor: "transparent",
                    color: "#c71585",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid #dc3545",
                    backgroundColor: "transparent",
                    color: "#dc3545",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
