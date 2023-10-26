<script setup>
import TbodyRow from './TbodyRow.vue';

const props = defineProps({
  products: {
    type: Array,
    default: [],
  },
});

const titleTable = [
  'Hình ảnh',
  'Tên sản phẩm',
  'Loại',
  'Số lượng',
  'Đánh giá',
  'Giá',
  'Trạng thái',
  'Ngày ra mắt',
];
</script>
<template>
  <div class="mx-auto pt-10">
    <div class="flex flex-col">
      <div class="shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <table class="min-w-full divide-y divide-gray-200 table-fixed">
            <thead class="bg-gray-100">
              <tr>
                <th
                  v-for="item in titleTable"
                  scope="col"
                  class="py-3 px-6 text-xs text-center font-medium tracking-wider text-gray-700 uppercase"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <TbodyRow
                :product="product"
                v-for="product in props.products"
                class="group hover:bg-gray-100"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
