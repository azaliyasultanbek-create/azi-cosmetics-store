import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "cosmetics_cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    case "LOAD_CART": {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

function getInitialState() {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch (e) {
    console.error("Failed to load cart from localStorage:", e);
  }
}
  return { items: [] };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  }, [state.items]);

  const addItem = useCallback((product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.title} added to cart!`);
  }, []);

  const removeItem = useCallback((id, productTitle) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.error(`${productTitle || "Item"} removed from cart`);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared");
  }, []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state.items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

