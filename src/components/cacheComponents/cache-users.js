//get and cache menu products
const CACHE_KEY = 'cachedUsers';
const cacheMinutes = 1;
const CACHE_TIME = cacheMinutes * 60 * 1000; // 1 minute caching

export const getCachedUsers = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
  
  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < CACHE_TIME) {
      //alert('Using cached products');
      return JSON.parse(cachedData);
    }
  }
  return null;
};

export const cacheUsers = (users) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(users));
  localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
};
