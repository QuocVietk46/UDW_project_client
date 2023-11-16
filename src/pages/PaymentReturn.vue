<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  await orderStore.addOrder({
    full_name: route.query.full_name,
    phone: route.query.phone,
    address: route.query.address,
    payment: route.query.payment,
  });
  isLoading.value = false;
  router.push({ name: 'Thanks' });
});
console.log(route.query);
</script>
<template>
  <div v-if="isLoading">
    <h1>Bạn đã thanh toán thành công</h1>
    <p>Đang xử lý đơn hàng vui lòng chờ trong giây lát</p>
  </div>
</template>
