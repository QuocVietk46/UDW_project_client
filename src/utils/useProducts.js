import { getDataAPI } from '../utils/fetchData';

export const useProducts = () => {
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
      const res = await getDataAPI('products', product);
      console.log({ res });
      return { newProduct: res.data.product };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const updateProduct = async (id, post) => {
    try {
      const res = await getDataAPI(`products/${id}`, post);
      console.log({ res });
      return { newProduct: res.data.product };
    } catch (error) {
      console.log({ error });
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await getDataAPI(`products/${id}`);
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
