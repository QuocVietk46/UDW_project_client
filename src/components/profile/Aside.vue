<script setup></script>
<template>
  <aside class="text-lg py-4">
    <div class="pb-4">
      <router-link :to="{ name: 'ProfileAccount' }" class="hover:text-blue-700"
        >Tài khoản của tôi</router-link
      >
      <ul class="pl-6">
        <li>Hồ sơ</li>
        <li>Địa chỉ</li>
      </ul>
    </div>
    <div>
      <router-link :to="{ name: 'ProfileOrder' }" class="hover:text-blue-700"
        >Đơn mua</router-link
      >
    </div>
  </aside>
</template>

<style scoped></style>
