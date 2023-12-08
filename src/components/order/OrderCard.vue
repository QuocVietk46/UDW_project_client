<script setup>
const props = defineProps({
  order: Object,
});

import { ref } from "vue";

import { useOrderStore } from "@/stores/orderStore";
import { bankcode } from "@/assets/data";
import { generatePDF } from "@/hook/exportInvoicePdf";

const useOrder = useOrderStore();
const showMore = ref(false);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div>
    <!-- Product list -->
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
    <!-- info order -->
    <Transition name="fade">
      <section v-if="showMore" class="space-y-2 p-3">
        <table>
          <tr>
            <td class="pl-4 text-right font-medium">Mã đơn hàng</td>
            <td class="pl-8">{{ order._id }}</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Tên khách hàng</td>
            <td class="pl-8">{{ order.full_name }}</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Ngày đặt hàng</td>
            <td class="pl-8">
              {{
                new Date(order.order_date).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </td>
          </tr>
          <tr v-if="order.delivery_date">
            <td class="pl-4 text-right font-medium">Ngày nhận hàng</td>
            <td class="pl-8">
              {{
                new Date(order.delivery_date).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Địa chỉ</td>
            <td class="pl-8">{{ order.address }}</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Số điện thoại</td>
            <td class="pl-8">{{ order.phone }}</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Phương thức thanh toán</td>
            <td class="pl-8">
              {{
                order.payment === "COD"
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán qua VNPay"
              }}
            </td>
          </tr>
          <!-- payment detail -->
          <tr>
            <td
              class="p-2 text-right text-lg font-bold"
              v-if="order.detail_payment"
            >
              Chi tiết thanh toán
            </td>
          </tr>
          <tr v-if="order.detail_payment">
            <td class="pl-4 text-right font-medium">Mã giao dịch</td>
            <td class="pl-8">{{ order.detail_payment.bank_tran_no }}</td>
          </tr>
          <tr v-if="order.detail_payment">
            <td class="pl-4 text-right font-medium">Loại thẻ</td>
            <td class="pl-8">{{ order.detail_payment.card_type }}</td>
          </tr>
          <tr v-if="order.detail_payment">
            <td class="pl-4 text-right font-medium">Ngân hàng</td>
            <td class="pl-8">
              {{
                bankcode.find(
                  (item) => item.value === order.detail_payment.bank_code,
                ).title
              }}
            </td>
          </tr>
          <tr v-if="order.detail_payment">
            <td class="pl-4 text-right font-medium">Ngày thanh toán</td>
            <td class="pl-8">
              {{
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
              }}
            </td>
          </tr>
          <!-- total price -->
          <tr>
            <td class="p-2 text-right text-lg font-bold">Tổng tiền</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Phí vận chuyển</td>
            <td class="pl-8">
              {{
                Number(30000).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Thuế GTGT</td>
            <td class="pl-8">10%</td>
          </tr>
          <tr>
            <td class="pl-4 text-right font-medium">Tổng cộng</td>
            <td class="pl-8 text-xl font-medium text-price">
              {{
                order.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
          </tr>
        </table>
      </section>
    </Transition>
    <div class="flex justify-end p-2">
      <button class="hover:text-blue-500" @click="showMore = !showMore">
        {{ showMore ? "Ẩn" : "Chi tiết" }}
      </button>
    </div>
    <div class="flex items-center justify-between gap-2 p-2">
      <span class="text-gray-500">{{ order._id }}</span>
      <span class="font-medium">
        {{
          order.status === "pending"
            ? "Đang chờ xác nhận"
            : order.status === "confirmed"
            ? "Đã xác nhận"
            : order.status === "shipping"
            ? "Đang giao hàng"
            : order.status === "delivered"
            ? "Đã giao hàng"
            : "Đã huỷ"
        }}
      </span>

      <div>
        <button
          v-if="order.status === 'pending'"
          class="border-r bg-black px-2 py-1 font-medium text-white hover:bg-gray-500"
          @click="async () => await useOrder.updateOrder(order._id, 'cancel')"
        >
          Huỷ
        </button>
        <button
          v-if="order.status === 'pending'"
          class="bg-black px-2 py-1 font-medium text-white hover:bg-gray-500"
          @click="
            async () => {
              await useOrder.updateOrder(order._id, 'shipping');
              generatePDF(order);
            }
          "
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>
