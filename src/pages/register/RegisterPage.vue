<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';

import registerSchema from './validation.js';
import TextInput from '@/components/inputs/TextInput.vue';
import { useUserStore } from '@/stores/userStore';

const { register } = useUserStore();
const disabledBtn = ref(false);

const onInvalidSubmit = () => {
  disabledBtn.value = true;
  setTimeout(() => {
    disabledBtn.value = false;
  }, 1000);
};

const onSubmit = async (values) => {
  const data = {
    full_name: values.firstName + ' ' + values.lastName,
    email: values.email,
    password: values.password,
  };
  await register(data);
};
</script>

<template>
  <section class="row-span-5 flex items-center flex-col mt-20">
    <div class="bg-white shadow-xl px-24 min-w-[40rem]">
      <div class="py-16">
        <h1 class="text-2xl font-bold text-center">Đăng Ký</h1>
      </div>
      <Form
        @submit="onSubmit"
        :validation-schema="registerSchema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="flex gap-y-8 flex-col">
          <div class="flex justify-between">
            <TextInput
              class="input-form"
              name="firstName"
              type="text"
              placeholder="Họ"
            />
            <TextInput
              class="input-form"
              name="lastName"
              type="text"
              placeholder="Tên"
            />
          </div>
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
          <TextInput
            class="input-form"
            name="confirm_password"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div class="pt-14">
          <button
            class="btn-submit w-full rounded-none bg-black font-bold required:border-red-500"
            type="submit"
            :class="disabledBtn === true ? 'opacity-50 cursor-not-allowed' : ''"
          >
            ĐĂNG KÝ
          </button>
        </div>
      </Form>

      <div class="py-10">
        <p class="text-sm text-center">
          Bạn đã có tài khoản?
          <router-link
            :to="{ name: 'Login' }"
            class="text-blue-500 hover:text-blue-700"
            >Đăng nhập</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>
