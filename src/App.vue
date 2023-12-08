<script setup>
import Alert from "@/components/Alert.vue";
import { useAlertStore } from "@/stores/alertStore";

const alertStore = useAlertStore();
</script>
<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alertStore.alert"></Alert>
    </Transition>
    <router-view> </router-view>
  </div>
</template>

<style scoped></style>
