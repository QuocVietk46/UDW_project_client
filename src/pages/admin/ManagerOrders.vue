<script setup>
import { storeToRefs } from "pinia";
import { onActivated, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { orderStatus } from "@/assets/data";
import { useOrderStore } from "@/stores/orderStore";
import OrderCard from "@/components/order/OrderCard.vue";

const route = useRoute();
const router = useRouter();
const useOrder = useOrderStore();
const orders = storeToRefs(useOrder).orders;

const active = ref("all");

const handleClicked = async (status) => {
  active.value = status;
  await useOrder.getOrdersAdmin(active.value);
  router.push({
    query: {
      status: status,
    },
  });
};

const fetchOrders = async () => {
  await useOrder.getOrdersAdmin(active.value);
};

onActivated(async () => {
  active.value = route.query.status || "all";
  fetchOrders;
  console.log(orders.value);
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div class="min-h-[100vh] space-y-4 bg-primary p-4">
    <nav class="select-none bg-white">
      <ul class="flex">
        <li
          v-for="status in orderStatus"
          :key="status.value"
          class="flex-grow cursor-pointer py-3 text-center transition-all duration-[150ms] ease-in-out"
          :class="{
            'border-b-2 border-green-400 text-green-400':
              active === status.value,
            'text-gray-600': active !== status.value,
          }"
          @click="handleClicked(status.value)"
        >
          {{ status.title }}
        </li>
      </ul>
    </nav>
    <section class="space-y-2">
      <div class="divide-y-[1px] bg-white" v-for="order in orders">
        <OrderCard :order="order"></OrderCard>
      </div>
    </section>
  </div>
</template>
