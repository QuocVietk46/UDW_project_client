import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAlertStore } from './alertStore';
import { useCartStore } from './cartStore';
import { useResetStore } from './resetStores';
import { postDataAPI } from '@/utils/fetchData';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref({});
  const userId = ref('');
  const token = ref('');

  const router = useRouter();

  // Declare other stores
  const alertStore = useAlertStore();
  const cartStore = useCartStore();
  const resetStore = useResetStore();

  // Actions
  const register = async (userData) => {
    try {
      const res = await postDataAPI('register', userData);
      setUser(res.data.user, res.data.accessToken);
      cartStore.setCart(res.data.cart);
      router.push({ name: 'Home' });
    } catch (err) {
      alertStore.setAlert({
        message: err.response.data.msg || 'Không thể đăng ký',
        type: 'error',
      });
      console.error({ errorRegister: err });
    }
  };

  const login = async (userData) => {
    try {
      const res = await postDataAPI('login', userData);
      console.log({ res });

      setUser(res.data.user, res.data.token);
      cartStore.setCart(res.data.cart);

      if (res.data.user.role === 'admin') router.push('/admin');
      else router.push({ name: 'Home' });
    } catch (error) {
      console.log({ errorLogin: error });
      alertStore.setAlert({ message: 'Không thể đăng nhập', type: 'error' });
    }
  };

  const logout = async () => {
    try {
      resetStore.all();
      await postDataAPI('logout');
      router.push({ name: 'Login' });
    } catch (error) {
      console.log({ errorLogout: error });
      alertStore.setAlert({ message: 'Không thể Đăng xuất', type: 'error' });
    }
  };

  const setUser = (newUser, newToken) => {
    user.value = newUser;
    userId.value = newUser._id;
    token.value = newToken;
  };

  const isAuthValid = () => {
    return token.value.length > 0 ? true : false;
  };

  const isAdmin = () => user.value.role === 'admin';

  return { user, userId, token, isAuthValid, isAdmin, register, login, logout };
});
