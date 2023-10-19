<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useSearchStore } from '../../stores/searchStore';
import CardProduct from '../../components/product/CardProduct.vue';
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
  console.log('fetch Data');
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
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-else-if="products">
      <div class="px-custom grid grid-cols-4 gap-4 py-5">
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
  </div>
</template>
