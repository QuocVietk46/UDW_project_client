<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { orderStatus } from "@/assets/data";
import { useOrderStore } from "@/stores/orderStore";

const useOrder = useOrderStore();
const orders = storeToRefs(useOrder).orders;
const active = ref("all");

watch(active, async () => {
  await useOrder.getOrders(active.value);
});

onMounted(async () => {
  await useOrder.getOrders();
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div class="space-y-2">
    <nav class="select-none bg-white">
      <ul class="flex">
        <li
          v-for="status in orderStatus"
          :key="status.value"
          class="flex-grow cursor-pointer py-3 text-center transition-all duration-[150ms] ease-in-out"
          :class="{
            'border-b-2 border-green-400 text-green-400':
              active === status.value,
            'text-gray-600': active !== status.value,
          }"
          @click="active = status.value"
        >
          {{ status.title }}
        </li>
      </ul>
    </nav>
    <section class="space-y-2">
      <div class="divide-y-[1px] bg-white" v-for="order in orders">
        <section class="flex justify-between p-3" v-for="item in order.detail">
          <div class="relative">
            <img
              :src="SERVER_URL + item.product.images[0].path"
              alt=""
              class="h-20 w-20 object-cover"
            />
            <span
              v-if="item.sale > 0"
              class="absolute left-2 top-2 bg-white text-sm opacity-80"
              >{{ item.sale }}%</span
            >
          </div>
          <h4 class="font-medium">
            {{ item.product.title }}
          </h4>
          <div class="space-x-2">
            <span class="font-medium text-[#d01345]">
              {{
                (item.price - (item.sale / 100) * item.price).toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                  },
                )
              }}
            </span>
            <span
              v-if="item.sale > 0"
              class="relative text-sm text-[#d01345] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:-translate-y-1/2 before:bg-black before:opacity-80"
              >{{
                item.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}</span
            >
          </div>
          <div>x{{ item.quantity }}</div>
        </section>
        <section class="space-y-2 p-3">
          <div class="flex justify-between">
            <div>
              <span class="font-medium">Mã đơn hàng:</span>
              <span class="pl-2">{{ order._id }}</span>
            </div>
            <router-link
              class="font-medium text-blue-600 hover:text-blue-800"
              :to="{ name: 'OrderDetail', params: { id: order._id } }"
              >Chi tiết</router-link
            >
          </div>
          <div class="flex items-center justify-between">
            <div class="space-x-2">
              <span class="font-medium">Tổng tiền:</span>
              <span class="font-medium text-[#d01345]">
                {{
                  order.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </span>
            </div>

            <p>
              <span class="font-medium">Ngày đặt:</span>
              {{
                new Date(order.order_date).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
          </div>
          <div class="flex justify-between" v-if="order.delivery_date">
            <div></div>
            <p>
              <span class="font-medium">Ngày nhận:</span>
              {{
                new Date(order.delivery_date).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
          </div>
          <div class="flex justify-end">
            <span class="font-medium">
              {{
                order.status === "pending"
                  ? "Đang chờ xác nhận"
                  : order.status === "confirmed"
                  ? "Đã xác nhận"
                  : order.status === "shipping"
                  ? "Đang giao hàng"
                  : order.status === "delivered"
                  ? "Đã nhận hàng"
                  : "Đã huỷ"
              }}
            </span>

            <button
              v-if="order.status === 'pending'"
              class="bg-black px-2 py-1 font-medium text-white hover:bg-gray-500"
              @click="
                async () => await useOrder.updateOrder(order._id, 'cancel')
              "
            >
              Huỷ
            </button>

            <button
              v-if="order.status === 'shipping'"
              class="bg-black px-2 py-1 font-medium text-white hover:bg-gray-500"
              @click="
                async () => await useOrder.updateOrder(order._id, 'delivered')
              "
            >
              Đã nhận hàng
            </button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
