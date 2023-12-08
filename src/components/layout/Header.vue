<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";

import SearchInput from "../inputs/searchInput.vue";
import UserButton from "../buttons/UserButton.vue";
import Bade from "../bade/index.vue";
import { useCartStore } from "../../stores/cartStore";
import { listNav } from "@/assets/data";

const search = ref("");
const value = storeToRefs(useCartStore()).amount;
</script>

<template>
  <header>
    <div class="select-none bg-secondary px-40 text-white">
      <div class="flex items-center justify-between">
        <div class="flex">
          <router-link :to="{ name: 'Home' }">
            <h1 class="p-4 pl-0 text-2xl font-semibold uppercase">Clothing</h1>
          </router-link>
          <h1 class="whitespace-nowrap bg-[#525050] p-4 text-2xl font-bold">
            SẢN PHẨM
          </h1>
        </div>
        <div class="mx-10 w-full px-14">
          <SearchInput py="py-1" @value="(value) => (search = value)" />
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
    <div class="select-none bg-[#525050] px-40 text-white">
      <ul class="flex">
        <li v-for="nav in listNav" class="uppercase">
          <router-link
            :to="{
              name: nav.to,
              query: {
                ...nav.query,
                ...(search && { search }),
              },
            }"
            class="btn-nav"
            >{{ nav.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>
