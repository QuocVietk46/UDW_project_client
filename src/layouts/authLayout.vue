<script setup>
import Footer from '../components/Footer.vue';
const hello = 'hello';
</script>
<template>
  <div class="grid grid-rows-6 h-screen bg-slate-100">
    <slot :class="hello"> </slot>
    <Footer class="" />
  </div>
</template>

<style scoped></style>
