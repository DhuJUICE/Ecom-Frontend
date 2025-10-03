export const setAccessToken = (token, expiresInMilliseconds = 60 * 60 * 1000) => {
    const expiryTime = Date.now() + expiresInMilliseconds;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExpiry", expiryTime.toString());
  };
  
  export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    const expiry = parseInt(localStorage.getItem("accessTokenExpiry"), 10);
    
    if (!token || !expiry || Date.now() > expiry) {
      // Token is missing or expired
      removeAccessToken();
      return null;
    }
    
    return token;
  };
  
  export const setRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  
  export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
  };
  
  export const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
  };

  