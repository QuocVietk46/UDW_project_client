<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['deleteI']);

const active = ref(0);
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

let interval = null;
onMounted(() => {
  interval = setInterval(() => {
    next();
  }, 5000);
});

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    next();
  }, 5000);
};

const next = () => {
  if (active.value > props.images.length - 2) {
    active.value = 0;
  } else {
    active.value++;
  }
  resetInterval();
};

const prev = () => {
  if (active.value < 1) {
    active.value = props.images.length - 1;
  } else {
    active.value--;
  }
  resetInterval();
};

const handleClick = (index) => {
  active.value = index;
  resetInterval();
};
onUnmounted(() => {
  clearInterval(interval);
});

const handleDelete = () => {
  emits('deleteI', props.images[active.value]);
};
</script>
<template>
  <section class="relative w-full h-full">
    <div class="w-full h-full overflow-hidden flex">
      <img
        v-for="(image, index) in images"
        :src="image._id ? SERVER_URL + image.path : image.path"
        :alt="image.filename"
        loading="lazy"
        class="w-full h-full object-cover block flex-shrink-0 flex-grow-0 transform transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${active * 100}%)`,
        }"
      />
    </div>
    <div>
      <ul class="flex space-x-3 absolute bottom-2 left-1/2 -translate-x-1/2">
        <li
          v-for="(image, index) in images"
          :key="index"
          class="w-2 h-2 rounded-full hover:bg-gray-400 cursor-pointer"
          :class="index === active ? 'bg-blue-400 scale-150' : 'bg-gray-500'"
          @click="handleClick(index)"
        ></li>
      </ul>
    </div>
    <!-- Button control -->
    <button
      class="absolute -translate-y-1/2 top-1/2 left-1 z-20 text-gray-300 hover:text-gray-500"
      @click="prev"
    >
      <i class="fa-solid fa-caret-left text-3xl"></i>
    </button>
    <button
      class="absolute -translate-y-1/2 top-1/2 right-1 z-20 text-gray-300 hover:text-gray-500"
      @click="next"
    >
      <i class="fa-solid fa-caret-right text-3xl"></i>
    </button>
    <button @click="handleDelete" v-if="edit" class="absolute top-0 right-0">
      <i
        class="fa-solid fa-xmark p-1 text-xl text-red-300 hover:text-red-600"
      ></i>
    </button>
  </section>
</template>
