import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from "./cart-context"; 
import { incrementCartItemAPI, decrementCartItemAPI, removeItemFromCartAPI } from '../../apiComponents/api-cart';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [loadingItems, setLoadingItems] = useState(false);

  const incrementCartItem = async (productId) => {
    setLoadingItems(true);
    const result = await incrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    setLoadingItems(false);
  };

  const decrementCartItem = async (productId) => {
    setLoadingItems(true);
    const result = await decrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    const updatedCart = cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    setLoadingItems(false);
  };

  const removeItemFromCart = async (productId) => {
    setLoadingItems(true);
    const result = await removeItemFromCartAPI(productId);
    if (!result.success) return alert(result.message);

    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    setLoadingItems(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.prodPrice * item.quantity, 0);

  const goToCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    navigate('/checkout');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <section className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 rounded-lg shadow p-4">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"/>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold mt-1">R {item.prodPrice}</p>
                  <p className="text-gray-700 mt-2">Quantity: {item.quantity}</p>
                  <p className="text-gray-800 font-medium mt-1">Total: R {(item.prodPrice * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center space-y-2 mt-4 sm:mt-0">
                  <button onClick={() => incrementCartItem(item.id)} className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg w-10 h-10">
                    <FaPlus />
                  </button>
                  <button onClick={() => decrementCartItem(item.id)} className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg w-10 h-10">
                    <FaMinus />
                  </button>
                  <button onClick={() => removeItemFromCart(item.id)} className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg w-10 h-10">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-lg p-4">
            <p className="text-lg font-semibold text-gray-800">
              Subtotal: <span className="text-green-600">R {subtotal.toFixed(2)}</span>
            </p>
            <button onClick={goToCheckout} className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
