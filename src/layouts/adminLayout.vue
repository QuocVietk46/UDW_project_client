<script setup>
import SideBar from "../components/sideBar/SideBar.vue";
</script>
<template>
  <div class="relative">
    <SideBar class="fixed left-0 top-0 h-screen w-sideBar" />
    <div class="ml-sideBar h-screen">
      <router-view v-slot="{ Component }">
        <Transition name="fade">
          <KeepAlive :exclude="['CartPage']">
            <component :is="Component" class="min-h-screen bg-primary" />
          </KeepAlive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped></style>
