import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchCartItems } from "../../apiComponents/api-cart";
import { getAccessToken } from "../../userManagementComponents/tokenManagement/tokenManager";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState(() => {
    // Initialize cart from localStorage if available
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save cart to both state and localStorage
  const setCart = (items) => {
    setCartState(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Load cart items from API (memoized)
  const loadCart = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setCart([]);
      return;
    }

    setLoading(true);
    try {
      const items = await fetchCartItems();
      setCart(items || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart once on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Helper: total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, loadCart, totalQuantity, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
