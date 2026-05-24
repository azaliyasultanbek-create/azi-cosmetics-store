import { Link } from "react-router";
import { useAuth } from "../../app/context/AuthContext";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to AZI Cosmetics Store</h1>
        <p className="hero-subtitle">
          Discover premium beauty products curated just for you
        </p>
        <div className="hero-actions">
          <Link to="/catalog" className="btn-primary">
            Browse Catalog
          </Link>
          <Link to="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Premium Quality</h3>
            <p>Carefully selected products from trusted brands</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders over $50</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>Money Back Guarantee</h3>
            <p>30-day return policy on all items</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Your data is always protected</p>
          </div>
        </div>
      </section>

      {!isAuthenticated && (
        <section className="cta-section">
          <h2>Join Our Community</h2>
          <p>Create an account to save your favorites and track orders</p>
          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
        </section>
      )}

      {isAuthenticated && (
        <section className="welcome-back-section">
          <h2>Welcome back, {user?.name || "Valued Customer"}!</h2>
          <p>Continue exploring our latest collections.</p>
          <div className="quick-links">
            <Link to="/catalog" className="btn-primary">Shop Now</Link>
            <Link to="/cart" className="btn-secondary">View Cart</Link>
          </div>
        </section>
      )}
    </div>
  );
}