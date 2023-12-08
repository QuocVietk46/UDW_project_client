<script setup>
import { useRoute } from "vue-router";

import { useOrderStore } from "@/stores/orderStore";
import { bankcode } from "@/assets/data";

const route = useRoute();
const useOrder = useOrderStore();
const order = useOrder.getOrder(route.params.id);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <section class="bg-white" v-if="order">
    <div class="flex justify-between p-3" v-for="item in order.detail">
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
    </div>
    <div class="space-y-2 p-3">
      <div class="flex justify-between">
        <div>
          <span class="font-medium">Mã đơn hàng:</span>
          <span class="pl-2">{{ order._id }}</span>
        </div>
      </div>

      <div>
        <span class="font-medium">Địa chỉ nhận hàng:</span>
        <span class="pl-2">{{ order.address }}</span>
      </div>
      <div>
        <span class="font-medium">Số điện thoại:</span>
        <span class="pl-2">{{ order.phone }}</span>
      </div>

      <div>
        <span class="font-medium">Phương thức thanh toán:</span>
        <span class="pl-2">{{
          order.payment === "COD"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán qua VNPay"
        }}</span>
      </div>

      <div class="bg-gray-200 py-1 pl-4" v-if="order.detail_payment">
        <div>
          <span class="font-medium">Mã giao dịch:</span>
          <span class="pl-2">{{ order.detail_payment.bank_tran_no }}</span>
        </div>
        <div>
          <span class="font-medium">Loại thẻ:</span>
          <span class="pl-2">{{ order.detail_payment.card_type }}</span>
        </div>
        <div>
          <span class="font-medium">Ngân hàng:</span>
          <span class="pl-2">{{
            bankcode.find(
              (item) => item.value === order.detail_payment.bank_code,
            ).title
          }}</span>
        </div>
        <div>
          <span class="font-medium">Ngày thanh toán:</span>
          <span class="pl-2">{{
            // yyyymmddhhmmss is number
            new Date(
              order.detail_payment.pay_date.toString().slice(0, 4),
              order.detail_payment.pay_date.toString().slice(4, 6) - 1,
              order.detail_payment.pay_date.toString().slice(6, 8),
              order.detail_payment.pay_date.toString().slice(8, 10),
              order.detail_payment.pay_date.toString().slice(10, 12),
              order.detail_payment.pay_date.toString().slice(12, 14),
            ).toLocaleString("vi-VN", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</span>
        </div>
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
          @click="async () => await useOrder.updateOrder(order._id, 'cancel')"
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
    </div>
  </section>
</template>
