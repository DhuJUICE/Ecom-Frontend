import { fetchOwnerProducts } from '../apiComponents/api-products';
import { getCachedOwnerProducts, cacheOwnerProducts } from '../cacheComponents/cache-products';

export const preloadOwnerProductData = async () => {
  let data = getCachedOwnerProducts();

  if (!data) {
    data = await fetchOwnerProducts();
    if (data){
		cacheOwnerProducts(data);
	}
  }

  data = getCachedOwnerProducts();
  return data;
  
};
