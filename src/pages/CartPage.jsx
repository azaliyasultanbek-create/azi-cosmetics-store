import { Link } from "react-router";
import toast from "react-hot-toast";
import { useCart } from "../../app/context/CartContext";
import CartItem from "../../app/components/CartItem";
import ProtectedRoute from "../../app/components/ProtectedRoute";

export default function CartPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <ProtectedRoute>
      <CartContent
        items={items}
        totalPrice={totalPrice}
        totalItems={totalItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </ProtectedRoute>
  );
}

function CartContent({ items, totalPrice, totalItems, updateQuantity, removeItem, clearCart }) {
  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-cart-content">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/catalog" className="continue-shopping-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    toast.success("Order placed successfully! Thank you for your purchase!");
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items-list">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal ({totalItems} items)</span>
          <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping</span>
          <span className="cart-shipping">Free</span>
        </div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>

        <Link to="/catalog" className="continue-shopping-link">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
