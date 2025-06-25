import { fetchProducts } from '../apiComponents/api-products';
import { getCachedProducts, cacheProducts } from '../cacheComponents/cache-products';

export const preloadMenuData = async () => {
  let data = getCachedProducts();
  if (!data) {
    data = await fetchProducts();
    if (data) cacheProducts(data);
  }
};
