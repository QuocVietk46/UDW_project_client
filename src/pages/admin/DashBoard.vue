<script setup>
import TotalOrders from '../../components/dashboard/totalOrders/TotalOrders.vue';
import TotalProducts from '../../components/dashboard/totalProducts/TotalProducts.vue';
</script>
<template>
  <section class="bg-primary h-screen">
    <div class="grid grid-rows-[repeat(4,calc((100vh/4)-20px))] gap-4 p-4">
      <TotalOrders />
      <TotalProducts />
    </div>
  </section>
</template>
