<script setup>
import { useRouter } from 'vue-router';

import { useAuth } from '../../hooks/useAuth';

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});

const router = useRouter();
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  router.push({ name: 'Login' });
};
</script>
<template>
  <div :class="class" class="relative group">
    <div class="cursor-pointer h-full w-full">
      <i class="fa-regular fa-user text-xl"></i>
    </div>
    <div
      class="invisible opacity-0 z-50 group-hover:visible group-hover:opacity-[1] absolute top-[100%] shadow-md bg-gray-300 text-black min-w-[15rem] translate-x-[-50%] rounded-sm custom-transition"
    >
      <div class="flex justify-between p-3">
        <router-link to="/login" class="text-black">Đăng nhập</router-link>
        <router-link to="/register" class="text-black">Đăng ký</router-link>
      </div>
      <div class="bg-slate-100">
        <ul>
          <li>
            <button class="hover:bg-slate-200 px-4 py-2 w-full text-left">
              Thông tin tài khoản
            </button>
          </li>
          <li>
            <button
              class="hover:bg-slate-200 px-4 py-2 w-full text-left"
              @click="handleLogout"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-transition {
  transition: visibility 0s, opacity 0.25s linear;
}
</style>
