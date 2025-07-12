import { fetchCartItems } from '../apiComponents/api-cart';
import { getCachedCartProducts, cacheCartProducts } from '../cacheComponents/cache-cart-products';

export const preloadCartProductData = async () => {
  let data = getCachedCartProducts();

  if (!data) {
    data = await fetchCartItems();
    if (data){
		cacheCartProducts(data);
	}
  }

  data = getCachedCartProducts();
  return data;
  
};
