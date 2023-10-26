<script setup>
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
</script>
<template>
  <Header></Header>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <KeepAlive :exclude="['CartPage']">
        <Suspense>
          <component :is="Component" />
          <template #fallback> Loading... </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </router-view>
  <Footer></Footer>
</template>
