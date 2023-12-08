<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";

import loginSchema from "./validation.js";
import TextInput from "@/components/inputs/TextInput.vue";
import { useUserStore } from "@/stores/userStore";

const { login } = useUserStore();

const buttonSubmit = ref();

const onInvalidSubmit = () => {
  buttonSubmit.value.disabled = true;
  setTimeout(() => {
    buttonSubmit.value.disabled = false;
  }, 1000);
};

const onSubmit = async (values) => {
  await login({
    email: values.email,
    password: values.password,
  });
};
</script>

<template>
  <section class="row-span-5 mt-20 flex flex-col items-center">
    <div class="min-w-[40rem] bg-white px-24 shadow-lg">
      <div class="py-16">
        <h1 class="text-center text-2xl font-bold">Đăng nhập</h1>
      </div>
      <Form
        @submit="onSubmit"
        :validation-schema="loginSchema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="flex flex-col gap-y-8">
          <TextInput
            class="input-form"
            name="email"
            type="email"
            placeholder="Địa chỉ email"
          />
          <TextInput
            class="input-form"
            name="password"
            type="password"
            placeholder="Mật khẩu"
          />
          <div class="flex justify-end">
            <router-link
              :to="{ name: 'Forgot-password' }"
              class="translate-y-[-50%] text-blue-500 hover:text-blue-700"
              >Bạn quên mật khẩu?</router-link
            >
          </div>
        </div>
        <div class="pt-8">
          <button
            ref="buttonSubmit"
            class="btn-submit w-full rounded-none bg-black font-bold required:border-red-500"
            type="submit"
          >
            ĐĂNG NHẬP
          </button>
        </div>
      </Form>

      <div class="py-10">
        <p class="text-center text-sm">
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
