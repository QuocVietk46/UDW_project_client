<script setup>
import { banners } from "@/assets/data";
import Carousel from "@/components/carousel/Carousel.vue";
</script>
<template>
  <Carousel :images="banners"> </Carousel>
</template>
