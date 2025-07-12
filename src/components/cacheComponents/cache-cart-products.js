// src/apiComponents/cache-cart-products.js

// Get and cache cart products
const CART_CACHE_KEY = 'cachedCartProducts';
const CART_CACHE_MINUTES = 1;
const CART_CACHE_TIME = CART_CACHE_MINUTES * 60 * 1000; // 1 minute caching

export const getCachedCartProducts = () => {
  const cachedData = localStorage.getItem(CART_CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(`${CART_CACHE_KEY}_timestamp`);

  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < CART_CACHE_TIME) {
      // alert('Using cached cart products');
      return JSON.parse(cachedData);
    }
  }

  return null;
};

export const cacheCartProducts = (products) => {
  localStorage.setItem(CART_CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(`${CART_CACHE_KEY}_timestamp`, Date.now().toString());
};
