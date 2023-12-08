<script setup>
import { category, status } from "@/assets/data";
import ViewStar from "../rating/ViewStar.vue";
import ModalProduct from "../modal/ModalProduct.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <tr>
    <td
      class="relative whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
    >
      <img
        :src="SERVER_URL + product.images[0]?.path"
        loading="lazy"
        class="max-w-[8rem]"
      />
      <span
        v-if="product.sale"
        class="absolute left-6 top-7 bg-white px-2 py-1 opacity-80"
      >
        {{ product.sale }}%
      </span>
    </td>
    <td class="px-6 py-4 text-sm font-medium text-gray-500">
      <ModalProduct :product="product">
        {{ product?.title }}
      </ModalProduct>
    </td>
    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
      {{ category.find((item) => item.value === product.category).title }}
    </td>
    <td
      class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
    >
      {{ product?.quantity }}
    </td>
    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
      <ViewStar :star="product?.rate"></ViewStar>
    </td>
    <td
      class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
    >
      {{
        product.price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })
      }}
    </td>
    <td
      class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
    >
      {{
        (product.price - (product.sale / 100) * product.price).toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          },
        )
      }}
    </td>
    <td
      class="relative whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
    >
      {{ status.find((item) => item.value === product.status).title }}
    </td>
    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
      {{ new Date(product.createdAt).toLocaleDateString("vi-VN") }}
    </td>
  </tr>
</template>

<style scoped></style>
