<script setup>
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
import { useRouter, useRoute } from "vue-router";

import { useUserStore } from "@/stores/userStore";
import { getDataAPI } from "@/utils/fetchData";
import { months, years } from "@/assets/data";

const productsSell = ref([]);
const useUser = useUserStore();
const table = ref();
const router = useRouter();
const route = useRoute();

const getProducts = async (
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
) => {
  try {
    router.push({
      query: {
        month,
        year,
      },
    });
    const res = await getDataAPI({
      url: `admin/profit?month=${month}&year=${year}`,
      token: useUser.token,
    });
    console.log(res.data);
    productsSell.value = res.data.products;
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = (values) => {
  getProducts(values.target.month.value, values.target.year.value);
};

const handleExport = () => {
  // export from table get to ref to xlsx
  console.log(table.value);
  const wb = XLSX.utils.table_to_book(table.value);
  XLSX.writeFile(wb, `doanh_thu_${route.query.month}_${route.query.year}.xlsx`);
};

onMounted(() => {
  getProducts();
});
</script>
<template>
  <div>
    <div class="bg-white py-5">
      <h1 class="text-center text-2xl font-bold">Doanh thu</h1>
    </div>
    <section class="flex justify-center p-4">
      <form @submit.prevent="handleSubmit" class="flex items-center">
        <select name="month" class="p-2">
          <option
            v-for="month in months"
            :value="month.value"
            :selected="month.value === new Date().getMonth() + 1"
          >
            {{ month.title }}
          </option>
        </select>
        <select name="year" class="border-x-2 p-2">
          <option
            v-for="year in years"
            :value="year"
            :selected="year === new Date().getFullYear()"
          >
            {{ year }}
          </option>
        </select>
        <button
          type="submit"
          class="h-full bg-white px-4 transition-all hover:scale-110 hover:bg-gray-100"
        >
          Tìm
        </button>
      </form>
    </section>
    <table class="table-striped mx-auto table bg-white" ref="table">
      <thead>
        <tr>
          <th colspan="5" class="p-2 text-center text-xl font-semibold">
            Doanh thu tháng {{ route.query.month }} năm {{ route.query.year }}
          </th>
        </tr>
        <tr>
          <th scope="col" class="px-5 py-4">Tên sản phẩm</th>
          <th scope="col" class="px-5 py-4">Số lượng</th>
          <th scope="col" class="px-5 py-4">Giá</th>
          <th scope="col" class="px-5 py-4">Giảm giá</th>
          <th scope="col" class="px-5 py-4">Tổng giá</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="productsSell.length !== 0"
          v-for="(item, index) in productsSell"
          :key="index"
          :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
        >
          <td>{{ item.product.title }}</td>
          <td class="p-4 text-center">{{ item.quantity }}</td>
          <td>
            {{
              item.product.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
          <td class="p-4 text-center">{{ item.sale }}%</td>
          <td class="p-4 text-center">
            {{
              (
                item.product.price *
                item.quantity *
                item.sale *
                0.01
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
        </tr>

        <tr v-if="productsSell.length === 0" class="bg-white">
          <td colspan="5" class="px-32 py-24 text-center text-lg">
            Không sản phẩm nào được bán vào thời gian này!
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-t-2 text-lg font-medium">
          <td colspan="3" class="py-4">Tổng doanh thu</td>
          <td colspan="2">
            Tổng giá - Thuế 10%:
            <span class="text-price">
              {{
                (
                  productsSell.reduce(
                    (acc, cur) =>
                      acc +
                      cur.product.price *
                        cur.quantity *
                        (100 - cur.sale) *
                        0.01,
                    0,
                  ) * 0.9
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="flex justify-end pr-6">
      <button
        class="duration-250 bg-black px-4 py-2 font-medium text-white transition-all hover:bg-gray-700 hover:shadow-sm"
        @click="handleExport"
      >
        Xuất XLSX
      </button>
    </div>
  </div>
</template>
