<script setup>
import { storeToRefs } from "pinia";

import TbodyRow from "./TbodyRow.vue";
import { useProductsStore } from "@/stores/productsStore";

const productsStore = useProductsStore();

const products = storeToRefs(productsStore).products;
console.log(products);
const total = storeToRefs(productsStore).total;
const page = storeToRefs(productsStore).page.value;

const titleTable = [
  "Hình ảnh",
  "Tên sản phẩm",
  "Loại",
  "Số lượng",
  "Đánh giá",
  "Giá",
  "Giá khuyến mãi",
  "Trạng thái",
  "Ngày ra mắt",
];
</script>
<template>
  <div class="pt-10">
    <div class="flex flex-col">
      <table
        class="table-auto divide-y divide-gray-200 shadow-md sm:rounded-lg"
      >
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="item in titleTable"
              scope="col"
              class="text-center text-sm font-medium uppercase tracking-wider text-gray-700"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white" v-if="products && products.length > 0">
          <TbodyRow
            :product="product"
            v-for="product in products"
            class="group hover:bg-gray-100"
          />
        </tbody>
        <tbody class="bg-white" v-else>
          <tr>
            <td
              class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-900"
              colspan="9"
            >
              Không có sản phẩm nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
