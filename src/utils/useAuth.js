import { useAlertStore } from '../stores/alertStore';
import { resetAllPiniaStores } from '../stores/Module/resetAllStores';
import { postDataAPI } from '../utils/fetchData';

export const useAuth = () => {
  const alertStore = useAlertStore();

  const register = async (data) => {
    try {
      const res = await postDataAPI('register', data);
      return {
        user: res.data.user,
        token: res.data.accessToken,
        cart: res.data.cart,
      };
    } catch (error) {
      alertStore.setAlert(error.response.data.error);
      return false;
    }
  };

  const login = async (data) => {
    try {
      const res = await postDataAPI('login', data);
      return {
        user: res.data.user,
        token: res.data.accessToken,
        cart: res.data.cart,
      };
    } catch (error) {
      alertStore.setAlert(error.response.data.error);
      return false;
    }
  };

  const logout = async () => {
    await postDataAPI('logout');
    resetAllPiniaStores();
    return true;
  };

  return { register, login, logout };
};
