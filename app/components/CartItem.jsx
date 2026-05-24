import { useMemo } from "react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const itemTotal = useMemo(() => {
    return (item.price * item.quantity).toFixed(2);
  }, [item.price, item.quantity]);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.thumbnail || "https://via.placeholder.com/80"}
          alt={item.title}
        />
      </div>
      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <span>${itemTotal}</span>
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(item.id, item.title)}>
        ✕
      </button>
    </div>
  );
}
