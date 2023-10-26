import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  getDataAPI,
  postDataMultipartAPI,
  patchDataMultipartAPI,
  deleteDataAPI,
} from '@/utils/fetchData';
import { useAlertStore } from './alertStore';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const product = ref([]);
  const page = ref(1);
  const total = ref(0);

  const alertStore = useAlertStore();

  const fetchProducts = async (query) => {
    try {
      const res = await getDataAPI('products', query);
      products.value = res.data.products;
      total.value = res.data.total;
      page.value = res.data.page;
    } catch (error) {
      console.error(error);
      alertStore.setAlert({ message: 'Không thể lấy sản phẩm', type: 'error' });
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await getDataAPI(`products/${id}`);
      product.value = res.data.product;
    } catch (error) {
      console.error(error);
      alertStore.setAlert({ message: 'Không thể lấy sản phẩm', type: 'error' });
    }
  };

  const addProduct = async (data) => {
    try {
      const res = await postDataMultipartAPI('admin/products', data);
      console.log(res);
      products.value = [{ ...res.data.newProduct }, ...products.value];
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể thêm sản phẩm',
        type: 'error',
      });
    }
  };

  const editProduct = async (id, data) => {
    try {
      const res = await patchDataMultipartAPI(`admin/products/${id}`, data);
      products.value = products.value.map((product) => {
        if (product._id === res.data.newProduct._id) {
          return res.data.newProduct;
        }
        return product;
      });
    } catch (error) {
      console.error(error);
      alertStore.setAlert({
        message: 'Không thể cập nhật sản phẩm',
        type: 'error',
      });
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteDataAPI(`admin/products/${id}`);
      products.value = products.value.filter((product) => product._id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    page,
    total,
    products,
    product,
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
  };
});
