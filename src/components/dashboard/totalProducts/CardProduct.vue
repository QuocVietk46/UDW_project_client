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
    class="flex flex-col justify-between bg-white p-6 text-white rounded-2xl overflow-hidden shadow-sm"
  >
    <div>
      <slot></slot>
      <h4 class="text-lg font-bold">{{ title }}</h4>
    </div>
    <div class="flex">
      <h1 class="text-7xl">{{ value }}</h1>
      <div>
        <router-link v-if="to" :to="to" class="text-primary">></router-link>
      </div>
    </div>
  </div>
</template>
