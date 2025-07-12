import {API_URL} from "./api-base-url"

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
	  const response = await fetch(`${API_URL}/api/product/moderation`, {
		headers: { 'Content-Type': 'application/json' }
	  });
  
	  if (!response.ok) throw new Error('Failed to fetch moderation products');
	  
	  return await response.json();
	} catch (error) {
	  console.error('Error fetching moderation products:', error);
	  return null; // Handle errors gracefully
	}
  };

//fetch the products to be managed by a business owner
export const fetchOwnerProducts = async () => {
	try {
	  const response = await fetch(`${API_URL}/api/product/owner-mgmt`, {
		headers: { 'Content-Type': 'application/json' }
	  });
  
	  if (!response.ok) throw new Error('Failed to fetch business owner management products');
	  
	  return await response.json();
	} catch (error) {
	  console.error('Error fetching business owner management products:', error);
	  return null; // Handle errors gracefully
	}
  };