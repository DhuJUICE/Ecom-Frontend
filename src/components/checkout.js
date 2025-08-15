import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { processPayment } from './apiComponents/api-checkout';
import "../styles/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("collect");
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const subtotal = parseFloat(localStorage.getItem("cartSubtotal")) || 0;
  const totalPrice = deliveryMethod === "delivery" ? subtotal + deliveryFee : subtotal;

  // Dynamically load Paystack script
  useEffect(() => {
    alert("Loading Paystack script...");
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      alert("Paystack script loaded!");
      setPaystackLoaded(true);
    };
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const handleCheckout = (event) => {
    event.preventDefault();
    alert("Checkout button clicked!");

    if (paymentMethod === "cash") {
      alert("Order placed! Thank you for your order.");
      navigate("/menu");
      return;
    }

    if (paymentMethod === "card") {
      alert("Initializing Paystack...");

      if (!paystackLoaded || !window.PaystackPop) {
        alert("Payment system not loaded yet. Try again in a moment.");
        return;
      }

      alert("Creating Paystack handler...");
      try {
        const handler = window.PaystackPop.setup({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_1a8d4d898af9fb129b0f4b24d38a55cdf2fdecc4",
          email: localStorage.getItem("userEmail") || "customer@example.com",
          amount: totalPrice * 100, // Paystack expects amount in cents
          currency: "ZAR",
          ref: `PSK_${Date.now()}`,
          callback: function(response) {
            alert("Payment callback triggered! Reference: " + response.reference);
            processPayment(totalPrice, response.reference)
              .then(() => {
                alert("Payment processed successfully on server.");
                navigate("/menu");
              })
              .catch(err => {
                alert("Error processing payment on server: " + err.message);
                console.error(err);
              });
          },
          onClose: function() {
            alert("Payment popup closed by user");
          }
        });

        alert("Opening Paystack popup...");
        handler.openIframe();
      } catch (err) {
        alert("Error creating handler: " + err.message);
        console.error(err);
      }
    }
  };

  return (
    <div style={{ color: "black" }}>
      <h1>Checkout</h1>

      <div>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Pay with Card
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Pay with Cash
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="collect"
            checked={deliveryMethod === "collect"}
            onChange={() => setDeliveryMethod("collect")}
          />
          Collect (No Delivery Fee)
        </label>

        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={() => setDeliveryMethod("delivery")}
          />
          Delivery (+R{deliveryFee})
        </label>
      </div>

      <h3>Total Price: R{totalPrice.toFixed(2)}</h3>

      <form onSubmit={handleCheckout}>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
