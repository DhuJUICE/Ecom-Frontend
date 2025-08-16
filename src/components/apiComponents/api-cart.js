import { API_URL } from "./api-base-url";
import { getAccessToken } from "../tokenManagement/tokenManager";

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

    // Now each cart item already has full product details from backend
    const productDetails = Object.values(cartItems).map(item => ({
      id: item.id,
      name: item.prodName,
      prodPrice: item.prodPrice || 0,
      image: item.prodImagePath || "default-image.jpg",
      quantity: item.quantity || 1,
    }));

    return productDetails;

  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// Adding to cart
export const addToCart = async (product, quantity) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    const response = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
        quantity,
        prodName: product.prodName,
        prodPrice: product.prodPrice,
        prodImagePath: product.prodImagePath,
      }),
    });

    if (!response.ok) throw new Error("Failed to add item to cart");

    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "Error adding to cart" };
  }
};

// Increment item quantity
export const incrementCartItemAPI = async (productId) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    const response = await fetch(`${API_URL}/api/cart/increment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const result = await response.json();
    return response.ok ? result : { success: false, message: result.message || "Increment failed" };
  } catch (error) {
    console.error("Increment error:", error);
    return { success: false, message: "An error occurred while incrementing item" };
  }
};

// Decrement item quantity
export const decrementCartItemAPI = async (productId) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    const response = await fetch(`${API_URL}/api/cart/decrement`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const result = await response.json();
    return response.ok ? result : { success: false, message: result.message || "Decrement failed" };
  } catch (error) {
    console.error("Decrement error:", error);
    return { success: false, message: "An error occurred while decrementing item" };
  }
};

// Remove item from cart
export const removeItemFromCartAPI = async (productId) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    const response = await fetch(`${API_URL}/api/cart/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const result = await response.json();
    return response.ok ? result : { success: false, message: result.message || "Remove failed" };
  } catch (error) {
    console.error("Remove error:", error);
    return { success: false, message: "An error occurred while removing item" };
  }
};
