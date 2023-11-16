<script>
export default {
  name: 'CartPage',
  inheritAttrs: false,
};
</script>

<script setup>
import { TransitionGroup, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import CartItem from '../components/cart/CartItem.vue';
import { useCartStore } from '@/stores/cartStore';
import CartTotal from '@/components/cart/CardTotal.vue';

const useCart = useCartStore();
const products = storeToRefs(useCart).products || [];
const isLoading = ref(false);
const subTotal = storeToRefs(useCart).subPrice || 0;

onMounted(async () => {
  isLoading.value = true;
  await useCart.getCart();
  isLoading.value = false;
});
</script>
<template>
  <div
    class="flex justify-center gap-2 py-3 min-h-[calc(100vh-314px)] px-64 bg-primary"
  >
    <!-- List cart -->
    <div class="flex-grow-[3] flex flex-col gap-2">
      <div class="p-6 font-medium text-lg mb-2 bg-white">
        <p>Giỏ hàng của bạn</p>
      </div>
      <div v-if="isLoading">loading...</div>
      <div v-else-if="products.length !== 0" class="px-6 bg-white">
        <TransitionGroup name="list" tag="ul">
          <li v-for="product in products" :key="product._id">
            <CartItem :product="product" />
          </li>
        </TransitionGroup>
      </div>
      <div v-else class="px-6 bg-white">
        <p class="text-center py-4 font-medium text-lg">
          Không có sản phẩm nào trong giỏ hàng
        </p>
      </div>
      <div class="p-6 text-right mt-2 bg-white">
        <p class="font-medium text-xl">
          Tạm tính:<span class="pl-14">{{
            subTotal?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
          }}</span>
        </p>
      </div>
    </div>

    <!-- Total -->
    <CartTotal></CartTotal>
  </div>
</template>
