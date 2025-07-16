import { API_URL } from "./api-base-url";

//fetch the business owners
export const fetchBusinessOwners = async () => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to access business owners management.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/user/business-owner`, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,  // Add auth token here
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend error:", errorData);
		throw new Error('Failed to fetch business owners');
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error('Error fetching business owners:', error);
	  return null;
	}
  };

// Delete a business owner by its ID for the authenticated staff/admin
export const deleteBusinessOwner = async (userId) => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to delete a business owner.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/user/business-owner/${userId}`, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`,
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend error:", errorData);
		throw new Error('Failed to delete business owner');
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error('Error deleting business owner:', error);
	  return false;
	}
  };

  // Update a business owner by its ID and details
export const updateBusinessOwnerDetails = async (userId, updateData) => {
	try {
	  const token = localStorage.getItem("accessToken");
  
	  if (!token) {
		alert("You must be logged in to update a business owners details.");
		return null;
	  }
  
	  const response = await fetch(`${API_URL}/api/user/business-owner/${userId}`, {
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
		throw new Error('Failed to update business owner details');
	  }
  
	  return await response.json(); // returns the updated business owner details
	} catch (error) {
	  console.error('Error updating business owner details:', error);
	  return null;
	}
  };