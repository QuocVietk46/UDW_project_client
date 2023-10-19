<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useProductsStore } from '../stores/productsStore';
import { useAlertStore } from '../stores/alertStore';

const productsStore = useProductsStore();
const route = useRoute();
const product = productsStore.product;
const alertStore = useAlertStore();

onMounted(async () => {
  await productsStore.getProduct(route.params.id);
});
</script>
<template>
  <div>
    <h1 v-if="alertStore.loading">Loading...</h1>
    <div v-else>{{ product }}</div>
  </div>
</template>
