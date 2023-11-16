<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import TableManager from '@/components/table/TableManager.vue';
import ModalProduct from '@/components/modal/ModalProduct.vue';
import Filter from '@/components/filter/Filter.vue';
import { useProductsStore } from '@/stores/productsStore';

const route = useRoute();
const productsStore = useProductsStore();

const isLoading = ref(false);
const isShowModal = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  await productsStore.fetchProducts({
    status: 'all',
    ...route.query,
  });
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
      <div
        class="py-2 px-4 bg-white rounded-3xl hover:shadow-md hover:bg-slate-200 transition-colors duration-200"
      >
        <ModalProduct title="Thêm"></ModalProduct>
      </div>
      <Filter />
    </div>
    <TableManager></TableManager>
  </div>
</template>
