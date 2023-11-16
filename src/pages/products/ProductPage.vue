<script>
export default {
  name: "ProductPage",
  inheritAttrs: false,
};
</script>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
import Carousel from "@/components/carousel/Carousel.vue";
import { category } from "@/assets/data";
import InputRating from "@/components/rating/InputRating.vue";
import Comment from "@/components/product/Comment.vue";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const product = storeToRefs(productsStore).product;
const quantity = ref(1);
const rates = storeToRefs(productsStore).rates;
const isLoading = ref(true);
const rating = reactive({
  value: 0,
  isChange: false,
});

const fetchProductById = async () => {
  isLoading.value = true;
  await productsStore.fetchProductById(route.params.id);
  isLoading.value = false;
};

const handleRating = async () => {
  await productsStore.rateProductById(route.params.id, rating.value);
  rating.isChange = false;
};

const handleAddToCart = async () => {
  await cartStore.addProductToCart({
    productId: route.params.id,
    quantity: quantity.value,
  });
};

onMounted(async () => {
  await fetchProductById();
});
</script>
<template>
  <div class="px-64 py-6">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="product">
      <section class="flex">
        <div class="h-[654px] w-[513px]">
          <Carousel :images="product.images" />
        </div>
        <div class="space-y-4 pl-8">
          <h1 class="text-3xl font-medium">{{ product.title }}</h1>
          <div class="flex items-center gap-2">
            <InputRating
              :max-stars="5"
              :value="product.rate"
              @onChange="
                (value) => {
                  rating.value = value;
                  rating.isChange = true;
                }
              "
            ></InputRating>
            <p class="text-lg font-light opacity-80">
              {{ rates.length }} đánh giá
            </p>
          </div>
          <Transition name="fade">
            <button
              v-if="rating.isChange"
              class="p-2 hover:bg-gray-300"
              @click="handleRating"
            >
              Đánh giá
            </button>
          </Transition>
          <p class="text-xl font-medium">
            <span class="pr-2 text-lg text-[#d01345]" v-if="product.sale > 0">
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
                'relative text-base text-[#d01345] opacity-80 before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:bg-black before:opacity-80'
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
          <p v-if="product.sale > 0">
            Sản phẩm đang giảm giá {{ product.sale }}%.
          </p>
          <p v-if="product.sale > 0">
            Tiết kiệm:
            {{
              ((product.sale / 100) * product.price).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            }}
          </p>
          <div class="flex items-end gap-2">
            <h2 class="font-medium">Loại:</h2>
            <p>
              {{
                category.find((item) => item.value === product.category).title
              }}
            </p>
          </div>
          <div>
            <h2 class="text-lg font-medium">Thông tin sản phẩm</h2>
            <p>{{ product.describe }}</p>
          </div>
          <div class="space-x-2 p-2">
            <select v-model="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <button
              class="bg-green-600 p-2 font-medium text-white hover:bg-green-700"
              @click="handleAddToCart"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </section>
      <Comment></Comment>
    </div>
    <div v-else>Không tìm thấy sản phẩm này</div>
  </div>
</template>
