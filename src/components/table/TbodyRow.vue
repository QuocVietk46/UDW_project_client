<script setup>
import { defineProps, reactive } from 'vue';

import { status } from '@/assets/data';
import ViewStar from '../star/ViewStar.vue';
import ModalProduct from '../modal/ModalProduct.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const changeStatus = reactive({
  isChange: false,
  preStatus: props.product.status,
  status: props.product.status,
  handleChange: (e) => {
    changeStatus.isChange = true;
    changeStatus.preStatus = changeStatus.status;
    changeStatus.status = e.target.value;
  },

  handleCancel: () => {
    changeStatus.status = changeStatus.preStatus;
    changeStatus.isChange = false;
  },

  handleConfirm: () => {
    changeStatus.isChange = false;
  },
});
</script>
<template>
  <tr>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
      <img
        :src="SERVER_URL + props.product.images[0]?.path"
        loading="lazy"
        class="max-w-[8rem]"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <ModalProduct :product="product">
        {{ props.product?.title }}
      </ModalProduct>
    </td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
      {{ props.product?.category }}
    </td>
    <td
      class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-center"
    >
      {{ props.product?.quantity }}
    </td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
      <ViewStar :star="props.product?.rate"></ViewStar>
    </td>
    <td
      class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-center"
    >
      {{ props.product?.price }}
    </td>
    <td
      class="relative py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-center"
    >
      <select
        class="p-2 group-hover:bg-gray-100 focus:outline-none"
        name="status"
        @change="changeStatus.handleChange"
        :value="changeStatus.status"
      >
        <option v-for="item in status" :value="item.value">
          {{ item.title }}
        </option>
      </select>
      <Transition name="fade">
        <div
          v-if="changeStatus.isChange"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 w-full flex justify-center gap-1"
        >
          <button
            class="p-2 rounded-xl bg-gray-200 hover:bg-gray-300"
            @click="changeStatus.handleCancel"
          >
            Huỷ
          </button>
          <button
            class="p-1 rounded-xl bg-gray-200 hover:bg-yellow-200"
            @click="changeStatus.handleConfirm"
          >
            Xác nhận
          </button>
        </div>
      </Transition>
    </td>
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
      {{ props.product?.date }}
    </td>
  </tr>
</template>

<style scoped></style>
