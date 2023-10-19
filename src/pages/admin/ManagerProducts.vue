<script setup>
import SearchInput from '../../components/inputs/searchInput.vue';
import TableManager from '../../components/table/TableManager.vue';
import ModalProduct from '../../components/modal/ModalProduct.vue';

import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useSearchStore } from '../../stores/searchStore';
import { useProducts } from '../../hooks/useProducts';

const route = useRoute();
const isLoading = ref(false);
const products = ref([]);
const total = ref(0);
const page = ref(1);
const search = storeToRefs(useSearchStore()).search;

const { findProducts } = useProducts();

const fetchData = async () => {
  const { category } = route.query;
  isLoading.value = true;
  const res = await findProducts({
    category,
    search: search.value,
    page: page.value,
  });
  if (!res) {
    isLoading.value = false;
    return;
  }
  page.value = res.page;
  total.value = res.total;
  products.value = res.products;
  isLoading.value = false;
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
      <div class="min-w-[500px]">
        <SearchInput push="ManagerProducts" />
      </div>
      <div class="p-2 bg-white flex divide-x-2 rounded-3xl">
        <div class="px-1">
          <select name="category" class="cursor-pointer focus:outline-none">
            <option value="">Loại</option>
            <option value="">t-shirt</option>
            <option value="">short</option>
            <option value="">jean</option>
            <option value="">pans</option>
          </select>
        </div>
        <div class="px-1">
          <select name="sort" class="cursor-pointer focus:outline-none">
            <option value="">Sắp xếp</option>
            <option value="">Giá</option>
            <option value="">Ngày ra mắt</option>
            <option value="">Số lượng tồn</option>
          </select>
        </div>
        <div class="px-1">
          <select name="subSort" class="cursor-pointer focus:outline-none">
            <option value="">Tăng dần</option>
            <option value="">Giảm dần</option>
          </select>
        </div>
      </div>
      <div class="">
        <button
          class="py-2 px-4 bg-white rounded-3xl hover:bg-slate-200 transition-colors duration-200"
        >
          Tìm
        </button>
      </div>
    </div>
    <div>
      <TableManager :products="products"></TableManager>
    </div>
  </div>
</template>
