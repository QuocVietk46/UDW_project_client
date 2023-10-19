<script setup>
import SideBar from '../components/sideBar/SideBar.vue';
</script>
<template>
  <div class="relative">
    <SideBar class="w-sideBar fixed top-0 left-0 h-screen" />
    <div class="ml-sideBar h-screen overflow-x-hidden">
      <router-view v-slot="{ Component }">
        <Transition name="fade">
          <KeepAlive :exclude="['CartPage']">
            <component :is="Component" class="bg-primary" />
          </KeepAlive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped></style>

<!-- <Suspense> -->
<!-- <template #fallback> Loading... </template> -->
<!-- </Suspense> -->
