<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore();
const router = useRouter();

let timeout = null;
const handleClose = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  alertStore.resetAlert();
};

const handleClick = () => {
  handleClose();
  router.push({ name: 'Login' });
};

onMounted(() => {
  timeout = setTimeout(() => {
    alertStore.setAlert('');
  }, 30000);
});
</script>
<template>
  <div
    :class="{
      'bg-red-500': alertStore.type === 'error',
      'bg-green-500': alertStore.type === 'success',
    }"
    class="z-[80] flex overflow-hidden fixed right-5 top-5 rounded-md shadow-lg min-h-[2rem] items-center py-2 px-4 after:h-1 after:bottom-0 after:bg-gradient-to-r after:from-gray-600 after:to-gray-900 after:w-full after:absolute after:right-0 after:animate-interval"
  >
    <div>
      <i
        v-if="alertStore.type === 'error'"
        class="fa-solid fa-triangle-exclamation text-lg pr-2 text-yellow-500"
      ></i>
      <i v-else class="fa-regular fa-circle-check text-lg pr-2"></i>
    </div>
    <div
      class="flex-grow min-w-[15rem] flex items-center flex-col max-w-[28rem]"
    >
      <div v-if="alertStore.invalidToken" class="px-2">
        <p class="text-white text-lg">
          Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!
        </p>
        <div class="text-lg flex justify-center">
          <button
            @click="handleClick"
            class="p-2 hover:shadow-lg hover:text-white hover:bg-red-400"
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <p v-else class="px-2 text-white text-lg">
        {{ alertStore.alert }}
      </p>
    </div>
    <button @click="handleClose">
      <i
        class="fa-solid fa-xmark text-lg text-gray-400 hover:text-gray-700"
      ></i>
    </button>
  </div>
</template>
