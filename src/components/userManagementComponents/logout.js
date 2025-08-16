// src/components/Logout.js
import { getAccessToken, removeAccessToken, removeRefreshToken, removeBusinessOwner } from '../tokenManagement/tokenManager';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (!!getAccessToken()) {
      removeAccessToken();
      removeRefreshToken();
      removeBusinessOwner();
      navigate('/');
    }
  };

  return logout;
};

export default useLogout;
