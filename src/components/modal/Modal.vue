<script setup>
const props = defineProps({
  classButton: {
    type: String,
    default: '',
  },
  open: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
    default: () => {
      open.value = false;
    },
  },
  onOpen: {
    type: Function,
    default: () => {
      open.value = true;
    },
  },
});
</script>
<template>
  <Transition name="fade">
    <Teleport to="body">
      <div
        :class="
          open
            ? 'before:absolute before:top-0 before:left-0 before:w-screen before:h-screen before:backdrop-brightness-50 before:z-10 '
            : ''
        "
      >
        <div
          v-if="open"
          class="z-20 bg-white mx-auto flex flex-col w-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>
