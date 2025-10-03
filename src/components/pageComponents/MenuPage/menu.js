import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../apiComponents/api-cart";
import { useCart } from "../CartPage/cart-context";
import { useProducts } from "./product-context"; // <-- use the new context

const MenuPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { products, loading } = useProducts(); // <-- grab from context

  const handleAddToCart = async (product) => {
    const accessToken = !!localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/sign-in");
      return;
    }

    const quantity = 1;

    // Call API
    const result = await addToCart(product, quantity);
    if (!result.success) {
      alert(result.message || "Failed to add item.");
      return;
    }

    // Sync with backend cart
    if (result.cart && typeof result.cart === "object") {
      const mappedCart = Object.values(result.cart).map(item => ({
        id: item.id,
        name: item.prodName,
        prodPrice: item.prodPrice || 0,
        image: item.prodImagePath || "default-image.jpg",
        quantity: item.quantity || 1,
      }));
      setCart(mappedCart);
    } else {
      // Fallback if API doesn’t return full cart
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        const updatedCart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, {
          id: product.id,
          name: product.prodName,
          prodPrice: product.prodPrice,
          image: product.prodImagePath || "default-image.jpg",
          quantity
        }]);
      }
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No products available at the moment.</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all flex flex-col justify-between w-60 h-80 p-4"
              >
                <img
                  src={product.prodImagePath}
                  alt={product.prodName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="flex flex-col items-center mb-4">
                  <p className="text-lg font-semibold text-gray-800 text-center">{product.prodName}</p>
                  <p className="text-green-600 font-bold text-md mt-1">R{product.prodPrice}</p>
                </div>
                <button
                  className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuPage;
