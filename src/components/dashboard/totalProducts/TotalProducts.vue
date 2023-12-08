<script setup>
import CardProduct from "../CardTotal.vue";

const props = defineProps({
  productTotal: {
    type: Object,
    default: {},
  },
});

const listProductTotal = [
  {
    title: "Đánh giá",
    value: props.productTotal.countRating || 0,
    class: "bg-secondary",
  },
  {
    title: "Bình luận",
    value: props.productTotal.countComment || 0,
    class: "bg-secondary",
  },
  {
    title: "Sản phẩm",
    value: props.productTotal.countProduct || 0,
    to: { name: "ManagerOrders" },
    class: "col-span-2 bg-secondary",
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
