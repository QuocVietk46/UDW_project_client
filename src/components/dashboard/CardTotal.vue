<script setup>
const props = defineProps({
  to: {
    type: Object,
  },
  title: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="flex overflow-hidden rounded-2xl p-5 shadow-sm">
    <div class="flex flex-grow flex-col justify-between">
      <h1 class="flex text-xl font-bold">{{ title }}</h1>
      <div class="flex items-end justify-between">
        <h1 class="text-7xl">{{ value }}</h1>
        <router-link
          v-if="to"
          :to="{ name: 'ManagerOrders', query: { status: status } }"
          class="text-primary"
        >
          Xem chi tiết
        </router-link>
      </div>
    </div>
  </div>
</template>
