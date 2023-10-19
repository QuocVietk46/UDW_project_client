<script setup>
import CardProduct from './CardProduct.vue';
const listProductTotal = [
  {
    title: 'Đánh giá',
    value: 10,
    to: { name: 'ManagerOrders' },
  },
  {
    title: 'Bình luận',
    value: 10,
    to: { name: 'ManagerOrders' },
  },
  {
    title: 'Sản phẩm',
    value: 10,
    to: { name: 'ManagerOrders' },
    class: 'col-span-2',
  },
];
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <CardProduct
      v-for="item in listProductTotal"
      class="bg-white text-secondary"
      :class="item.class"
      :value="item.value"
      :title="item.title"
      :to="item.to"
    >
    </CardProduct>
  </div>
</template>
