import {API_URL} from "./api-base-url"

//FETCH or GET requests
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/product`, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; // Handle errors gracefully
  }
};

//fetch the products to be moderated
export const fetchModerationProducts = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to access moderation products.");
      return null;
    }

    const response = await fetch(`${API_URL}/api/product/moderation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Add auth token here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error('Failed to fetch moderation products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching moderation products:', error);
    return null;
  }
};

  
  // Fetch products for the authenticated business owner
  export const fetchOwnerProducts = async () => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to manage your products.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/product/owner-mgmt`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`, // 🔐 include the token
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend error:", errorData);
		throw new Error('Failed to fetch business owner products');
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error('Error fetching business owner products:', error);
	  return null;
	}
  };

//UPDATE or PATCH requests
// PATCH request to update the moderation_status of a specific product
export const updateModerationStatus = async (productId, newStatus) => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to perform this action.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/product/moderation/${productId}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({
		  moderation_status: newStatus,
		}),
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Failed to update moderation status:", errorData);
		throw new Error('Update failed');
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error("Error updating product:", error);
	  return null;
	}
  };
  