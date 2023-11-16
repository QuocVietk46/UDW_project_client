<script setup></script>
<template>
  <div class="relative">
    <img src="src/assets/thanks.png" class="mx-auto opacity-50" />
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <h1 class="text-4xl font-medium p-5">Cảm ơn bạn đã mua hàng</h1>
      <router-link
        :to="{ name: 'Home' }"
        class="font-medium text-2xl bg-blue-200 px-4 py-2 hover:bg-blue-300 block w-fit mx-auto"
        >Trở về trang chủ</router-link
      >
    </div>
  </div>
</template>
