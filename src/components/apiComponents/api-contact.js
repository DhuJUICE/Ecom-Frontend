// apiComponents/api-contact.js
import {API_URL} from "./api-base-url"

export const submitContactForm = async (formData) => {
    
    const formPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
  
    try {
      const response = await fetch(`${API_URL}/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  