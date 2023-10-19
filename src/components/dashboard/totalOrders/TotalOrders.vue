<script setup>
import CardTotal from './CardTotal.vue';
const listCartTotal = [
  {
    status: 'pending',
    title: 'Chờ xử lý',
    value: 10,
    to: { name: 'ManagerOrders' },
    class: 'bg-gradient-to-r from-violet-500 to-violet-800',
  },
  {
    title: 'Đang vận chuyển',
    value: 10,
    to: { name: 'ManagerOrders' },
    class: 'bg-gradient-to-r from-sky-500 to-sky-800',
  },
  {
    title: 'Thành công',
    value: 10,
    to: { name: 'ManagerOrders' },
    class: 'bg-gradient-to-r from-orange-400 to-orange-800',
  },
  {
    title: 'Thất bại',
    value: 10,
    to: { name: 'ManagerOrders' },
    class: 'bg-gradient-to-r from-red-400 to-red-800',
  },
];
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <CardTotal
      v-for="cartTotal in listCartTotal"
      :key="cartTotal.title"
      :class="cartTotal.class"
      :value="cartTotal.value"
      :title="cartTotal.title"
      :to="cartTotal.to"
    >
    </CardTotal>
  </div>
</template>

<style scoped></style>
