<script setup>
import { storeToRefs } from 'pinia';

import TbodyRow from './TbodyRow.vue';
import { useProductsStore } from '@/stores/productsStore';

const productsStore = useProductsStore();

const products = storeToRefs(productsStore).products;
console.log(products.value);
const total = storeToRefs(productsStore).total;
const page = storeToRefs(productsStore).page.value;

const titleTable = [
  'Hình ảnh',
  'Tên sản phẩm',
  'Loại',
  'Số lượng',
  'Đánh giá',
  'Giá',
  'Giá khuyến mãi',
  'Trạng thái',
  'Ngày ra mắt',
];
</script>
<template>
  <div class="pt-10">
    <div class="flex flex-col">
      <table
        class="divide-y divide-gray-200 table-auto shadow-md sm:rounded-lg"
      >
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="item in titleTable"
              scope="col"
              class="text-sm text-center font-medium tracking-wider text-gray-700 uppercase"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <TbodyRow
            :product="product"
            v-for="product in products"
            class="group hover:bg-gray-100"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
