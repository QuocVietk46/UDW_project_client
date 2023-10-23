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

const handleAddCart = async () => {
  console.log('Add to cart', props.product._id);
  await addProductToCart({ productId: props.product._id });
};
</script>
<template>
  <div class="flex flex-col shadow-2xl cursor-pointer select-none group">
    <div class="relative overflow-hidden">
      <img
        :src="'http://localhost:3000' + props.product.images[0].path"
        class="w-[316px] h-[404px] object-cover"
      />
      <div v-if="props.product.sale" class="absolute top-4 left-0">
        <p class="bg-white bg-opacity-50 px-2 text-sm">
          -{{ props.product.sale * 100 }}%
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
      <h3 class="flex-grow">{{ props.product.title }}</h3>
      <p>{{ props.product.price }}</p>
    </div>
  </div>
</template>
