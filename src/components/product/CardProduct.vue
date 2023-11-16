<script setup>
import { defineProps } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { addProductToCart } = useCartStore();
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const handleAddCart = async () => {
  console.log('Add to cart', props.product._id);
  await addProductToCart({ productId: props.product._id });
};
</script>
<template>
  <router-link :to="`/products/${product._id}`">
    <div class="flex flex-col shadow-md cursor-pointer select-none group">
      <div class="relative overflow-hidden">
        <img
          :src="SERVER_URL + product.images[0].path"
          class="w-[316px] h-[404px] object-cover"
        />
        <div v-if="product.sale" class="absolute top-4 left-0">
          <p class="bg-white bg-opacity-50 px-2 text-sm">
            -{{ product.sale }}%
          </p>
        </div>
        <div
          @click="handleAddCart"
          class="absolute z-10 bottom-[-50px] group-hover:bottom-4 right-4 duration-300"
        >
          <i
            class="fa-solid fa-plus text-2xl bg-white bg-opacity-80 shadow-md w-10 h-10 text-center text-gray-600 p-2 rounded-full hover:text-white hover:bg-gray-500 hover:bg-opacity-80"
          ></i>
        </div>
      </div>
      <div class="flex-grow flex flex-col p-2">
        <h3 class="flex-grow">{{ product.title }}</h3>
        <p>
          <span class="pr-2 text-lg text-[#d01345]" v-if="product.sale > 0">
            {{
              (
                product.price -
                product.price * (product.sale / 100)
              ).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })
            }}
          </span>
          <span
            :class="
              product.sale > 0 &&
              'relative text-[#d01345] text-base opacity-80 before:absolute before:opacity-80 before:h-[2px] before:bg-black before:top-1/2 before:left-0 before:w-full'
            "
          >
            {{
              product.price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })
            }}
          </span>
        </p>
      </div>
    </div>
  </router-link>
</template>
