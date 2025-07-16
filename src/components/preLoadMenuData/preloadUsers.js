import { fetchBusinessOwners } from '../apiComponents/api-user';
import { getCachedUsers, cacheUsers } from '../cacheComponents/cache-users';

export const preloadUserData = async () => {
  let data = getCachedUsers();

  if (!data) {
    const result = await fetchBusinessOwners();
    if (result && result.users){
		cacheUsers(result.users);
	}
  }

  data = getCachedUsers();
  return data;
  
};
