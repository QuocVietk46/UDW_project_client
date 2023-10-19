<script setup>
import { ref } from 'vue';
import Carousel from '../carousel/Carousel.vue';
const props = defineProps({
  classButton: {
    type: String,
    default: '',
  },
  product: {
    type: Object,
    default: {
      images: [],
      title: '',
      price: 0,
      sale: 0,
      description: '',
      type: '',
      status: '',
    },
  },
});

const newProduct = ref({
  _id: '',
  images: [],
  title: '',
  price: null,
  sale: null,
  description: '',
  category: '',
  status: '',
});
const isOpen = ref(false);
const images = ref([]);
const deleteI = ref([]);

console.log({ modal: props.product });

const handleInputImages = (e) => {
  const files = e.target.files;
  newProduct.value.images = [...newProduct.value.images, ...files];
  for (let i = 0; i < files.length; i++) {
    console.log(files[i].name);
    const file = URL.createObjectURL(files[i]);
    images.value = [...images.value, { filename: files[i].name, path: file }];
  }
  console.log(newProduct.value.images);
};

const handleSubmit = () => {
  console.log({ product: newProduct.value });
};

const handleDeleteImage = (image) => {
  if (image._id) {
    deleteI.value.push(image);
    return;
  }
  newProduct.value.images = newProduct.value.images.filter(
    (img) => img.name !== image.filename
  );
  images.value = images.value.filter((img) => img.filename !== image.filename);
  console.log({ deleteI: deleteI.value });
};
</script>
<template>
  <button @click="isOpen = true" :class="classButton"><slot></slot></button>

  <Transition name="fade">
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="bg-gray-300 mx-auto flex flex-col w-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex gap-2 p-4">
          <div
            v-if="newProduct.images.length > 0 || props.product.title"
            class="w-[24rem] h-[34rem]"
          >
            <Carousel
              :images="[...images, ...props.product.images]"
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
            <input
              type="number"
              name="price"
              v-model="newProduct.price"
              class="p-1 border-2 bg-inherit"
              placeholder="Giá sản phẩm"
            />
            <input
              type="number"
              name="sale"
              v-model="newProduct.sale"
              class="p-1 border-2 bg-inherit"
              placeholder="Giảm giá (nếu có)"
            />
            <textarea
              cols="30"
              rows="8"
              type="text"
              name="title"
              v-model="newProduct.description"
              class="p-1 border-2 bg-inherit"
              placeholder="Mô tả sản phẩm"
            ></textarea>

            <select
              class="p-1 border-2 bg-inherit"
              name="category"
              v-model="newProduct.category"
            >
              <option value="">Loại</option>
              <option value="t-shirt">t-shirt</option>
              <option value="short">short</option>
              <option value="pans">pans</option>
            </select>
            <select
              class="p-1 border-2 bg-inherit"
              name="status"
              v-model="newProduct.status"
            >
              <option value="">Trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="unavailable">Không có sẵn</option>
              <option value="available">có sẵn</option>
              <option value="stop">Ngừng kinh doanh</option>
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
            @click="isOpen = false"
            class="px-6 py-2 hover:bg-red-500 hover:shadow-md hover:text-white"
          >
            close
          </button>
          <div>
            <button
              v-if="props.product.title"
              @click="handleSubmit"
              class="px-6 py-2 bg-fuchsia-200 hover:bg-fuchsia-300 hover:shadow-md"
            >
              Cập nhật
            </button>
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
    </Teleport>
  </Transition>
</template>
