<script setup>
import { ref, onMounted } from "vue";

import { getDataAPI } from "@/utils/fetchData";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const users = ref([]);

const fetchUsers = async () => {
  try {
    const res = await getDataAPI({
      url: "admin/users",
      token: userStore.userId,
    });
    return res.data.users;
  } catch (err) {
    console.log(err);
    return [];
  }
};

onMounted(async () => {
  users.value = await fetchUsers();
  console.log(users.value);
});
</script>
<template>
  <div class="flex flex-col p-4">
    <div class="mb-4 bg-white p-3">
      <h1 class="text-center text-xl font-medium">Danh sách người dùng</h1>
    </div>
    <table class="bg-white">
      <thead>
        <tr>
          <th class="py-2">STT</th>
          <th class="py-2">Tên người dùng</th>
          <th class="py-2">Email</th>
          <th class="py-2">Số điện thoại</th>
          <th class="py-2">Chờ xử lý</th>
          <th class="py-2">Đang giao</th>
          <th class="py-2">Đã giao</th>
          <th class="py-2">Đã hủy</th>
          <th class="py-2">Tổng đơn</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user._id"
          :class="index % 2 === 0 && 'bg-gray-100'"
          class="border-b border-gray-200"
        >
          <td class="py-3 text-center">{{ index }}</td>
          <td class="py-3">{{ user.full_name }}</td>
          <td class="py-3">{{ user.email }}</td>
          <td class="py-3">{{ user?.phone }}</td>
          <td class="py-3 text-center">{{ user.countOrderPending }}</td>
          <td class="py-3 text-center">{{ user.countOrderShipping }}</td>
          <td class="py-3 text-center">{{ user.countOrderDelivered }}</td>
          <td class="py-3 text-center">{{ user.countOrderCancel }}</td>
          <td class="py-3 text-center">{{ user.countOrder }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
