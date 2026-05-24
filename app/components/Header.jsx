import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-logo">
        <NavLink to="/" end>
          <h1>AZI Cosmetics</h1>
        </NavLink>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={({ isActive }) => (isActive ? "active" : "")}>
          Catalog
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
      </nav>

      <div className="header-actions">
        <NavLink to="/wishlist" className="wishlist-link">
          ♡ {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
        </NavLink>

        <NavLink to="/cart" className="cart-link">
           Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>

        <button onClick={toggleTheme} className="theme-btn">
          {theme === "light" ? "🌙" : "☀️"}
            </button>

        {isAuthenticated ? (
          <div className="user-menu">
            <span className="user-name">{user?.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
      </div>
        ) : (
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

