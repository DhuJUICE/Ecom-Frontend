import { fetchModerationProducts } from '../apiComponents/api-products';
import { getCachedModerationProducts, cacheModerationProducts } from '../cacheComponents/cache-products';

export const preloadModerationProductData = async () => {
  let data = getCachedModerationProducts();

  if (!data) {
    data = await fetchModerationProducts();
    if (data){
		cacheModerationProducts(data);
	}
  }

  data = getCachedModerationProducts();
  return data;
  
};
