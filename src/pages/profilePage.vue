<script setup>
import Aside from '@/components/profile/Aside.vue';
</script>
<template>
  <div
    class="py-4 px-64 flex gap-12 bg-primary min-h-[calc(100vh-(230px+85px))]"
  >
    <Aside></Aside>
    <div class="flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>
