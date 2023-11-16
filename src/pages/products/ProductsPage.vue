<script setup>
import { storeToRefs } from 'pinia';
import { onActivated, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import CardProduct from '../../components/product/CardProduct.vue';
import { useProductsStore } from '@/stores/productsStore';

const route = useRoute();
const productsStore = useProductsStore();

const products = storeToRefs(productsStore).products;
const total = ref(0);
const page = ref(1);

const fetchData = async () => {
  await productsStore.fetchProducts({
    ...route.query,
  });
};

onActivated(async () => {
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
  <div v-if="products" class="bg-primary">
    <div class="px-40 grid grid-cols-4 gap-4 py-5">
      <CardProduct
        v-if="products"
        v-for="product in products"
        :product="product"
      />
    </div>
    <div class="flex justify-center pb-1">
      <ul class="flex justify-between cursor-pointer">
        <li class="p-1">&lt;&lt;</li>
        <li
          :class="page === value + 1 ? 'bg-gray-200' : ''"
          class="p-1"
          v-for="value in Array.from(Array(parseInt(total / 16) + 1).keys())"
        >
          {{ value + 1 }}
        </li>
        <li class="p-1">>></li>
      </ul>
    </div>
  </div>
</template>
