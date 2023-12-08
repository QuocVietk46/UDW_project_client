<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { getDataAPI } from "@/utils/fetchData";
import Banner from "@/components/Home/Banner.vue";
import CardProduct from "@/components/product/CardProduct.vue";

const router = useRouter();

const productsSale50 = ref([]);
const productsSale30 = ref([]);
const productsSale10 = ref([]);
const isLoading = ref(false);

const getProducts = async () => {
  try {
    isLoading.value = true;
    const res = await getDataAPI({ url: "home" });
    const data = res.data;
    console.log(data);
    productsSale50.value = data.productsSale50;
    productsSale30.value = data.productsSale30;
    productsSale10.value = data.productsSale10;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <section>
    <Banner></Banner>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="bg-primary">
      <section>
        <div class="flex justify-center p-6">
          <h1
            class="relative inline-block px-2 text-center text-4xl font-bold uppercase before:absolute before:bottom-1 before:left-0 before:right-0 before:top-2/3 before:bg-gray-500 before:opacity-30"
          >
            sale up to 50%
          </h1>
        </div>
        <div class="mx-40 grid grid-cols-3 gap-4">
          <CardProduct
            v-for="product in productsSale50"
            :product="product"
          ></CardProduct>
        </div>
        <div class="flex justify-center p-4">
          <button
            class="border border-black px-4 py-2 text-lg font-bold transition duration-300 ease-in-out hover:bg-black hover:text-white"
            @click="router.push({ name: 'Products', query: { sale: 50 } })"
          >
            Xêm thêm
          </button>
        </div>
      </section>
      <section>
        <div class="flex justify-center p-6">
          <h1
            class="relative inline-block px-2 text-center text-4xl font-bold uppercase before:absolute before:bottom-1 before:left-0 before:right-0 before:top-2/3 before:bg-gray-500 before:opacity-30"
          >
            sale up to 30%
          </h1>
        </div>
        <div class="mx-40 grid grid-cols-3 gap-4">
          <CardProduct
            v-for="product in productsSale30"
            :product="product"
          ></CardProduct>
        </div>
        <div class="flex justify-center p-4">
          <button
            class="border border-black px-4 py-2 text-lg font-bold transition duration-300 ease-in-out hover:bg-black hover:text-white"
            @click="router.push({ name: 'Products', query: { sale: 30 } })"
          >
            Xêm thêm
          </button>
        </div>
      </section>
      <section>
        <div class="flex justify-center p-6">
          <h1
            class="relative inline-block px-2 text-center text-4xl font-bold uppercase before:absolute before:bottom-1 before:left-0 before:right-0 before:top-2/3 before:bg-gray-500 before:opacity-30"
          >
            sale up to 10%
          </h1>
        </div>
        <div class="mx-40 grid grid-cols-3 gap-4">
          <CardProduct
            v-for="product in productsSale10"
            :product="product"
          ></CardProduct>
        </div>
        <div class="flex justify-center p-4">
          <button
            class="border border-black px-4 py-2 text-lg font-bold transition duration-300 ease-in-out hover:bg-black hover:text-white"
            @click="router.push({ name: 'Products', query: { sale: 10 } })"
          >
            Xêm thêm
          </button>
        </div>
      </section>
    </div>
  </section>
</template>
