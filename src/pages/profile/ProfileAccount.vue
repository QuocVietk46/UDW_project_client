<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

import Modal from '@/components/modal/Modal.vue';

const userStore = useUserStore();
const user = storeToRefs(userStore).user.value;
const isOpenModalPhone = ref(false);
const isOpenModalAddress = ref(false);
const phone = ref('');
const address = ref('');

const handleUpdate = () => {
  if (phone.value === '' && address.value === '') {
    isOpenModalPhone.value = false;
    isOpenModalAddress.value = false;
    return;
  }
  isOpenModalPhone.value = false;
  isOpenModalAddress.value = false;
  userStore.updateUser({ phone: phone.value, address: address.value });
  phone.value = '';
  address.value = '';
};

const handleDelete = (addr) => {
  userStore.updateUser({ addressDelete: addr });
};
</script>

<template>
  <div class="py-4 px-6 space-y-5 bg-white">
    <section class="pb-5 border-b-[1px]">
      <h1 class="text-2xl font-bold">Hồ sơ của tôi</h1>
      <p class="text-sm">Quản lý thông tin hồ sơ tài khoản</p>
    </section>
    <section class="space-y-2">
      <table>
        <tbody class="flex gap-2 flex-col">
          <tr>
            <td class="w-[150px] text-right pr-6">Họ và tên</td>
            <td>{{ user.full_name }}</td>
          </tr>
          <tr>
            <td class="w-[150px] text-right pr-6">Email</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td class="w-[150px] text-right pr-6">Số điện thoại</td>
            <td v-if="user.phone">{{ user.phone }}</td>
            <td v-else>Chưa nhập số điện thoại</td>
            <td class="pl-4">
              <button
                @click="isOpenModalPhone = true"
                class="relative text-blue-500 hover:text-blue-700 hover:underline"
              >
                Đổi
              </button>
            </td>
          </tr>
          <tr>
            <td class="w-[150px] text-right pr-6">Địa chỉ</td>
          </tr>
          <tr v-if="user.address.length > 0" v-for="address in user.address">
            <td class="w-[150px] text-right pr-6"></td>
            <td>{{ address }}</td>
            <td class="pl-4">
              <button
                @click="handleDelete(address)"
                class="text-blue-500 hover:text-blue-600 hover:underline"
              >
                Xoá
              </button>
            </td>
          </tr>
          <tr v-else>
            <td class="w-[150px] text-right pr-6"></td>
            <td>Chưa nhập địa chỉ</td>
          </tr>
          <tr>
            <td class="w-[150px] text-right pr-6"></td>
            <td>
              <button
                @click="isOpenModalAddress = true"
                class="text-blue-500 hover:text-blue-700 hover:underline"
              >
                Thêm địa chỉ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Modal -->
    <Modal :open="isOpenModalPhone" @open="" @close="">
      <div class="relative flex flex-col gap-4 p-4 min-w-[25rem] bg-white">
        <div>
          <p class="text-2xl font-bold text-center pb-1">Số điện thoại</p>
          <p class="text-gray-500">
            Số điện thoại sẽ được sử dụng để xác nhận đơn hàng
          </p>
          <p class="text-gray-500">
            Bạn có thể thay đổi số điện thoại bất kỳ lúc nào
          </p>
        </div>
        <input
          v-model="phone"
          type="text"
          name="phone"
          id="phone"
          class="input-form"
          placeholder="Số điện thoại"
        />
        <button
          :disabled="phone === ''"
          @click="handleUpdate"
          :class="
            phone === ''
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          "
          class="px-6 py-2"
        >
          Lưu
        </button>

        <button
          @click="isOpenModalPhone = false"
          class="absolute top-0 right-0 p-2"
        >
          <svg
            class="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10.707 9.293a1 1 0 010 1.414L8.414 13H13a1 1 0 110 2H7a1 1 0 01-1-1v-6a1 1 0 112 0v4.586l2.293-2.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </Modal>
    <Modal :open="isOpenModalAddress" @open="" @close="">
      <div class="relative flex flex-col gap-4 p-4 min-w-[25rem] bg-white">
        <div>
          <p class="text-2xl font-bold text-center pb-1">Thêm địa chỉ</p>
          <p class="text-gray-500">Địa chỉ sẽ được sử dụng để giao hàng</p>
          <p class="text-gray-500">
            Địa chỉ càng chính xác thì khả năng giao hàng thành công càng cao
          </p>
        </div>
        <input
          v-model="address"
          type="text"
          name="address"
          id="address"
          class="input-form"
          placeholder="Thêm địa chỉ"
        />
        <button
          :disabled="address === ''"
          @click="handleUpdate"
          :class="
            address === ''
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          "
          class="px-6 py-2"
        >
          Lưu
        </button>

        <button
          @click="isOpenModalAddress = false"
          class="absolute top-0 right-0 p-2"
        >
          <svg
            class="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10.707 9.293a1 1 0 010 1.414L8.414 13H13a1 1 0 110 2H7a1 1 0 01-1-1v-6a1 1 0 112 0v4.586l2.293-2.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </Modal>
  </div>
</template>
