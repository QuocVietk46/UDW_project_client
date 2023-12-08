<script setup>
import { reactive } from "vue";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { product, quantity, error = "" } = props.product;

const useCart = useCartStore();
const { updateCart, removeProductFromCart } = useCart;

const change = reactive({
  isDeleted: false,
  isChange: false,
  preQuantity: quantity,
  quantity: quantity,
  error: error,

  handleChange: (e) => {
    change.quantity = e.target.value;
    change.isChange = true;
  },
  handleCancel: () => {
    change.quantity = change.preQuantity;
    change.isChange = false;
  },
  handleUpdate: async () => {
    await updateCart({ productId: product._id, quantity: change.quantity });
    change.preQuantity = change.quantity;
    change.isChange = false;
    if (quantity < change.quantity) {
      change.error = "Chỉ còn " + quantity + " sản phẩm trong kho";
    } else {
      change.error = "";
    }
  },
  handleDelete: async () => {
    await removeProductFromCart({ productId: product._id });
    console.log("delete");
    change.isDeleted = true;
    change.isChange = false;
  },
});
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>
<template>
  <Transition name="slide-fade">
    <section
      v-if="!change.isDeleted && product"
      class="pointer-events-none"
      :class="{
        'before:absolute before:left-0 before:top-0 before:z-[50] before:h-screen before:w-screen before:backdrop-blur-sm':
          change.isChange,
      }"
    >
      <div
        class="flex border-b-[1px] border-[#eee] py-4"
        :class="{ 'relative z-[60]': change.isChange }"
      >
        <div class="relative flex flex-col items-center justify-center">
          <img
            :src="SERVER_URL + product.images[0].path"
            alt=""
            class="h-[140px] w-[110px] object-cover"
          />
          <span
            v-if="product.sale"
            class="absolute left-0 top-2 bg-white px-2 py-1 opacity-80"
          >
            {{ product.sale }}%
          </span>
        </div>
        <div class="flex-grow pl-5">
          <p class="text-xl font-bold leading-none text-[#d01345]">
            <span class="pr-2" v-if="product.sale > 0">
              {{
                (
                  product.price -
                  product.price * (product.sale / 100)
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </span>
            <span
              :class="
                product.sale > 0 &&
                'relative text-base opacity-80 before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:bg-black before:opacity-80'
              "
            >
              {{
                product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </span>
          </p>
          <h1 class="py-2 text-2xl font-bold">{{ product.title }}</h1>
          <div class="flex items-center">
            <p>Số lượng:</p>
            <select
              name="quantity"
              class="pointer-events-auto cursor-pointer px-2 py-1 outline-none"
              :value="change.quantity"
              @change="change.handleChange"
            >
              <option v-for="option in options" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <small v-if="change.error" class="text-red-600">{{
            change.error
          }}</small>
        </div>
        <div>
          <button class="pointer-events-auto" @click="change.handleDelete">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
      </div>
      <div
        v-if="change.isChange"
        :class="{ 'relative z-[60]': change.isChange }"
        class="pointer-events-auto relative flex justify-end gap-2 border-b-[1px] border-[#eee] bg-white p-4 py-4"
      >
        <button @click="change.handleCancel">Huỷ</button>
        <button @click="change.handleUpdate">Cập nhật</button>
      </div>
    </section>
  </Transition>
</template>

<style scoped></style>
