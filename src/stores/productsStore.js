import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useProducts } from '../utils/useProducts';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const product = ref([]);
  const page = ref(1);
  const total = ref(0);

  const {
    findProductById,
    findProducts,
    updateProduct,
    deleteProduct,
    createProduct,
  } = useProducts();

  const fetchProducts = async (query) => {
    try {
      const res = await findProducts(query);
      products.value = res.products;
      total.value = res.total;
      page.value = res.page;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await findProductById(id);
      product.value = res.product;
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (data) => {
    try {
      const res = await createProduct(data);
      console.log(res);
      if (!res) {
        throw new Error('Cant create product');
      }
      products.value = [{ ...res.newProduct }, ...products.value];
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async (id, data) => {
    try {
      const res = await updateProduct(id, data);
      if (!res) {
        throw new Error('Cant update product');
      }
      products.value = products.value.map((product) => {
        if (product._id === res.newProduct._id) {
          return res.newProduct;
        }
        return product;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
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
