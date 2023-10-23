import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAlertStore } from './alertStore';
import { useCartStore } from './cartStore';
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
      const res = await useAuth().login(userData);
      console.log({ res });
      setUser(res.user, res.token);
      cartStore.setCart(res.cart);
      if (res.user.role === 'admin') router.push('/admin');
      else router.push('/');
    } catch (error) {
      // alertStore.setAlert({ message: err.response.data.msg, type: 'error' });
      console.log(error);
    }
  };

  const logout = async () => {
    await useAuth().logout();
    router.push({ name: 'Login' });
  };

  const setUser = (newUser, newToken) => {
    user.value = newUser;
    userId.value = newUser._id;
    token.value = newToken;
  };

  return { user, userId, token, register, login, logout };
});
