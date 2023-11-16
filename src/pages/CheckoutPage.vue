<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import { useUserStore } from "@/stores/userStore";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/stores/cartStore";
import CardTotal from "@/components/cart/CardTotal.vue";
import Modal from "@/components/modal/Modal.vue";
import { bankcode as bc } from "@/assets/data";

const router = useRouter();
const useUser = useUserStore();
const useOrder = useOrderStore();
const useCart = useCartStore();
const user = storeToRefs(useUser).user;

const isOpenModalAddress = ref(false);
const address = ref("");
const payment = ref("");

const handleUpdate = async () => {
  await useUser.updateUser({ address: address.value });
  address.value = "";
  isOpenModalAddress.value = false;
};

const onSubmit = async (values) => {
  if (useCart.products.length === 0) {
    return;
  }
  if (values.payment === "COD") {
    const res = await useOrder.addOrder(values);
    if (res) {
      router.push({ name: "Thanks" });
    }
  }
  if (values.payment === "VNPay") {
    console.log(values);
    await useOrder.addOrderVNPay({
      ...values,
      amount: useCart.subPrice + 30000,
    });
  }
  console.log(values);
};

const checkoutSchema = Yup.object().shape({
  full_name: Yup.string().required("Vui lòng nhập tên"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
  address: Yup.string().required("Vui lòng chọn hoặc nhập địa chỉ"),
  payment: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  bankcode: Yup.string().when("payment", {
    is: (val) => val === "VNPay",
    then: () => Yup.string().required("Vui lòng chọn ngân hàng"),
  }),
});
</script>
<template>
  <div>
    <Form
      @submit="onSubmit"
      :validation-schema="checkoutSchema"
      class="grid grid-cols-7 gap-2 bg-primary px-64 py-8 text-lg"
    >
      <section class="col-span-4 flex flex-col gap-2">
        <!-- Info -->
        <div class="space-y-2 bg-white p-4">
          <h2 class="text-xl font-medium">Thông tin người nhận</h2>
          <div class="space-y-2">
            <div class="grid grid-cols-8">
              <p class="col-span-3 min-w-[150px] px-8">Tên người nhận</p>
              <Field
                name="full_name"
                class="col-span-5 bg-gray-50 px-1 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Vui lòng nhập tên"
                :value="user.full_name"
              />
              <ErrorMessage
                name="full_name"
                class="col-start-4 col-end-8 pl-1 pt-1 text-sm text-red-500"
              ></ErrorMessage>
            </div>
            <div class="grid grid-cols-8">
              <td class="col-span-3 min-w-[150px] px-8">Số điện thoại</td>
              <Field
                name="phone"
                class="col-span-5 w-full bg-gray-50 px-1 shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Vui lòng nhập số điện thoại"
                :value="user.phone"
              />
              <ErrorMessage
                name="phone"
                class="col-start-4 col-end-8 pl-1 pt-1 text-sm text-red-500"
              ></ErrorMessage>
            </div>
            <div class="grid grid-cols-8">
              <td class="col-span-3 min-w-[150px] px-8">Email</td>
              <td>{{ user.email }}</td>
            </div>
          </div>
        </div>
        <!-- Payment -->
        <div class="select-none bg-white p-4">
          <h2 class="text-xl font-medium">Phương thức thanh toán</h2>
          <div class="flex flex-col px-6 py-2">
            <ErrorMessage
              name="payment"
              class="pl-1 text-sm text-red-500"
            ></ErrorMessage>
            <div>
              <Field
                type="radio"
                value="COD"
                name="payment"
                id="payment"
                class="peer hidden"
                @click="payment = 'COD'"
              />
              <label
                for="payment"
                class="block cursor-pointer p-2 peer-checked:bg-blue-200"
                ><i class="fa-solid fa-truck-fast text-gray-400"></i> Thanh toán
                khi nhận hàng</label
              >
            </div>
            <div>
              <Field
                type="radio"
                value="VNPay"
                name="payment"
                id="VNPay"
                class="peer hidden"
                @click="payment = 'VNPay'"
              />
              <label
                for="VNPay"
                class="block cursor-pointer p-2 peer-checked:bg-blue-200"
                ><i class="fa-solid fa-credit-card text-gray-400"></i> Thanh
                toán qua VNPay</label
              >
              <Transition name="fade">
                <div v-if="payment === 'VNPay'">
                  <Field
                    as="select"
                    name="bankcode"
                    class="block w-full bg-gray-100 p-2 shadow-md"
                  >
                    <option value="">Chọn ngân hàng</option>
                    <option
                      v-for="item in bc"
                      :value="item.value"
                      class="font-light"
                    >
                      {{ item.title }}
                    </option>
                  </Field>
                </div>
              </Transition>
            </div>
          </div>
        </div>
        <!-- Address -->
        <div class="relative space-y-2 bg-white p-4">
          <button
            type="button"
            class="absolute right-2 top-2 p-2 text-base font-medium hover:bg-blue-200 hover:shadow-md"
            @click="isOpenModalAddress = true"
          >
            Thêm địa chỉ
          </button>
          <h2 class="text-xl font-medium">Địa chỉ nhận hàng</h2>

          <div class="space-y-1 px-8 py-1">
            <ErrorMessage
              name="address"
              class="text-sm text-red-500"
            ></ErrorMessage>
            <div v-for="(address, index) in user.address" class="flex gap-2">
              <Field
                type="radio"
                :value="address"
                name="address"
                :id="index"
                class="w-4"
              />
              <label :for="index" class="block cursor-pointer">{{
                address
              }}</label>
            </div>
          </div>
        </div>
      </section>
      <CardTotal title_button="Xác nhận" />
    </Form>

    <!-- Modal -->
    <Modal :open="isOpenModalAddress" @open="" @close="">
      <div
        class="relative flex min-w-[25rem] flex-col gap-4 overflow-x-hidden bg-white p-4"
      >
        <div>
          <p class="pb-1 text-center text-2xl font-bold">Thêm địa chỉ</p>
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
              : 'bg-blue-500 text-white hover:bg-blue-700'
          "
          class="px-6 py-2"
        >
          Lưu
        </button>

        <button
          @click="isOpenModalAddress = false"
          class="absolute right-0 top-0 p-2"
        >
          <svg
            class="h-6 w-6 text-gray-500 hover:text-gray-700"
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

<style scoped></style>
