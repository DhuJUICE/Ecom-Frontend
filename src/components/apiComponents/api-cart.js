import { API_URL } from "./api-base-url";
import { getAccessToken } from "../tokenManagement/tokenManager"; //import tokenManager to manage the accessToken

export const fetchCartItems = async (setCart, setLoading, setPopupMessage = () => {}) => {
  try {
    setLoading(true);
    const token = getAccessToken();

    if (!token) {
      alert("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    const response = await fetch(`${API_URL}/api/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      alert("You are not logged in. Please sign in to view your cart.");
      setLoading(false);
      return;
    }

    const result = await response.json();

    if (!result.success || result.message) {
      setPopupMessage(result.message || "Failed to fetch cart. Please try again later.");
      setLoading(false);
      return;
    }

    const cartItems = result.cart;

    const productDetails = await Promise.all(
      Object.keys(cartItems).map(async (productId) => {
        try {
          const productResponse = await fetch(`${API_URL}/api/product/${productId}`);
          const product = await productResponse.json();
          return {
            id: product.id,
            name: product.prodName,
            prodPrice: product.prodPrice || 0,
            image: product.prodImagePath || "default-image.jpg",
            quantity: cartItems[productId] || 1,
          };
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          return null;
        }
      })
    );

    const filteredProducts = productDetails.filter((item) => item !== null);
    setCart(filteredProducts);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching cart:", error);
    setPopupMessage("Failed to load cart items.");
    setLoading(false);
  }
};

// Adding to cart
export const addToCart = async (productId, quantity) => {
  try {
    const token = getAccessToken();
    if (!token) return { success: false, message: "User not authenticated" };

    const response = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
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
