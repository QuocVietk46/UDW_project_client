<script setup>
const props = defineProps({
  to: {
    type: Object,
    default: '/',
  },
  title: {
    type: String,
    default: '',
  },
  value: {
    type: Number,
    default: '',
  },
});
</script>
<template>
  <div
    class="flex bg-white p-5 text-white rounded-2xl overflow-hidden shadow-sm"
  >
    <div class="flex-grow flex flex-col justify-between">
      <h1 class="text-xl font-bold flex">{{ title }}</h1>
      <h1 class="text-7xl">{{ value }}</h1>
    </div>
    <div class="flex flex-col justify-between">
      <div>
        <slot></slot>
      </div>

      <router-link v-if="to" :to="to" class="text-primary">
        Xem chi tiết
      </router-link>
    </div>
  </div>
</template>
