import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { logTransaction, processPayment } from './apiComponents/api-checkout'; // Import the functions

const Checkout = () => {
  const navigate = useNavigate();
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [cardElement, setCardElement] = useState(null); 
  const cardElementRef = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("collect");
  const [deliveryFee, setDeliveryFee] = useState(50); // Example delivery fee (R50)

  const subtotal = parseFloat(localStorage.getItem("cartSubtotal")) || 0;
  const totalPrice = deliveryMethod === "delivery" ? subtotal + deliveryFee : subtotal;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      const stripeInstance = window.Stripe('pk_test_51Q7V6fP3W3PNlhUH4jkTVZDpXEN9S341jGJJyl2paPsPZEn8frJp4PKH0lyrzz3cE2gyThoKTlbjCCCENQvHgPye00CWjmk9L5');
      const elementsInstance = stripeInstance.elements();
      setStripe(stripeInstance);
      setElements(elementsInstance);
    };
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (cardElement) {
      cardElement.destroy();
      setCardElement(null);
    }

    if (stripe && elements && paymentMethod === "card") {
      const newCardElement = elements.create("card");
      newCardElement.mount(cardElementRef.current);
      setCardElement(newCardElement);
    }
  }, [stripe, elements, paymentMethod]);

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (paymentMethod === "cash") {
      alert("Order placed! Thank you for your order.");

      // Log the transaction and redirect
      await logTransaction(paymentMethod);
      navigate("/menu");
      return;
    }

    // Process the payment for card
    if (paymentMethod === "card") {
      await processPayment(stripe, cardElement, totalPrice, paymentMethod, deliveryMethod);
      navigate("/menu");
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>Checkout</h1>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ color: "black", display: "block", marginBottom: "10px" }}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Pay with Card
        </label>

        <label style={{ color: "black", display: "block", marginBottom: "10px" }}>
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

      <div style={{ marginBottom: "20px" }}>
        <label style={{ color: "black", display: "block", marginBottom: "10px" }}>
          <input
            type="radio"
            name="deliveryMethod"
            value="collect"
            checked={deliveryMethod === "collect"}
            onChange={() => setDeliveryMethod("collect")}
          />
          Collect (No Delivery Fee)
        </label>

        <label style={{ color: "black", display: "block", marginBottom: "10px" }}>
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

      <h3 style={{ color: "black" }}>Total Price: R{totalPrice.toFixed(2)}</h3>

      <form id="payment-form" onSubmit={handleCheckout}>
        {paymentMethod === "card" && (
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="card-element" style={{ color: "black", display: "block", marginBottom: "5px" }}>
              Credit or Debit Card
            </label>
            <div ref={cardElementRef} id="card-element"></div>
            <div id="card-errors" role="alert" style={{ color: "red", marginTop: "5px" }}></div>
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
