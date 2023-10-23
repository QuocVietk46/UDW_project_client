import {
  getDataAPI,
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from '../utils/fetchData';
import { useUserStore } from '../stores/userStore';
import { useAlertStore } from '../stores/alertStore';

export const useCart = () => {
  const userStore = useUserStore();
  const alertStore = useAlertStore();

  const findCart = async () => {
    try {
      const res = await getDataAPI('cart', {}, userStore.token);
      return { cart: res.data.cart };
    } catch (error) {
      alertStore.setAlert(error.response.data.error);
      console.log({ error });
      return false;
    }
  };

  const addProductToCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await postDataAPI(
        'cart',
        { productId, quantity },
        userStore.token
      );
      return { newCart: res.data.cart };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const updateCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await patchDataAPI(
        'cart',
        { productId, quantity },
        userStore.token
      );
      return { newCart: res.data.cart };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const removeProductFromCart = async ({ productId }) => {
    try {
      const res = await deleteDataAPI(`cart/${productId}`, userStore.token);
      return { newCart: res.data.cart };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const cleanCart = async () => {
    try {
      await deleteDataAPI('cart', userStore.token);
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  return {
    removeProductFromCart,
    findCart,
    addProductToCart,
    updateCart,
    cleanCart,
  };
};
