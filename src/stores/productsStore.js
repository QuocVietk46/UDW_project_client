import { createPinia } from 'pinia';
import { ref } from 'vue';

import { useProducts } from '../utils/useProducts';
import { useSearchStore } from './searchStore';

export const useProductsStore = createPinia('products', () => {
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

  const { search, category, sort, status } = useSearchStore();

  const fetchProducts = async () => {
    const res = await findProducts({
      search,
      category,
      status,
      sort,
    });
    products.value = res.products;
    total.value = res.total;
    page.value = res.page;
  };

  const fetchProductById = async (id) => {
    const res = await findProductById(id);
    product.value = res.product;
  };

  const addProduct = async (product) => {
    const res = await createProduct(product);
    products.value = [...res.newProduct, ...product.value];
  };

  const editProduct = async (id, post) => {
    const res = await updateProduct(id, post);
    products.value = products.value.map((product) => {
      if (product._id === res.newProduct._id) {
        return res.newProduct;
      }
      return product;
    });
  };

  const removeProduct = async (id) => {
    const res = await deleteProduct(id);
    if (res) {
      products.value = products.value.filter((product) => product._id !== id);
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
