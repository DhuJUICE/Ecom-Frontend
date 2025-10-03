import React, { useState } from "react";
import { useCart } from "../CartPage/cart-context"; 
import { processPayment } from "../../apiComponents/api-checkout";

const Checkout = () => {
  const { cart } = useCart(); // read from context only
  const [deliveryMethod, setDeliveryMethod] = useState("collect");
  const deliveryFee = 50;

  const subtotal = cart.reduce((sum, item) => sum + item.prodPrice * item.quantity, 0);
  const totalPrice = deliveryMethod === "delivery" ? subtotal + deliveryFee : subtotal;

  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    await processPayment(totalPrice, orderNumber, deliveryMethod);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center tracking-wide">
          Checkout
        </h1>

        {/* Delivery Method */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Delivery Method</h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryMethod"
                value="collect"
                checked={deliveryMethod === "collect"}
                onChange={() => setDeliveryMethod("collect")}
                className="w-5 h-5 text-green-500 accent-green-500"
              />
              <span className="text-gray-800 font-medium">Collect (No Delivery Fee)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => setDeliveryMethod("delivery")}
                className="w-5 h-5 text-green-500 accent-green-500"
              />
              <span className="text-gray-800 font-medium">Delivery (+R{deliveryFee})</span>
            </label>
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Your Order</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between py-3">
                <span className="text-gray-800 font-medium">{item.name} x {item.quantity}</span>
                <span className="text-gray-700">R{(item.prodPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal:</span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>

          {deliveryMethod === "delivery" && (
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Delivery Fee:</span>
              <span>R{deliveryFee}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-green-600 text-xl mb-4 border-t border-gray-200 pt-2">
            <span>Total:</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </div>

          <div className="text-center mt-6 space-y-1">
            <p className="text-lg font-semibold text-gray-800">HeranBites</p>
            <p className="text-gray-600 italic">Thank you for your order!</p>
            <p className="text-gray-500 font-mono">ORDER# {orderNumber}</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-xl transition-transform transform hover:scale-105 shadow-md"
          >
            Pay & Place Order
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
