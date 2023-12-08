<script setup>
import { useUserStore } from "@/stores/userStore";

const listNav = [
  {
    name: "Dashboard",
    to: "DashBoard",
    icon: "fa-solid fa-home",
  },
  {
    name: "Sản phẩm",
    to: "ManagerProducts",
    icon: "fa-solid fa-tshirt",
  },
  {
    name: "Người dùng",
    to: "ManagerUsers",
    icon: "fa-solid fa-user",
  },
  {
    name: "Đơn hàng",
    to: "ManagerOrders",
    icon: "fa-solid fa-shopping-bag",
  },
  {
    name: "Doanh thu",
    to: "ManagerProfit",
    icon: "fa-solid fa-image",
  },
];

const handleLogout = () => {
  const userStore = useUserStore();
  userStore.logout();
};
</script>
<template>
  <section class="select-none bg-white py-4 text-gray-900">
    <div class="flex h-full flex-col justify-between">
      <div>
        <!-- <h1 class="pb-10 text-center text-2xl font-bold"></h1> -->
        <div class="flex justify-center pb-4">
          <img src="/public/logo.jpg" alt="" class="h-32" />
        </div>
        <ul class="flex flex-col pl-4">
          <li
            v-for="nav in listNav"
            :class="{
              'bg-primary text-secondary before:absolute before:left-[-1rem] before:top-0 before:h-1/2 before:w-1 before:translate-y-1/2 before:bg-violet-700':
                nav.to === $route.name,
            }"
            class="duration-250 relative cursor-pointer rounded-l-3xl text-lg transition-all hover:scale-110 hover:bg-primary"
          >
            <router-link class="block px-4 py-3" :to="{ name: nav.to }">
              <i :class="nav.icon" class="w-10 pr-4"></i>
              <span class="">{{ nav.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <button
          @click="handleLogout"
          class="duration-250 w-full p-2 text-center transition-all hover:scale-110 hover:bg-primary"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </section>
</template>
