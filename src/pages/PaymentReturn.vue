<script setup>
import { useRoute, useRouter } from "vue-router";
import { useOrderStore } from "@/stores/orderStore";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  const res = await orderStore.addOrder(
    {
      full_name: route.query.full_name,
      phone: route.query.phone,
      address: route.query.address,
      payment: route.query.payment,
    },
    {
      vnp_Amount: route.query.vnp_Amount,
      vnp_BankCode: route.query.vnp_BankCode,
      vnp_BankTranNo: route.query.vnp_BankTranNo,
      vnp_CardType: route.query.vnp_CardType,
      vnp_PayDate: route.query.vnp_PayDate,
      vnp_ResponseCode: route.query.vnp_ResponseCode,
    },
  );
  isLoading.value = false;
  console.log(res);
  if (res === false) {
    router.push({ name: "ErrorPayment" });
    console.log("error");
    return;
  }
  console.log("success");
  router.push({ name: "Thanks" });
});
console.log(route.query);
</script>
<template>
  <div v-if="isLoading">
    <h1>Bạn đã thanh toán thành công</h1>
    <p>Đang xử lý đơn hàng vui lòng chờ trong giây lát</p>
  </div>
</template>
