import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { postDataAPI } from '../utils/fetchData';
import { useAlertStore } from './alertStore';
import { useCartStore } from './cartStore';
import { resetAllPiniaStores } from './Module/resetAllStores';
import { useAuth } from '../utils/useAuth';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref({});
  const userId = ref('');
  const token = ref('');

  const router = useRouter();

  // Declare other stores
  const alertStore = useAlertStore();
  const cartStore = useCartStore();

  // Actions
  const register = async (userData) => {
    try {
      const res = await useAuth.register(userData);
      setUser(res.user, res.accessToken);
      cartStore.setCart(res.cart);
      router.push('/login');
    } catch (err) {
      alertStore.setAlert({ message: err.response.data.msg, type: 'error' });
    }
  };

  const login = async (userData) => {
    try {
      const res = await useAuth.login(userData);
      setUser(res.user, res.accessToken);
      cartStore.setCart(res.cart);
      router.push('/');
    } catch (err) {
      alertStore.setAlert({ message: err.response.data.msg, type: 'error' });
    }
  };

  const logout = async () => {
    await useAuth.logout();
    router.push('/');
  };

  const setUser = (user, token) => {
    user.value = user;
    userId.value = user._id;
    token.value = token;
  };

  return { user, userId, token, register, login, logout };
});
