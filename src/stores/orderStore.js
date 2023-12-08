import { defineStore } from "pinia";
import { ref } from "vue";
import jsPDF from "jspdf";

import { getDataAPI, postDataAPI, patchDataAPI } from "@/utils/fetchData";
import { useUserStore } from "./userStore";
import { useCartStore } from "./cartStore";

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);

  const userStore = useUserStore();
  const cartStore = useCartStore();

  const getOrders = async (status = "all") => {
    try {
      const res = await getDataAPI({
        url: "order",
        token: userStore.token,
        query: { status },
      });
      console.log(res.data.orders);
      orders.value = [...res.data.orders];
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = (id) => {
    return orders.value.find((order) => order._id === id);
  };

  const getOrdersAdmin = async (status) => {
    try {
      const res = await getDataAPI({
        url: "admin/order",
        token: userStore.token,
        query: { status },
      });
      console.log(res);
      orders.value = [...res.data.orders];
      console.log(orders.value);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrder = async (id, status) => {
    try {
      const res = await patchDataAPI({
        url: `order/${id}`,
        data: { status },
        token: userStore.token,
      });
      console.log(res.data.newOrder);
      orders.value = orders.value.map((order) =>
        order._id === id ? res.data.newOrder : order,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addOrder = async (order, query = {}) => {
    try {
      console.log({ order, query });
      const res = await postDataAPI({
        url:
          "order?vnp_Amount=" +
          query.vnp_Amount +
          "&vnp_BankCode=" +
          query.vnp_BankCode +
          "&vnp_BankTranNo=" +
          query.vnp_BankTranNo +
          "&vnp_CardType=" +
          query.vnp_CardType +
          "&vnp_PayDate=" +
          query.vnp_PayDate +
          "&vnp_ResponseCode=" +
          query.vnp_ResponseCode,
        data: order,
        token: userStore.token,
      });
      console.log({ res });
      cartStore.cleanCart();
      return res.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const addOrderVNPay = async (order) => {
    try {
      console.log({ order });
      const res = await postDataAPI({
        url: "order/payment_vnpay",
        data: order,
        token: userStore.token,
      });
      // console.log({ res });
      // cartStore.cleanCart();
      window.location.href = res.data.vnpUrl;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    orders,
    getOrdersAdmin,
    getOrder,
    addOrder,
    addOrderVNPay,
    getOrders,
    updateOrder,
  };
});
