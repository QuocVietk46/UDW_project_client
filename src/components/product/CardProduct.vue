<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { addProductToCart } = useCartStore();
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const router = useRouter();

const handleAddCart = async () => {
  console.log("Add to cart", props.product._id);
  await addProductToCart({ productId: props.product._id });
};

const handleRedirect = () => {
  router.push({ name: "Product", params: { id: props.product._id } });
};
</script>
<template>
  <div class="group flex cursor-pointer select-none flex-col shadow-md">
    <div class="relative overflow-hidden">
      <img
        :src="SERVER_URL + product.images[0]?.path"
        class="object-cover"
        @click="handleRedirect"
      />
      <div v-if="product.sale" class="absolute left-0 top-4">
        <p class="bg-white bg-opacity-50 px-2 text-sm">-{{ product.sale }}%</p>
      </div>
      <div
        @click="handleAddCart"
        class="absolute bottom-[-50px] right-4 z-10 duration-300 group-hover:bottom-4"
      >
        <i
          class="fa-solid fa-plus h-10 w-10 rounded-full bg-white bg-opacity-80 p-2 text-center text-2xl text-gray-600 shadow-md hover:bg-gray-500 hover:bg-opacity-80 hover:text-white"
        ></i>
      </div>
    </div>
    <div class="flex flex-grow flex-col bg-white p-2" @click="handleRedirect">
      <h3 class="flex-grow">{{ product.title }}</h3>
      <p>
        <span class="pr-2 text-lg text-[#d01345]" v-if="product.sale > 0">
          {{
            (
              product.price -
              product.price * (product.sale / 100)
            ).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}
        </span>
        <span
          :class="
            product.sale > 0 &&
            'relative text-base text-[#d01345] opacity-80 before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:bg-black before:opacity-80'
          "
        >
          {{
            product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          }}
        </span>
      </p>
    </div>
  </div>
</template>
