<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  py: {
    type: String,
    default: "py-2",
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  push: {
    type: String,
    default: "Products",
  },
});

const emit = defineEmits(["value"]);

const router = useRouter();
const route = useRoute();

const { search, ...rest } = route.query;
const searchText = ref("" || search);
const isFocus = ref(false);

const handleSubmit = async () => {
  if (searchText.value === search) return;

  router.push({
    name: props.push,
    query: {
      ...(searchText.value && { search: searchText.value }),
      ...rest,
    },
  });
};

const handleDelete = () => {
  searchText.value = "";
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
    emit("value", searchText.value);
  },
  { immediate: true },
);
</script>
<template>
  <div
    :class="py"
    class="pointer-events-none flex w-full justify-between rounded-3xl border bg-white px-4 focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-2"
  >
    <div class="flex flex-grow">
      <input
        name="search"
        type="text"
        v-model="searchText"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keydown.enter="handleSubmit"
        class="pointer-events-auto h-full w-full px-3 text-black outline-none"
      />

      <button
        @click="handleDelete"
        class="pointer-events-auto opacity-50 hover:opacity-100 focus:outline-none"
        :class="searchText ? 'visible' : 'invisible'"
      >
        <i class="fa-solid fa-xmark text-black"></i>
      </button>

      <button @click="handleSubmit" v-if="showBtn">
        <i
          class="fa-solid fa-magnifying-glass pointer-events-auto p-2 text-black hover:cursor-pointer"
        ></i>
      </button>
    </div>
  </div>
</template>
