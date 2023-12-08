<script setup>
import { onMounted, ref } from "vue";

import TotalOrders from "../../components/dashboard/totalOrders/TotalOrders.vue";
import TotalProducts from "../../components/dashboard/totalProducts/TotalProducts.vue";
import { useUserStore } from "@/stores/userStore";
import { getDataAPI } from "@/utils/fetchData";

const userStore = useUserStore();

const order = ref({});
const product = ref({});
const profit = ref(0);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await getDataAPI({ url: "admin", token: userStore.token });
    console.log(res.data);
    order.value = res.data.order;
    product.value = res.data.product;
    profit.value = res.data.profitMonth;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
});
</script>
<template>
  <section class="h-screen bg-primary">
    <div
      class="grid grid-rows-[repeat(4,calc((100vh/4)-20px))] gap-4 p-4"
      v-if="!isLoading"
    >
      <TotalOrders :order-total="order" />
      <TotalProducts :product-total="product" />
      <div class="rounded-2xl bg-white p-5">
        <div>
          <h1 class="pb-2 text-2xl font-bold">Doanh thu tháng này</h1>
          <h1 class="text-4xl font-bold text-[#d01345]">
            {{
              profit.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>
