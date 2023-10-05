<script setup>
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <div :class="themeStore.theme">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
