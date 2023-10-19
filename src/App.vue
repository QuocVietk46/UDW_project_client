<script setup>
import { useAlertStore } from './stores/alertStore';
import Alert from './components/Alert.vue';

const alertStore = useAlertStore();
</script>

<template>
  <div>
    <Alert v-if="alertStore.alert"></Alert>
    <router-view> </router-view>
  </div>
</template>

<style scoped></style>
