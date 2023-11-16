<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { orderStatus } from '@/assets/data';
import { useOrderStore } from '@/stores/orderStore';

const useOrder = useOrderStore();
const orders = storeToRefs(useOrder).orders;
const active = ref('all');

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
    <nav class="bg-white select-none">
      <ul class="flex">
        <li
          v-for="status in orderStatus"
          :key="status.value"
          class="flex-grow text-center cursor-pointer py-3 transition-all duration-[150ms] ease-in-out"
          :class="{
            'text-green-400 border-b-2 border-green-400':
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
      <div class="bg-white divide-y-[1px]" v-for="order in orders">
        <section class="flex justify-between p-3" v-for="item in order.detail">
          <div class="relative">
            <img
              :src="SERVER_URL + item.product.images[0].path"
              alt=""
              class="w-20 h-20 object-cover"
            />
            <span
              v-if="item.sale > 0"
              class="absolute top-2 left-2 text-sm bg-white opacity-80"
              >{{ item.sale }}%</span
            >
          </div>
          <h4 class="font-medium">
            {{ item.product.title }}
          </h4>
          <div class="space-x-2">
            <span class="text-[#d01345] font-medium">
              {{
                (item.price - (item.sale / 100) * item.price).toLocaleString(
                  'it-IT',
                  {
                    style: 'currency',
                    currency: 'VND',
                  }
                )
              }}
            </span>
            <span
              v-if="item.sale > 0"
              class="relative text-sm text-[#d01345] before:w-full before:h-[1px] before:absolute before:top-1/2 before:left-0 before:bg-black before:opacity-80 before:-translate-y-1/2"
              >{{
                item.price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })
              }}</span
            >
          </div>
          <div>x{{ item.quantity }}</div>
        </section>
        <section class="p-3 space-y-2">
          <div class="flex justify-between items-center">
            <div class="space-x-2">
              <span class="font-medium">Tổng tiền:</span>
              <span class="text-[#d01345] font-medium">
                {{
                  order.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}
              </span>
            </div>

            <span>
              {{
                new Date(order.order_date).toLocaleString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
            </span>
          </div>
          <div class="flex justify-end">
            <span class="font-medium">
              {{
                order.status === 'pending'
                  ? 'Đang chờ xác nhận'
                  : order.status === 'confirmed'
                  ? 'Đã xác nhận'
                  : order.status === 'shipping'
                  ? 'Đang giao hàng'
                  : order.status === 'delivered'
                  ? 'Đã giao hàng'
                  : 'Đã huỷ'
              }}
            </span>

            <button
              v-if="order.status === 'pending'"
              class="text-white font-medium bg-black px-2 py-1 hover:bg-gray-500"
              @click="
                async () => await useOrder.updateOrder(order._id, 'cancel')
              "
            >
              Huỷ
            </button>

            <button
              v-if="order.status === 'shipping'"
              class="text-white font-medium bg-black px-2 py-1 hover:bg-gray-500"
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
