<script setup>
import { ref, toRef, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  py: {
    type: String,
    default: 'py-2',
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  push: {
    type: String,
    default: 'Products',
  },
});

const emit = defineEmits(['value']);

const router = useRouter();
const route = useRoute();

const { search, ...rest } = route.query;
const searchText = ref(search || '');
const isFocus = ref(false);

const handleSubmit = async () => {
  console.log(searchText.value);
  if (!searchText.value || search) return;

  router.push({
    name: props.push,
    query: {
      ...(searchText.value && { search: searchText.value }),
      ...rest,
    },
  });
};

const handleDelete = () => {
  searchText.value = '';
  router.push({
    name: props.push,
    query: {
      ...rest,
    },
  });
};

watch(
  () => searchText.value,
  () => {
    emit('value', searchText.value);
  },
  { immediate: true }
);
</script>
<template>
  {{ console.log(searchText) }}
  <div
    :class="py"
    class="w-full border px-4 rounded-3xl bg-white flex justify-between pointer-events-none focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-2"
  >
    <form @submit.prevent="handleSubmit" class="flex-grow flex">
      <input
        v-model="searchText"
        @focus="isFocus = true"
        @blur="isFocus = false"
        class="outline-none text-black px-3 pointer-events-auto w-full h-full"
      />

      <button
        @click="handleDelete"
        class="pointer-events-auto opacity-50 hover:opacity-100 focus:outline-none"
        :class="searchText ? 'visible' : 'invisible'"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <button type="submit" v-if="showBtn">
        <i
          class="fa-solid fa-magnifying-glass p-2 text-black pointer-events-auto hover:cursor-pointer"
        ></i>
      </button>
    </form>
  </div>
</template>
