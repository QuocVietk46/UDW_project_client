<script setup>
import { ref } from 'vue';

import Carousel from '../carousel/Carousel.vue';
import Modal from './Modal.vue';
import { category, status } from '@/assets/data';
import { useProductsStore } from '@/stores/productsStore';

const props = defineProps({
  product: {
    type: Object,
    default: {
      images: [],
      title: '',
      price: undefined,
      sale: undefined,
      description: '',
      category: '',
      status: '',
    },
  },
  title: {
    type: String,
    default: '',
  },
});

const productsStore = useProductsStore();

const newProduct = ref({
  _id: '' || props.product._id,
  images: [],
  title: '' || props.product.title,
  price: undefined || props.product.price,
  sale: undefined || props.product.sale,
  describe: '' || props.product.describe,
  quantity: undefined || props.product.quantity,
  category: null || props.product.category,
  status: '' || props.product.status,
});
const images = ref([]);
const deleteI = ref([]);
const isOpen = ref(false);
const isLoading = ref(false);

const handleInputImages = (e) => {
  const files = e.target.files;
  newProduct.value.images = [...newProduct.value.images, ...files];
  for (let i = 0; i < files.length; i++) {
    console.log(files[i].name);
    const file = URL.createObjectURL(files[i]);
    images.value = [...images.value, { filename: files[i].name, path: file }];
  }
  console.log({ images: newProduct.value.images });
};

const handleDeleteImage = (image) => {
  // delete image in server
  if (image._id) {
    deleteI.value.push(image._id);

    props.product.images = props.product.images.filter(
      (img) => img._id !== image._id
    );

    console.log({ deleteI: deleteI.value });
    return;
  }
  // delete image in client
  newProduct.value.images = newProduct.value.images.filter(
    (img) => img.name !== image.filename
  );
  images.value = images.value.filter((img) => img.filename !== image.filename);
};

const formatData = () => {
  const formData = new FormData();
  newProduct.value.images.map((img) => formData.append('images', img));

  newProduct.value.title !== props.product.title &&
    formData.append('title', newProduct.value.title);
  newProduct.value.price !== props.product.price &&
    formData.append('price', newProduct.value.price);
  newProduct.value.sale !== props.product.sale &&
    formData.append('sale', newProduct.value.sale);
  newProduct.value.describe !== props.product.describe &&
    formData.append('describe', newProduct.value.describe);
  newProduct.value.category !== props.product.category &&
    formData.append('category', newProduct.value.category);
  newProduct.value.status !== props.product.status &&
    formData.append('status', newProduct.value.status);
  newProduct.value.quantity !== props.product.quantity &&
    formData.append('quantity', newProduct.value.quantity);
  deleteI.value.length > 0 && formData.append('deleteI', deleteI.value);
  return formData;
};

const handleSubmit = async () => {
  isLoading.value = true;
  const formData = formatData();
  if (props.product._id) {
    await productsStore.editProduct(props.product._id, formData);
  } else {
    await productsStore.addProduct(formData);
  }
  deleteI.value = [];
  newProduct.value = {
    _id: '',
    images: [],
    title: '',
    price: undefined,
    sale: undefined,
    describe: '',
    quantity: undefined,
    category: null,
    status: '',
  };
  isLoading.value = false;
  handleClose();
  return;
};

const handleDelete = async () => {
  isLoading.value = true;
  await productsStore.removeProduct(props.product._id);
  isLoading.value = false;
  handleClose();
};

// handle modal
const handleClose = () => {
  isOpen.value = false;
};
const handleOpen = () => {
  isOpen.value = true;
};
</script>
<template>
  <button @click="handleOpen" class="font-medium">
    {{ title || product.title }}
  </button>
  <Modal :open="isOpen" @close="handleClose" @open="handleOpen">
    <div class="flex gap-2 p-4">
      <div
        v-if="images.length > 0 || props.product.images.length > 0"
        class="w-[24rem] h-[34rem]"
      >
        <Carousel
          :images="[...props.product.images, ...images]"
          @deleteI="(image) => handleDeleteImage(image)"
          edit
        />
      </div>
      <div
        v-else
        class="w-[24rem] h-[34rem] border-dashed border-black border-2 flex justify-center items-center"
      >
        <label
          for="images-input"
          class="cursor-pointer w-full h-full flex justify-center items-center hover:bg-slate-100"
          >Thêm hình ảnh</label
        >
      </div>
      <div class="flex flex-col gap-5 min-w-[25rem]">
        <input
          @change="handleInputImages"
          type="file"
          name="images"
          id="images-input"
          class="hidden"
          multiple
        />
        <input
          type="text"
          name="title"
          v-model="newProduct.title"
          class="p-1 border-2 bg-inherit"
          placeholder="Tiêu đề sản phẩm"
        />
        <div
          class="relative after:absolute after:right-10 after:top-1/2 after:-translate-y-1/2 after:content-['VND'] after:text-gray-400"
        >
          <input
            type="number"
            name="price"
            v-model="newProduct.price"
            class="p-1 border-2 bg-inherit w-full"
            placeholder="Giá sản phẩm"
          />
        </div>
        <div
          class="relative after:absolute after:right-10 after:top-1/2 after:-translate-y-1/2 after:content-['%'] after:text-gray-400"
        >
          <input
            type="number"
            name="sale"
            v-model="newProduct.sale"
            class="p-1 border-2 bg-inherit w-full"
            placeholder="Giảm giá (nếu có)"
          />
        </div>
        <input
          type="number"
          name="quantity"
          v-model="newProduct.quantity"
          class="p-1 border-2 bg-inherit w-full"
          placeholder="Số lượng sản phẩm"
        />
        <textarea
          cols="30"
          rows="6"
          type="text"
          name="describe"
          v-model="newProduct.describe"
          class="p-1 border-2 bg-inherit"
          placeholder="Mô tả sản phẩm"
        ></textarea>
        <select
          class="p-1 border-2 bg-inherit"
          name="category"
          v-model="newProduct.category"
        >
          <option value="">Loại</option>
          <option v-for="item in category" :value="item.value">
            {{ item.title }}
          </option>
        </select>
        <select
          class="p-1 border-2 bg-inherit"
          name="status"
          v-model="newProduct.status"
        >
          <option value="">Trạng thái</option>
          <option v-for="item in status" :value="item.value">
            {{ item.title }}
          </option>
        </select>
        <label
          for="images-input"
          class="px-4 py-2 text-center cursor-pointer bg-slate-200 hover:shadow-md hover:bg-slate-300"
        >
          Thêm ảnh
        </label>
      </div>
    </div>
    <div class="flex gap-4 px-4 pb-4 justify-end">
      <button
        @click="handleClose"
        class="px-6 py-2 hover:bg-red-500 hover:shadow-md hover:text-white"
      >
        Đóng
      </button>
      <div>
        <div v-if="isLoading">
          <button type="button" class="px-6 py-2 bg-fuchsia-200 flex" disabled>
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang xử lý
          </button>
        </div>
        <div v-else>
          <div v-if="props.product.title" class="flex gap-4">
            <button
              v-if="props.product.status === 'draft'"
              @click="handleDelete"
              class="px-6 py-2 bg-red-400 hover:bg-red-500 hover:text-white hover:shadow-md"
            >
              Xoá
            </button>
            <button
              @click="handleSubmit"
              class="px-6 py-2 bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md"
            >
              Cập nhật
            </button>
          </div>
          <button
            v-else
            type="submit"
            @click="handleSubmit"
            class="px-6 py-2 bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
