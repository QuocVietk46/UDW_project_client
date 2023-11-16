<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cartStore';

const props = defineProps({
  title_button: {
    type: String,
    default: 'Đặt hàng',
  },
});

const useCart = useCartStore();
const products = storeToRefs(useCart).products || [];
const price = storeToRefs(useCart).price || 0;
const subTotal = storeToRefs(useCart).subPrice || 0;
</script>
<template>
  <div class="col-span-3 bg-white p-3 sticky top-3 h-fit">
    <h1 class="font-bold text-lg">Tổng cộng</h1>
    <div class="py-4">
      <div>
        <span>Tạm tính:</span>
        <span class="px-2 text-lg font-bold text-[#d01345]">{{
          subTotal.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })
        }}</span>
        <span
          v-if="price !== subTotal"
          class="relative text-[#d01345] opacity-80 before:absolute before:opacity-80 before:h-[2px] before:bg-black before:top-1/2 before:left-0 before:w-full"
        >
          {{
            price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
          }}
        </span>
      </div>
      <div>
        <p>
          Phí vận chuyển:
          <span v-if="products.length > 0" class="p-2">{{
            Number(30000).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
          }}</span>
          <span v-else>{{
            Number(0).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
          }}</span>
        </p>
      </div>
      <div>
        <span>Tổng cộng:</span>
        <span
          v-if="products.length > 0"
          class="p-2 text-[#d01345] text-xl font-bold"
          >{{
            (subTotal + 30000).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })
          }}</span
        >
        <span v-else class="p-2 text-[#d01345] text-xl font-bold">{{
          Number(0).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })
        }}</span>
      </div>
    </div>
    <div class="pt-3">
      <button
        @click="() => $router.push({ name: 'Checkout' })"
        class="w-full p-2 bg-black text-white hover:bg-gray-500 hover:shadow-md"
      >
        <i class="fa-solid fa-shopping-bag text-xl"></i>
        <span class="pl-2">{{ title_button }}</span>
      </button>
    </div>
  </div>
</template>
