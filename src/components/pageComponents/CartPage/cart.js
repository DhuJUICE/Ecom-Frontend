import React, { useState, useEffect } from 'react';
import Checkout from '../CheckoutPage/checkout';  
import { 
  fetchCartItems, 
  incrementCartItemAPI, 
  decrementCartItemAPI, 
  removeItemFromCartAPI 
} from '../../apiComponents/api-cart';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [popupMessage, setPopupMessage] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const [showCartPage, setShowCartPage] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCartItems();
      setCartItems(data || []);
      setLoading(false);
    };
    loadCart();
  }, []);

  const updateBadge = () => window.dispatchEvent(new CustomEvent("cartUpdated"));

  const incrementCartItem = async (productId) => {
    const result = await incrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    updateBadge();
  };

  const decrementCartItem = async (productId) => {
    const result = await decrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );

    updateBadge();
  };

  const removeItemFromCart = async (productId) => {
    const result = await removeItemFromCartAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev => prev.filter(item => item.id !== productId));

    updateBadge();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prodPrice * item.quantity, 0);
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cartSubtotal", calculateTotal().toFixed(2));
    setShowCartPage(false);
    setIsCheckoutPage(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading cart...</p>
        </div>
      ) : showCartPage ? (
        <section className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Your Cart</h2>

          {popupMessage && (
            <p className="text-red-500 font-medium mb-4 text-center">{popupMessage}</p>
          )}

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
          ) : (
            <div className="grid gap-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 rounded-lg shadow p-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-bold mt-1">R {item.prodPrice}</p>
                    <p className="text-gray-700 mt-2">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-medium mt-1">Total: R {(item.quantity * item.prodPrice).toFixed(2)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center space-y-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => incrementCartItem(item.id)}
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg w-10 h-10 transition-colors"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => decrementCartItem(item.id)}
                      className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg w-10 h-10 transition-colors"
                    >
                      <FaMinus />
                    </button>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg w-10 h-10 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg p-4">
              <p className="text-lg font-semibold text-gray-800">
                Subtotal: <span className="text-green-600">R {calculateTotal().toFixed(2)}</span>
              </p>
              <button
                onClick={goToCheckout}
                className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </section>
      ) : (
        isCheckoutPage && <Checkout />
      )}
    </main>
  );
};

export default Cart;
