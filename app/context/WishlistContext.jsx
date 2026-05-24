import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "cosmetics_wishlist";

function wishlistReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR": {
      return { ...state, items: [] };
    }

    case "LOAD": {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

function getInitialState() {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return { items: parsed };
        }
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage:", e);
    }
  }
  return { items: [] };
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, null, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error("Failed to save wishlist:", e);
    }
  }, [state.items]);

  const toggleItem = useCallback((product) => {
    const exists = state.items.some((item) => item.id === product.id);
    dispatch({ type: "TOGGLE", payload: product });
    if (exists) {
      toast.error(`${product.title} removed from wishlist`);
    } else {
      toast.success(`${product.title} added to wishlist!`);
    }
  }, [state.items]);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR" });
    toast.success("Wishlist cleared");
  }, []);

  const isInWishlist = useCallback(
    (id) => state.items.some((item) => item.id === id),
    [state.items]
  );

  const totalItems = useMemo(() => state.items.length, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      toggleItem,
      removeItem,
      clearWishlist,
      isInWishlist,
    }),
    [state.items, totalItems, toggleItem, removeItem, clearWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
