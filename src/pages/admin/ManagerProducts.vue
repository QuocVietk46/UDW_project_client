<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import TableManager from "@/components/table/TableManager.vue";
import ModalProduct from "@/components/modal/ModalProduct.vue";
import Filter from "@/components/filter/Filter.vue";
import { useProductsStore } from "@/stores/productsStore";
import { exportProducts } from "@/hook/exportProducts";

const route = useRoute();
const productsStore = useProductsStore();

const isLoading = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  await productsStore.fetchProducts({
    status: "all",
    ...route.query,
  });
  isLoading.value = false;
};

const products = productsStore.products;

onMounted(async () => {
  watch(
    () => route.fullPath,
    () => {
      fetchData();
    },
    { immediate: true },
  );
});
</script>
<template>
  <div class="p-4">
    <div class="flex items-center justify-center gap-4">
      <div
        class="rounded-3xl bg-white px-4 py-2 transition-colors duration-200 hover:bg-slate-200 hover:shadow-md"
      >
        <ModalProduct title="Thêm"></ModalProduct>
      </div>
      <Filter />
    </div>
    <TableManager></TableManager>
    <div class="mt-6 flex justify-end">
      <button
        class="bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600 hover:shadow-md"
        @click="exportProducts(products)"
      >
        Xuất XLSX
      </button>
    </div>
  </div>
</template>
