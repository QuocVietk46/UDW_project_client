<script setup>
import AuthLayout from '../../layouts/authLayout.vue';
</script>

<template>
  <AuthLayout v-slot="props">
    <section
      class="row-span-5 flex items-center flex-col mt-20"
      :class="props.class"
    >
      <h1 class="p-10 text-2xl text">Đăng ký</h1>
      <form class="flex gap-2 flex-col">
        <div>
          <input
            class="input-form"
            placeholder="Nhập địa chỉ email hoặc sdt"
            type="email"
            id="email"
          />
        </div>
        <div>
          <input
            class="input-form"
            placeholder="Nhập mật khẩu"
            type="password"
            id="password"
          />
        </div>
        <div class="flex justify-center pt-4">
          <button class="btn" type="submit">Đăng ký</button>
        </div>
      </form>

      <div class="pt-5">
        <p class="text-sm">
          Bạn đã có tài khoản?
          <router-link :to="{ name: 'Login' }" class="text-blue-500"
            >Đăng Nhập</router-link
          >
        </p>
      </div>
    </section>
  </AuthLayout>
</template>
