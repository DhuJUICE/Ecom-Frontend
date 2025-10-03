// api-cart.js
import { API_URL } from "./api-base-url";
import { getAccessToken } from "../userManagementComponents/tokenManagement/tokenManager";

// Fetch all cart items with product details
export const fetchCartItems = async () => {
  try {
    const token = getAccessToken();
    if (!token) return [];

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized: User needs to log in.");
      } else {
        console.warn("Failed to fetch cart.");
      }
      return [];
    }

    const result = await response.json();
    if (!result.success || !result.cart) return [];

    const cartItems = result.cart;

    return Object.values(cartItems).map(item => ({
      id: item.id,
      name: item.prodName,
      prodPrice: item.prodPrice || 0,
      image: item.prodImagePath || "default-image.jpg",
      quantity: item.quantity || 1,
    }));

  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// Unified function to update the cart (add, remove, increment, decrement)
export const updateCartAPI = async ({ action, product, quantity }) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    // Build the payload according to backend expectations
    const body = { action, productId: product.id };

    if (action === "add") {
      body.quantity = quantity || 1;
      body.prodName = product.prodName;
      body.prodPrice = product.prodPrice;
      body.prodImagePath = product.prodImagePath;
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return response.ok
      ? result
      : { success: false, message: result.message || "Cart update failed" };

  } catch (error) {
    console.error("Cart update error:", error);
    return { success: false, message: "An error occurred while updating cart" };
  }
};

// Usage helpers
export const addToCart = async (product, quantity) => {
  return updateCartAPI({ action: "add", product, quantity });
};

export const incrementCartItemAPI = async (product) => {
  return updateCartAPI({ action: "increment", product });
};

export const decrementCartItemAPI = async (product) => {
  return updateCartAPI({ action: "decrement", product });
};

export const removeItemFromCartAPI = async (product) => {
  return updateCartAPI({ action: "remove", product });
};
