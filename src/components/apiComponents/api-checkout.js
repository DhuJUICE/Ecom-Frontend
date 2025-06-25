// api-checkout.js
import {API_URL} from "./api-base-url"

export const logTransaction = async (paymentMethod) => {
    try {
      const response = await fetch(`${API_URL}/api/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ paymentMethod }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Transaction logged successfully:", data);
        alert("Transaction logged successfully");
      } else {
        console.error("Failed to log transaction:", data);
      }
    } catch (error) {
      console.error("Error logging transaction:", error);
    }
  };
  
  export const processPayment = async (stripe, cardElement, totalPrice, paymentMethod, deliveryMethod) => {
    if (!stripe || !cardElement) {
      console.error("Stripe has not loaded yet.");
      return;
    }
  
    let stripeToken = null;
    if (paymentMethod === "card") {
      const { token, error } = await stripe.createToken(cardElement);
      if (error) {
        document.getElementById("card-errors").textContent = error.message;
        return;
      }
      stripeToken = token.id;
    }
  
    // Prepare form data for the backend
    const formData = new FormData();
    if (stripeToken) formData.append("stripeToken", stripeToken);
    formData.append("totalPurchaseTotal", totalPrice);
    formData.append("paymentMethod", paymentMethod);
    formData.append("deliveryMethod", deliveryMethod);
  
    try {
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Payment successful");
        console.log("Payment successful:", data);
  
        // Log the transaction after payment
        await logTransaction(paymentMethod);
      } else {
        console.error("Payment failed:", data);
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
    }
  };
  