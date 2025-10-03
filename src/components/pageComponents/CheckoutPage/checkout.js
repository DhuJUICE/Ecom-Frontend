import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { processPayment } from '../../apiComponents/api-checkout';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("collect");
  const [deliveryFee] = useState(50);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const subtotal = parseFloat(localStorage.getItem("cartSubtotal")) || 0;
  const totalPrice = deliveryMethod === "delivery" ? subtotal + deliveryFee : subtotal;

  // Load Paystack script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleCheckout = (event) => {
    event.preventDefault();

    if (paymentMethod === "cash") {
      alert("Order placed! Thank you for your order.");
      navigate("/menu");
      return;
    }

    if (paymentMethod === "card") {
      if (!paystackLoaded || !window.PaystackPop) {
        alert("Payment system not loaded yet. Try again in a moment.");
        return;
      }

      try {
        const handler = window.PaystackPop.setup({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_1a8d4d898af9fb129b0f4b24d38a55cdf2fdecc4",
          email: localStorage.getItem("userEmail") || "customer@example.com",
          amount: totalPrice * 100,
          currency: "ZAR",
          ref: `PSK_${Date.now()}`,
          callback: function(response) {
            processPayment(totalPrice, response.reference)
              .then(() => {
                alert("Payment processed successfully!");
                navigate("/menu");
              })
              .catch(err => {
                alert("Error processing payment: " + err.message);
                console.error(err);
              });
          },
        });
        handler.openIframe();
      } catch (err) {
        alert("Error creating payment handler: " + err.message);
        console.error(err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 md:p-12 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Checkout</h1>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="w-4 h-4 text-green-500 accent-green-500"
              />
              <span>Pay with Card</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="w-4 h-4 text-green-500 accent-green-500"
              />
              <span>Pay with Cash</span>
            </label>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Delivery Method</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryMethod"
                value="collect"
                checked={deliveryMethod === "collect"}
                onChange={() => setDeliveryMethod("collect")}
                className="w-4 h-4 text-green-500 accent-green-500"
              />
              <span>Collect (No Delivery Fee)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => setDeliveryMethod("delivery")}
                className="w-4 h-4 text-green-500 accent-green-500"
              />
              <span>Delivery (+R{deliveryFee})</span>
            </label>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-6 text-right">
          <h3 className="text-xl font-semibold">
            Total: <span className="text-green-600">R{totalPrice.toFixed(2)}</span>
          </h3>
        </div>

        {/* Place Order Button */}
        <form onSubmit={handleCheckout} className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
