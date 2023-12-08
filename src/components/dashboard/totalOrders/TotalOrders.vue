<script setup>
import CardTotal from "../CardTotal.vue";

const props = defineProps({
  orderTotal: {
    type: Object,
    default: {},
  },
});

console.log(props.orderTotal);

const listCartTotal = [
  {
    status: "pending",
    title: "Chờ xử lý",
    value: props.orderTotal.countPending || 0,
    to: { name: "ManagerOrders" },
    class: "bg-gradient-to-r from-violet-500 to-violet-800 text-white",
  },
  {
    status: "shipping",
    title: "Đang vận chuyển",
    value: props.orderTotal.countShipping || 0,
    to: { name: "ManagerOrders" },
    class: "bg-gradient-to-r from-sky-500 to-sky-800 text-white",
  },
  {
    status: "delivered",
    title: "Thành công",
    value: props.orderTotal.countDelivered || 0,
    to: { name: "ManagerOrders" },
    class: "bg-gradient-to-r from-orange-400 to-orange-800 text-white",
  },
  {
    status: "cancel",
    title: "Thất bại",
    value: props.orderTotal.countCancel || 0,
    to: { name: "ManagerOrders" },
    class: "bg-gradient-to-r from-red-400 to-red-800 text-white",
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
      :status="cartTotal.status"
    >
    </CardTotal>
  </div>
</template>

<style scoped></style>
