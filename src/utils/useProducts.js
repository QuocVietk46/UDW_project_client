import {
  getDataAPI,
  postDataAPI,
  deleteDataAPI,
  patchDataAPI,
} from '../utils/fetchData';
import { useUserStore } from '@/stores/userStore';

export const useProducts = () => {
  const { token } = useUserStore();
  const findProducts = async (query) => {
    try {
      const res = await getDataAPI('products', query);

      return {
        products: res.data.products,
        total: res.data.total,
        page: res.data.page,
      };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const findProductById = async (id) => {
    try {
      const res = await getDataAPI(`products/${id}}`);
      console.log({ res });
      return { product: res.data.product };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await postDataAPI('admin/products', product, token);
      console.log({ resCreate: res });
      return { newProduct: res.data.product };
    } catch (error) {
      console.log({ errorCrateProduct: error });
      return false;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await patchDataAPI(`admin/products/${id}`, data, token);
      console.log({ res });
      return { newProduct: res.data.product };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteDataAPI(`admin/products/${id}`, token);
      console.log({ res });
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  return {
    findProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
