<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import SearchInput from '../inputs/searchInput.vue';
import UserButton from '../buttons/UserButton.vue';
import Bade from '../bade/index.vue';
import { useCartStore } from '../../stores/cartStore';

const route = useRoute();

const listNav = [
  {
    title: 'Toàn bộ',
    to: 'Products',
  },
  {
    title: 'Áo sơ mi',
    to: 'Products',
    query: { category: 'shirts' },
  },
  {
    title: 'Áo thun',
    to: 'Products',
    query: { category: 't-shirt' },
  },
  {
    title: 'Áo short',
    to: 'Products',
    query: { category: 'short' },
  },
  {
    title: 'Quần dài',
    to: 'Products',
    query: { category: 'pant' },
  },
  {
    title: 'Quần jean',
    to: 'Products',
    query: { category: 'jeans' },
  },
  {
    title: 'Áo khoác',
    to: 'Products',
    query: { category: 'jacket' },
  },
];

const search = route.query.search;
const value = storeToRefs(useCartStore()).amount;
</script>

<template>
  <header>
    <div class="px-40 bg-secondary text-white select-none">
      <div class="flex justify-between items-center">
        <div class="flex">
          <router-link :to="{ name: 'Home' }">
            <h1 class="font-bold text-2xl p-4 pl-0">LOGO</h1>
          </router-link>
          <h1 class="font-bold text-2xl p-4 bg-[#525050] whitespace-nowrap">
            SẢN PHẨM
          </h1>
        </div>
        <div class="mx-10 w-full px-14">
          <SearchInput py="py-1" />
        </div>
        <div class="flex items-center">
          <Bade :value="value" class="p-2">
            <router-link :to="{ name: 'Cart' }">
              <i class="fa-solid fa-basket-shopping text-xl"></i>
            </router-link>
          </Bade>
          <UserButton class="p-4" />
        </div>
      </div>
    </div>
    <div class="px-40 bg-[#525050] text-white select-none">
      <ul class="flex">
        <li v-for="nav in listNav" class="uppercase">
          <router-link
            :to="{ name: nav.to, query: { ...nav.query, search } }"
            class="btn-nav"
            >{{ nav.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>
