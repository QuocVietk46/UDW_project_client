<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';
import { useRouter } from 'vue-router';

import loginSchema from './validation.js';
import TextInput from '../../components/inputs/TextInput.vue';
import { useAuth } from '../../hooks/useAuth';
import { useAlertStore } from '../../stores/alertStore';

const router = useRouter();
const { login } = useAuth();
const buttonSubmit = ref();
const alertStore = useAlertStore();

const onInvalidSubmit = () => {
  buttonSubmit.value.disabled = true;
  setTimeout(() => {
    buttonSubmit.value.disabled = false;
  }, 1000);
};

const onSubmit = async (values) => {
  alertStore.setLoading(true);
  const res = await login({
    email: values.email,
    password: values.password,
  });
  if (!res) {
    alertStore.setLoading(false);
    return;
  }
  alertStore.setLoading(false);
  if (res.data.user.role === 'admin') {
    router.push({ name: 'Admin' });
    return;
  }
  router.push({ name: 'Home' });
};
</script>

<template>
  <section class="row-span-5 flex items-center flex-col mt-20">
    <div class="bg-white shadow-lg px-24 min-w-[40rem]">
      <div class="py-16">
        <h1 class="text-2xl font-bold text-center">Đăng nhập</h1>
      </div>
      <Form
        @submit="onSubmit"
        :validation-schema="loginSchema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="flex gap-y-8 flex-col">
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
            placeholder="Địa chỉ email"
          />
          <div class="flex justify-end">
            <router-link
              :to="{ name: 'Forgot-password' }"
              class="text-blue-500 translate-y-[-50%] hover:text-blue-700"
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
