<script setup></script>
<template>
  <div class="flex h-[24rem] flex-col items-center justify-center">
    <div
      class="mb-2 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-red-600"
    >
      <i class="fa-solid fa-xmark text-5xl text-red-600"></i>
    </div>
    <h1 class="text-4xl font-extrabold text-red-600">Thanh toán thất bại</h1>
    <p class="font-semibold">Đơn hàng của bạn đã bị hủy</p>
    <p class="font-semibold">Vui lòng thử lại</p>
    <div class="mt-4 space-x-4">
      <router-link
        :to="{ name: 'Home' }"
        class="bg-black px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
        >Quay lại trang chủ</router-link
      >

      <router-link
        :to="{ name: 'Checkout' }"
        class="bg-orange-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-700"
        >Thanh toán lại</router-link
      >
    </div>
  </div>
</template>
