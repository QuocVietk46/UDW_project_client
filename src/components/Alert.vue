<script setup>
import { useAlertStore } from '../stores/alertStore';
import { onMounted } from 'vue';

const alertStore = useAlertStore();

let timeout = null;
const handleClose = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  alertStore.setAlert('');
};

onMounted(() => {
  timeout = setTimeout(() => {
    alertStore.setAlert('');
  }, 30000);
});
</script>
<template>
  <div
    class="z-50 flex overflow-hidden fixed right-2 top-2 rounded-md shadow-lg min-h-[2rem] items-center bg-red-500 py-2 px-4 after:h-1 after:bottom-0 after:bg-gradient-to-r after:from-gray-900 after:to-gray-600 after:w-full after:absolute after:right-0 after:animate-interval"
  >
    <div class="flex-grow min-w-[15rem] flex items-center">
      <i class="fa-solid fa-exclamation pr-3"></i>
      <p class="px-2 max-w-[20rem] text-white">{{ alertStore.alert }}</p>
    </div>
    <button @click="handleClose">
      <i class="fa-solid fa-xmark text-lg"></i>
    </button>
  </div>
</template>
