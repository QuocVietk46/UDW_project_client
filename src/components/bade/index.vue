<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="relative">
    <div class="absolute z-50 top-[-5px] right-[-5px] text-sm">
      {{ value }}
    </div>
    <slot />
  </div>
</template>
