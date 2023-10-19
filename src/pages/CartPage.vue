<script>
export default {
  name: 'CartPage',
  inheritAttrs: false,
};
</script>

<script setup>
import { onMounted, ref, watch } from 'vue';

import CartItem from '../components/cart/CartItem.vue';
import { useCart } from '../hooks/useCart';

const { findCart } = useCart();
const products = ref([]);
const isLoading = ref(false);
const subTotal = ref(1111110);

onMounted(async () => {
  console.log('mounted');
  isLoading.value = true;
  const res = await findCart();
  if (!res) {
    isLoading.value = false;
    return;
  }
  products.value = res.cart.products;
  isLoading.value = false;
});
</script>
<template>
  <div
    class="grid grid-cols-5 gap-x-3 py-3 min-h-[calc(100vh-314px)] px-custom-2 bg-primary"
  >
    <div class="col-span-3 flex flex-col">
      <div class="p-6 font-medium text-lg mb-2 bg-white">
        <p>Giỏ hàng của bạn</p>
      </div>
      <div v-if="isLoading">loading...</div>
      <div
        v-else
        v-for="product in products"
        class="px-6 bg-white overflow-hidden"
      >
        <CartItem :product="product" />
      </div>
      <div class="p-6 text-right mt-2 bg-white">
        <p class="font-medium text-xl">
          Tạm tính:<span class="pl-14">{{ subTotal }}đ</span>
        </p>
      </div>
    </div>
    <div class="bg-white p-3 col-span-2 sticky top-3 h-fit">
      <div><h1>Tổng cộng</h1></div>
      <div>
        <div>
          <span>Tạm tính</span>
          <span>{{ subTotal }}đ</span>
        </div>
        <div>
          <span>Phí vận chuyển</span>
          <span>0đ</span>
        </div>
        <div>
          <span>Tổng cộng</span>
          <span>0đ</span>
        </div>
      </div>
    </div>
  </div>
</template>
