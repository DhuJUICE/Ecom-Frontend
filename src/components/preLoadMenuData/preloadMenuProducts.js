import { fetchProducts } from '../apiComponents/api-products';
import { getCachedProducts, cacheProducts } from '../cacheComponents/cache-products';

export const preloadMenuProductData = async () => {
  let data = getCachedProducts();

  if (!data) {
    data = await fetchProducts();
    if (data){
		cacheProducts(data);
	}
  }

  data = getCachedProducts();
  return data;
  
};
