import { useState, useEffect, useCallback, useRef } from "react";
import { productsApi } from "../services/api";

export const BEAUTY_CATEGORIES = [
  "beauty",
  "fragrances",
  "skin care",
];

function filterBeautyProducts(products) {
  return products.filter((p) => {
    const category = (p.category || "").toLowerCase().trim();
    return BEAUTY_CATEGORIES.some((bc) => category.includes(bc));
  });
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const abortRef = useRef(null);

  const LIMIT = 200;

  const fetchProducts = useCallback(async (query = "", isLoadMore = false) => {
    if (abortRef.current) {
      abortRef.current = null;
    }

    setLoading(true);
    setError(null);

    try {
      let allProducts;

      if (query) {
        const data = await productsApi.search(query);
        allProducts = data.products || [];
      } else {
        allProducts = await productsApi.getAll(0, LIMIT);
      }

      const beautyProducts = filterBeautyProducts(allProducts);

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...beautyProducts]);
      } else {
        setProducts(beautyProducts);
      }

      setHasMore(false);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []); 
  useEffect(() => {
    if (searchQuery) {
      fetchProducts(searchQuery);
    }
  }, [searchQuery]); 

  const search = useCallback((query) => {
    setSearchQuery(query);
    setSkip(0);
    if (!query) {
      fetchProducts();
    }
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    setSkip((prev) => prev + LIMIT);
  }, []);
  useEffect(() => {
    if (skip > 0) {
      fetchProducts(searchQuery, true);
    }
  }, [skip]);

  const refetch = useCallback(() => {
    setSkip(0);
    setSearchQuery("");
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    search,
    loadMore,
    refetch,
  };
}

export default useProducts;
