// src/apiComponents/cache-cart-products.js

const CACHE_KEY = "cartProductsCache";
const CACHE_EXPIRY_KEY = "cartProductsCacheExpiry";
const CACHE_DURATION_MS = 1 * 60 * 1000; // Cache expires in 1 minutes

export const getCachedCartProducts = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

  if (!cachedData || !cacheExpiry) return null;

  if (Date.now() > parseInt(cacheExpiry, 10)) {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
    return null;
  }

  return JSON.parse(cachedData);
};

export const setCachedCartProducts = (products) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION_MS).toString());
};
