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
  
  export const processPayment = async (totalPrice, reference) => {
	try {
	  const response = await fetch(`${API_URL}/api/checkout`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
		body: JSON.stringify({
		  totalPurchaseTotal: totalPrice,
		  reference: reference
		}),
	  });
  
	  const data = await response.json();
	  if (response.ok) {
		alert("Payment successful");
		console.log("Payment verified:", data);
	  } else {
		alert("Payment verification failed");
		console.error("Verification error:", data);
	  }
	} catch (error) {
	  console.error("Error verifying payment:", error);
	}
  };