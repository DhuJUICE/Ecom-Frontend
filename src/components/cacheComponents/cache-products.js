//get and cache menu products
const CACHE_KEY = 'cachedProducts';
const cacheMinutes = 60;
const CACHE_TIME = cacheMinutes * 60 * 1000; // 60 minute caching

export const getCachedProducts = () => {
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

export const cacheProducts = (products) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
};
//#################################################
//get and cache moderation products
const MODERATION_CACHE_KEY = 'cachedModerationData';
const MODERATION_CACHE_MINUTES = 1;
const MODERATION_CACHE_TIME = MODERATION_CACHE_MINUTES * 60 * 1000; // 5 minutes caching

export const getCachedModerationProducts = () => {
  const cachedData = localStorage.getItem(MODERATION_CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(`${MODERATION_CACHE_KEY}_timestamp`);
  
  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < MODERATION_CACHE_TIME) {
      //alert('Using cached moderation products');
      return JSON.parse(cachedData);
    }
  }
  return null;
};

export const cacheModerationProducts = (products) => {
  localStorage.setItem(MODERATION_CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(`${MODERATION_CACHE_KEY}_timestamp`, Date.now().toString());
};
//#################################################
//get and cache moderation products
const OWNER_CACHE_KEY = 'cachedOwnerData';
const OWNER_CACHE_MINUTES = 1;
const OWNER_CACHE_TIME = OWNER_CACHE_MINUTES * 60 * 1000; // 10 minutes caching

export const getCachedOwnerProducts = () => {
  const cachedData = localStorage.getItem(OWNER_CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(`${OWNER_CACHE_KEY}_timestamp`);
  
  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < OWNER_CACHE_TIME) {
      //alert('Using cached owner products');
      return JSON.parse(cachedData);
    }
  }
  return null;
};

export const cacheOwnerProducts = (products) => {
  localStorage.setItem(OWNER_CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(`${OWNER_CACHE_KEY}_timestamp`, Date.now().toString());
};