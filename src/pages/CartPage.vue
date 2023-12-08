<script>
export default {
  name: "CartPage",
  inheritAttrs: false,
};
</script>

<script setup>
import { TransitionGroup, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import CartItem from "../components/cart/CartItem.vue";
import { useCartStore } from "@/stores/cartStore";
import CartTotal from "@/components/cart/CardTotal.vue";

const useCart = useCartStore();
const products = storeToRefs(useCart).products;
const isLoading = ref(false);
const subTotal = storeToRefs(useCart).subPrice;

onMounted(async () => {
  isLoading.value = true;
  await useCart.getCart();
  isLoading.value = false;
});
</script>
<template>
  <div
    class="flex min-h-[calc(100vh-314px)] justify-center gap-2 bg-primary px-64 py-3"
  >
    <!-- List cart -->
    <div class="flex flex-grow-[3] flex-col gap-2">
      <div class="mb-2 bg-white p-6 text-lg font-medium">
        <p>Giỏ hàng của bạn</p>
      </div>
      <div v-if="isLoading">loading...</div>
      <div v-else-if="products[0]?.product.title" class="bg-white px-6">
        {{ console.log({ products }) }}
        <TransitionGroup name="list" tag="ul">
          <li v-for="product in products" :key="product._id">
            <CartItem :product="product" />
          </li>
        </TransitionGroup>
      </div>
      <div v-else class="bg-white px-6">
        <p class="py-4 text-center text-lg font-medium">
          Không có sản phẩm nào trong giỏ hàng
        </p>
      </div>
      <div class="mt-2 bg-white p-6 text-right">
        <p class="text-xl font-medium">
          Tạm tính:<span class="pl-14">{{
            subTotal?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}</span>
        </p>
      </div>
    </div>

    <!-- Total -->
    <CartTotal></CartTotal>
  </div>
</template>
