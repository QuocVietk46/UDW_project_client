<script setup>
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();

const toggleTheme = () => {
  console.log(themeStore);
  themeStore.toggleTheme();
};
</script>

<template>
  <header>
    <div class="flex justify-around">
      <div>LOGO</div>
      <ul class="flex">
        <li class="btn-nav group">
          <div class="group-hover:scale-105 transition-transform duration-100">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </div>
        </li>
        <li class="btn-nav">
          <div class="group-hover:scale-105 transition-transform duration-100">
            <router-link :to="{ name: 'About' }">About</router-link>
          </div>
        </li>
        <li class="btn-nav" @click="toggleTheme">change theme</li>
      </ul>
      <div>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </div>
    </div>
  </header>
</template>
