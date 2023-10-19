<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useSearchStore } from '../../stores/searchStore';

const props = defineProps({
  push: {
    type: String,
    default: 'Products',
  },
  products: {
    type: Boolean,
    default: true,
  },
  orders: {
    type: Boolean,
    default: false,
  },
  users: {
    type: Boolean,
    default: false,
  },
  banner: {
    type: Boolean,
    default: false,
  },
});

const { setSearch, search } = useSearchStore();
const router = useRouter();

const searchText = ref(search);
const isFocus = ref(false);

const handleSubmit = async () => {
  if (!searchText.value) return;
  setSearch(searchText.value);
  router.push({ name: props.push, query: { search: searchText.value } });
};

const handleDelete = () => {
  searchText.value = '';
  setSearch('');
};
</script>
<template>
  <div
    class="w-full border px-2 py-1 rounded-3xl bg-white flex justify-between pointer-events-none focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-2"
  >
    <form @submit.prevent="handleSubmit" class="flex-grow flex">
      <input
        v-model="searchText"
        @focus="isFocus = true"
        @blur="isFocus = false"
        class="outline-none text-black px-3 pointer-events-auto w-full h-full"
      />
      <Transition>
        <button
          v-if="searchText"
          @click="handleDelete"
          class="pointer-events-auto opacity-50 hover:opacity-100 focus:outline-none"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </Transition>
      <button @click="handleSubmit">
        <i
          class="fa-solid fa-magnifying-glass p-2 text-black pointer-events-auto hover:cursor-pointer"
        ></i>
      </button>
    </form>
  </div>
</template>
