import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../../apiComponents/api-products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save products to state + localStorage
  const setProductList = (items) => {
    setProducts(items);
    localStorage.setItem("products", JSON.stringify(items));
  };

  // Load from API (memoized)
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProductList(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount if products empty
  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [loadProducts]);

  return (
    <ProductContext.Provider value={{ products, setProductList, loadProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook for easy use
export const useProducts = () => useContext(ProductContext);
