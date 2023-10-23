<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SearchInput from '@/components/inputs/searchInput.vue';
import TableManager from '@/components/table/TableManager.vue';
import ModalProduct from '@/components/modal/ModalProduct.vue';
import { useProductsStore } from '@/stores/productsStore';

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

const isLoading = ref(false);
const products = storeToRefs(productsStore).products;
const total = storeToRefs(productsStore).total;
const page = storeToRefs(productsStore).page.value;
const search = ref('');

const fetchData = async () => {
  isLoading.value = true;
  await productsStore.fetchProducts({
    search: search.value,
    ...route.query,
  });
  isLoading.value = false;
};

const handleSubmit = async (values) => {
  router.push({
    name: 'ManagerProducts',
    query: {
      ...(search.value && { search: search.value }),
      ...(values.target.category.value && {
        category: values.target.category.value,
      }),
      ...(values.target.sort.value && { sort: values.target.sort.value }),
      ...(values.target.subSort.value && {
        subSort: values.target.subSort.value,
      }),
    },
  });
};

onMounted(async () => {
  watch(
    () => route.fullPath,
    () => {
      fetchData();
    },
    { immediate: true }
  );
});
</script>
<template>
  <div class="p-4">
    <div class="flex items-center justify-center gap-4">
      <div
        class="py-2 px-4 bg-white rounded-3xl hover:shadow-md hover:bg-slate-200 transition-colors duration-200"
      >
        <ModalProduct> Thêm </ModalProduct>
      </div>
      <div class="">
        <SearchInput push="ManagerProducts" @value="search = $event" />
      </div>
      <form @submit.prevent="handleSubmit" class="flex gap-4">
        <div class="p-2 bg-white flex divide-x-2 rounded-3xl">
          <div class="px-1">
            <select name="category" class="cursor-pointer focus:outline-none">
              <option value="">Loại</option>
              <option value="t-shirt">Áo tay ngắn</option>
              <option value="short">Quần sort</option>
              <option value="jean">Quần jean</option>
              <option value="pant">Quần dài</option>
              <option value="jacket">Áo khoác</option>
            </select>
          </div>
          <div class="px-1">
            <select name="sort" class="cursor-pointer focus:outline-none">
              <option value="">Sắp xếp</option>
              <option value="price">Giá</option>
              <option value="date">Ngày ra mắt</option>
              <option value="quantity">Số lượng tồn</option>
            </select>
          </div>
          <div class="px-1">
            <select name="subSort" class="cursor-pointer focus:outline-none">
              <option value="inc">Tăng dần</option>
              <option value="dec">Giảm dần</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="py-2 px-4 bg-white rounded-3xl hover:shadow-md hover:bg-slate-200 transition-colors duration-200"
          >
            Tìm
          </button>
        </div>
      </form>
    </div>
    <div class="min-h-screen">
      <TableManager :products="products"></TableManager>
    </div>
  </div>
</template>
