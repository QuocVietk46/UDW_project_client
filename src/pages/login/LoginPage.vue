<script setup>
import { ref } from 'vue';
import AuthLayout from '../../layouts/authLayout.vue';
// const props = ref();
</script>

<template>
  <section class="row-span-5 flex items-center flex-col mt-20">
    <div class="bg-white shadow-lg px-24 min-w-[40rem]">
      <div class="py-16">
        <h1 class="text-2xl font-bold text-center">Đăng nhập</h1>
      </div>
      <form>
        <div class="flex gap-y-7 flex-col">
          <div>
            <input
              class="input-form"
              placeholder="Nhập địa chỉ email hoặc SDT"
              type="email"
              id="email"
            />
          </div>
          <div>
            <input
              class="input-form"
              placeholder="Nhập mật khẩu"
              type="email"
              id="email"
            />
          </div>
          <div class="flex justify-end">
            <router-link
              :to="{ name: 'Forgot-password' }"
              class="text-blue-500 translate-y-[-50%] hover:text-blue-700"
              >Bạn quên mật khẩu?</router-link
            >
          </div>

          <div class="pt-8">
            <button
              class="btn w-full rounded-none bg-black font-bold required:border-red-500"
              type="submit"
            >
              ĐĂNG NHẬP
            </button>
          </div>
        </div>
      </form>

      <div class="py-10">
        <p class="text-sm text-center">
          Bạn chưa có tài khoản?
          <router-link
            :to="{ name: 'Register' }"
            class="text-blue-500 hover:text-blue-700"
            >Đăng ký</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>
