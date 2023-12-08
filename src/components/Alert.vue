<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useAlertStore } from "@/stores/alertStore";

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
  router.push({ name: "Login" });
};

onMounted(() => {
  timeout = setTimeout(() => {
    alertStore.setAlert("");
  }, 30000);
});
</script>
<template>
  <div
    :class="{
      'bg-red-500': alertStore.type === 'error',
      'bg-green-500': alertStore.type === 'success',
    }"
    class="fixed right-5 top-5 z-[80] flex min-h-[2rem] items-center overflow-hidden rounded-md px-4 py-2 shadow-lg after:absolute after:bottom-0 after:right-0 after:h-1 after:w-full after:animate-interval after:bg-gradient-to-r after:from-gray-600 after:to-gray-900"
  >
    <div>
      <i
        v-if="alertStore.type === 'error'"
        class="fa-solid fa-triangle-exclamation pr-2 text-lg text-yellow-500"
      ></i>
      <i v-else class="fa-regular fa-circle-check pr-2 text-lg"></i>
    </div>
    <div
      class="flex min-w-[15rem] max-w-[28rem] flex-grow flex-col items-center"
    >
      <div v-if="alertStore.invalidToken" class="px-2">
        <p class="text-lg text-white">
          Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!
        </p>
        <div class="flex justify-center text-lg">
          <button
            @click="handleClick"
            class="p-2 hover:bg-red-400 hover:text-white hover:shadow-lg"
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <p v-else class="px-2 text-lg text-white">
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
