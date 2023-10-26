import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  getDataAPI,
  postDataAPI,
  deleteDataAPI,
  patchDataAPI,
} from '@/utils/fetchData';
import { useAlertStore } from './alertStore';

export const useCartStore = defineStore('cart', () => {
  // State
  // Array of products and quantity in cart
  const products = ref([]);
  const amount = ref(0);
  const price = ref(0);
  const subPrice = ref(0);

  const alertStore = useAlertStore();

  const setCart = async () => {
    try {
      const res = await getDataAPI('cart');

      products.value = res.data.cart.products;
      products.value.length > 0 &&
        products.value.forEach((product) => {
          price.value += product.price * product.quantity;
          subPrice.value += price.value - product.sale * product.quantity;
          amount.value += product.quantity;
        });
    } catch (error) {
      console.log(error);
      alertStore.setAlert({
        message: 'Không thể lấy giỏ hàng',
        type: 'error',
      });
    }
  };

  const updateCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await patchDataAPI('cart', { productId, quantity });
      // change product is updated in cart
      products.value = [...res.data.newCart];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể cập nhật giỏ hàng',
        type: 'error',
      });
    }
  };

  const addProductToCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await postDataAPI('cart', { productId, quantity });
      products.value = [...res.data.newCart];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể thêm sản phẩm vào giỏ hàng',
        type: 'error',
      });
    }
  };

  const removeProductFromCart = async ({ productId }) => {
    try {
      const res = await deleteDataAPI(`cart/${productId}`);
      products.value = [...res.data.newCart];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể xóa sản phẩm khỏi giỏ hàng',
        type: 'error',
      });
    }
  };

  const cleanCart = async () => {
    try {
      await deleteDataAPI('cart');
      products.value = [];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể xóa giỏ hàng',
        type: 'error',
      });
    }
  };

  return {
    products,
    amount,
    price,
    subPrice,
    setCart,
    updateCart,
    addProductToCart,
    removeProductFromCart,
    cleanCart,
  };
});
