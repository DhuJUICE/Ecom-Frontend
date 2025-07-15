import {API_URL} from "./api-base-url"

//##############################################################
//PRODUCT MENU - PRODUCT API CALLS
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
//##############################################################
//MODERATION OF PRODUCTS API CALLS
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
  
//##############################################################
//BUSINESS OWNER PRODUCT MANAGEMENT API CALLS
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


// Delete a product by its ID for the authenticated business owner
export const deleteOwnerProduct = async (productId) => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to delete a product.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/product/owner-mgmt/${productId}`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend error:", errorData);
		throw new Error('Failed to delete product');
	  }
  
	  return true; // ✅ Successfully deleted
	} catch (error) {
	  console.error('Error deleting product:', error);
	  return false;
	}
  };

// Update a product by its ID for the authenticated business owner
export const updateOwnerProduct = async (productId, updateData) => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to update a product.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/product/owner-mgmt/${productId}`, {
		method: 'PATCH', // or PATCH depending on your Django view
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(updateData),
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend error:", errorData);
		throw new Error('Failed to update product');
	  }
  
	  return await response.json(); // returns the updated product
	} catch (error) {
	  console.error('Error updating product:', error);
	  return null;
	}
  };