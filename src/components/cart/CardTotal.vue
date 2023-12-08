<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const props = defineProps({
  title_button: {
    type: String,
    default: "Đặt hàng",
  },
});

const router = useRouter();
const useCart = useCartStore();
const error = storeToRefs(useCart).error || false;
const products = storeToRefs(useCart).products || [];
const price = storeToRefs(useCart).price || 0;
const subTotal = storeToRefs(useCart).subPrice || 0;
const vat = storeToRefs(useCart).vat || 0;

const handleCheckout = () => {
  if (error === true || products.length === 0) {
    return;
  }
  router.push({ name: "Checkout" });
};
</script>
<template>
  <div class="sticky top-3 col-span-3 h-fit bg-white p-3">
    <h1 class="text-lg font-bold">Tổng cộng</h1>
    <div class="space-y-2 py-4">
      <div>
        <span>Tạm tính:</span>
        <span class="text-price px-2 text-lg font-bold">{{
          subTotal.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        }}</span>
        <span
          v-if="price !== subTotal"
          class="text-price relative opacity-80 before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:bg-black before:opacity-80"
        >
          {{
            price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}
        </span>
      </div>
      <div>
        <p>
          Phí vận chuyển:
          <span v-if="products.length > 0" class="text-price p-2">{{
            Number(30000).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}</span>
          <span v-else class="text-price p-2">{{
            Number(0).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}</span>
        </p>
      </div>
      <div>
        <p>
          Thuế VAT (10%):
          <span class="text-price p-2">{{
            vat.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}</span>
        </p>
      </div>
      <div>
        <span>Tổng cộng:</span>
        <span
          v-if="products.length > 0"
          class="text-price p-2 text-xl font-bold"
          >{{
            (subTotal + 30000).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}</span
        >
        <span v-else class="text-price p-2 text-xl font-bold">{{
          Number(0).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        }}</span>
      </div>
    </div>
    <div class="pt-3">
      <button
        @click="handleCheckout"
        class="w-full select-none bg-black p-2 text-white hover:bg-gray-500 hover:shadow-md"
        :class="
          (error || products.length === 0) && 'pointer-events-none opacity-50'
        "
      >
        <i class="fa-solid fa-shopping-bag text-xl"></i>
        <span class="pl-2">{{ title_button }}</span>
      </button>
    </div>
  </div>
</template>
