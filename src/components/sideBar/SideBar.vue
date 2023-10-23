<script setup>
import { useUserStore } from '@/stores/userStore';

const listNav = [
  {
    name: 'Dashboard',
    to: 'DashBoard',
    icon: 'fa-solid fa-home',
  },
  {
    name: 'Sản phẩm',
    to: 'ManagerProducts',
    icon: 'fa-solid fa-tshirt',
  },
  {
    name: 'Người dùng',
    to: 'ManagerUsers',
    icon: 'fa-solid fa-user',
  },
  {
    name: 'Đơn hàng',
    to: 'ManagerOrders',
    icon: 'fa-solid fa-shopping-bag',
  },
  {
    name: 'ManagerBanners',
    to: 'ManagerBanners',
    icon: 'fa-solid fa-image',
  },
];

const handleLogout = () => {
  const userStore = useUserStore();
  userStore.logout();
};
</script>
<template>
  <section class="bg-white py-4 select-none text-gray-900">
    <div class="flex flex-col justify-between h-full">
      <div>
        <h1 class="text-center text-2xl font-bold pb-10">LOGO</h1>
        <ul class="flex flex-col pl-4">
          <li
            v-for="nav in listNav"
            :class="{
              'bg-primary text-secondary before:absolute before:h-1/2 before:w-1 before:bg-violet-700 before:top-0 before:left-[-1rem] before:translate-y-1/2':
                nav.to === $route.name,
            }"
            class="relative text-lg cursor-pointer rounded-l-3xl hover:bg-primary hover:scale-110 transition-all duration-250"
          >
            <router-link class="px-4 py-3 block" :to="{ name: nav.to }">
              <i :class="nav.icon" class="pr-4 w-10"></i>
              <span class="">{{ nav.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <button
          @click="handleLogout"
          class="w-full p-2 text-center hover:bg-primary hover:scale-110 transition-all duration-250"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </section>
</template>
