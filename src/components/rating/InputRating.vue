<script setup>
import { ref } from 'vue';
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(['onChange']);

const rating = ref(props.value);
const isHovered = ref(false);
const hoverValue = ref(0);

const setRating = (newRating) => {
  rating.value = newRating;
  emit('onChange', rating.value);
};

const hoverRating = (value) => {
  if (isHovered.value) {
    hoverValue.value = value;
  }
};

const resetHover = () => {
  hoverValue.value = 0;
};
</script>

<template>
  <div class="star-rating">
    <div
      v-for="i in maxStars"
      :key="i"
      @click="setRating(i)"
      @mouseover="hoverRating(i)"
      @mouseleave="resetHover"
      class="text-3xl"
      :class="['star', i <= (isHovered ? hoverValue : rating) ? 'filled' : '']"
    >
      ★
    </div>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-block;
}

.star {
  display: inline-block;
  cursor: pointer;
  margin: 2px;
  color: rgb(222, 222, 222);
}

.filled {
  color: gold;
}
</style>
