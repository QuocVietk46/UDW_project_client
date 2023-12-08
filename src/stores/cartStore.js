import { defineStore } from "pinia";
import { ref } from "vue";

import {
  getDataAPI,
  postDataAPI,
  deleteDataAPI,
  patchDataAPI,
} from "@/utils/fetchData";
import { useAlertStore } from "./alertStore";
import { useUserStore } from "./userStore";
import { useException } from "@/hook/exception";

export const useCartStore = defineStore("cart", () => {
  // State
  // products = [{product: {}, quantity: 1}, ...]
  const products = ref([]);
  const amount = ref(0);
  const price = ref(0);
  const subPrice = ref(0);
  const vat = ref(0);
  const error = ref(false);

  const alertStore = useAlertStore();
  const userStore = useUserStore();

  const calculatePrice = () => {
    error.value = false;
    price.value = 0;
    subPrice.value = 0;
    amount.value = 0;
    products.value.length > 0 &&
      products.value.forEach((item) => {
        // Giá gốc
        price.value += item.product.price * item.quantity;

        // Giá sau khi giảm giá
        const discount =
          item.product.price * (item.product.sale / 100) * item.quantity;
        subPrice.value += item.product.price * item.quantity - discount;

        // Số lượng sản phẩm
        amount.value += item.quantity;

        // Kiểm tra số lượng trong kho có đủ không
        if (item.product.quantity < item.quantity) {
          item.error =
            "Chỉ còn " + item.product.quantity + " sản phẩm trong kho";
          error.value = true;
        }
      });
    // VAT
    vat.value = subPrice.value * 0.1;
    // Tổng tiền
    subPrice.value += vat.value;
  };

  const getCart = async () => {
    try {
      console.log("getCart");
      const res = await getDataAPI({ url: "cart", token: userStore.token });
      console.log({ resCart: res });
      if (!res.data.cart) {
        return;
      }
      products.value = [...res.data.cart.products];
      products.value.length > 0 && calculatePrice();
    } catch (error) {
      console.log(error);
      alertStore.setAlert({
        message: "Không thể lấy giỏ hàng",
        type: "error",
      });
    }
  };

  const updateCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await patchDataAPI({
        url: "cart",
        data: { productId, quantity },
        token: userStore.token,
      });
      // change product is updated in cart
      products.value = [...res.data.newCart.products];
      calculatePrice();
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: "Không thể cập nhật giỏ hàng",
        type: "error",
      });
    }
  };

  const addProductToCart = async ({ productId, quantity = 1 }) => {
    try {
      const res = await postDataAPI({
        url: "cart",
        data: { productId, quantity },
        token: userStore.token,
      });
      products.value = [...res.data.newCart.products];
      calculatePrice();
      alertStore.setAlert({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        typeAlert: "success",
      });
    } catch (error) {
      console.error(error);
      useException(error);
    }
  };

  const removeProductFromCart = async ({ productId }) => {
    try {
      const res = await deleteDataAPI({
        url: `cart/${productId}`,
        token: userStore.token,
      });
      console.log(res);
      if (res.data.newCart.products.length === 0) {
        products.value = [];
      } else {
        products.value = [...res.data.newCart.products];
      }
      calculatePrice();
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: "Không thể xóa sản phẩm khỏi giỏ hàng",
        type: "error",
      });
    }
  };

  const cleanCart = async () => {
    try {
      await deleteDataAPI({ url: "cart", token: userStore.token });
      products.value = [];
      calculatePrice();
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: "Không thể xóa giỏ hàng",
        type: "error",
      });
    }
  };

  return {
    vat,
    error,
    products,
    amount,
    price,
    subPrice,
    getCart,
    updateCart,
    addProductToCart,
    removeProductFromCart,
    cleanCart,
  };
});
