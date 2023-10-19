<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="relative">
    <input
      :class="class"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <small class="text-red-600 absolute bottom-[-1.2rem] left-0">
      {{ errorMessage }}
    </small>
  </div>
</template>
