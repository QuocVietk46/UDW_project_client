import { defineStore } from "pinia";
import { ref } from "vue";

import {
  getDataAPI,
  postDataMultipartAPI,
  patchDataMultipartAPI,
  patchDataAPI,
  deleteDataAPI,
  postDataAPI,
} from "@/utils/fetchData";
import { useAlertStore } from "./alertStore";
import { useUserStore } from "./userStore";

export const useProductsStore = defineStore("products", () => {
  const products = ref(null);
  const product = ref([]);
  const page = ref(1);
  const total = ref(0);
  const rates = ref([]);
  const comments = ref([]);

  const alertStore = useAlertStore();
  const userStore = useUserStore();

  const fetchProducts = async (query) => {
    try {
      const res = await getDataAPI({ url: "products", query });
      console.log(res);
      products.value = res.data.products;
      total.value = res.data.total;
      page.value = res.data.page;
    } catch (error) {
      console.error(error);
      alertStore.setAlert({ message: "Không thể lấy sản phẩm", type: "error" });
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await getDataAPI({ url: `products/${id}` });
      product.value = res.data.product;
      const resRate = await getDataAPI({ url: `rate/${id}` });
      rates.value = resRate.data.rates;
      console.log(rates.value);
      const resComment = await getDataAPI({ url: `comment/${id}` });
      comments.value = resComment.data.comments;
      console.log({ resComment });
    } catch (error) {
      console.error(error);
      alertStore.setAlert({ message: "Không thể lấy sản phẩm", type: "error" });
    }
  };

  const addProduct = async (data) => {
    try {
      const res = await postDataMultipartAPI({
        url: "admin/products",
        data,
        token: userStore.token,
      });
      console.log(res);
      products.value = [{ ...res.data.newProduct }, ...products.value];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: "Không thể thêm sản phẩm",
        type: "error",
      });
    }
  };

  const editProduct = async (id, data) => {
    try {
      const res = await patchDataMultipartAPI({
        url: `admin/products/${id}`,
        data,
        token: userStore.token,
      });
      console.log({ res });
      products.value = products.value.map((product) => {
        if (product._id === res.data.newProduct._id) {
          return res.data.newProduct;
        }
        return product;
      });
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: "Không thể cập nhật sản phẩm",
        type: "error",
      });
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteDataAPI({
        url: `admin/products/${id}`,
        token: userStore.token,
      });
      products.value = products.value.filter((product) => product._id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  const rateProductById = async (productId, rate) => {
    try {
      await postDataAPI({
        url: "rate",
        data: { rate, productId },
        token: userStore.token,
      });
      rates.value = [
        { value: rate, productId, userId: { _id: userStore.userId } },
        ...rates.value,
      ];
    } catch (error) {
      console.error(error);
    }
  };

  const updateRateProductById = async (productId, rate) => {
    try {
      console.log({ productId, rate });
      await patchDataAPI({
        url: `rate`,
        data: { rate, productId },
        token: userStore.token,
      });
      rates.value = rates.value.map((item) => {
        if (item.userId._id === userStore.userId) {
          return { ...item, value: rate };
        }
        return item;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const commentProductById = async (productId, comment) => {
    try {
      const res = await postDataAPI({
        url: "comment",
        data: { comment, productId },
        token: userStore.token,
      });
      console.log({ comment: res });
      comments.value = [res.data.newComment, ...comments.value];
    } catch (error) {
      console.error(error);
    }
  };

  const updateCommentProductById = async (productId, comment) => {
    try {
      const res = await patchDataAPI({
        url: `comment`,
        data: { comment, productId },
        token: userStore.token,
      });
      comments.value = comments.value.map((comment) => {
        if (comment._id === res.data.newComment._id) {
          return res.data.newComment;
        }
        return comment;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRACProductById = async (productId, userId) => {
    try {
      await deleteDataAPI({
        url: `comment?productId=${productId}`,
        token: userStore.token,
      });
      await deleteDataAPI({
        url: `rate?productId=${productId}`,
        token: userStore.token,
      });

      comments.value = comments.value.filter(
        (comment) => comment.userId._id !== userId,
      );
      rates.value = rates.value.filter((rate) => rate.userId._id !== userId);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    rates,
    comments,
    page,
    total,
    products,
    product,
    updateCommentProductById,
    updateRateProductById,
    deleteRACProductById,
    commentProductById,
    rateProductById,
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
  };
});
