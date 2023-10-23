import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useCart } from '../utils/useCart';

export const useCartStore = defineStore('cart', () => {
  // State
  // Array of products and quantity in cart
  const cart = ref([]);
  const amount = ref(0);
  const price = ref(0);
  const subPrice = ref(0);

  const setCart = async () => {
    const res = await useCart().findCart();
    console.log({ resCart: res });
    cart.value = res.cart;
    cart.value.length > 0 &&
      cart.value.forEach((product) => {
        price.value += product.price * product.quantity;
        subPrice.value += price.value - product.sale * product.quantity;
        amount.value += product.quantity;
      });
  };

  const updateCart = async ({ productId, quantity = 1 }) => {
    const res = await useCart.updateCart({ productId, quantity });
    if (!res) {
      return;
    }
    cart.value.map((product) => {
      if (product._id === res.newCart._id) {
        return res.newCart;
      }
      return product;
    });
  };

  const addProductToCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await useCart.addProductToCart({ productId, quantity });
      cart.value = [...res.newCart];
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductFromCart = async ({ productId }) => {
    const res = await useCart.removeProductFromCart({ productId });
    if (!res) {
      return;
    }
    cart.value = [...res.newCart];
  };

  const cleanCart = async () => {
    const res = await useCart.cleanCart();
    if (res) {
      cart.value = [];
    }
  };

  return {
    cart,
    amount,
    setCart,
    updateCart,
    addProductToCart,
    removeProductFromCart,
    cleanCart,
  };
});
