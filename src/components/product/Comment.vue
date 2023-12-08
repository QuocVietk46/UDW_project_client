<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useProductsStore } from "@/stores/productsStore";
import { useUserStore } from "@/stores/userStore";
import InputRating from "@/components/rating/InputRating.vue";
import ViewStar from "../rating/ViewStar.vue";

const productsStore = useProductsStore();
const userStore = useUserStore();

const route = useRoute();
const comments = storeToRefs(productsStore).comments;
const userId = storeToRefs(userStore).userId;
const rates = storeToRefs(productsStore).rates;

const getMyComment = () => {
  return (
    comments.value.find((comment) => comment.userId._id === userId.value)
      ?.comment || ""
  );
};
const comment = ref("" || getMyComment());

const getMyRating = () => {
  return (
    rates.value.find((rate) => rate.userId._id === userId.value)?.value || 0
  );
};
const rating = ref(getMyRating() || 0);
const isEdit = ref(false);

const isRated = () => {
  return rates.value.some((rate) => rate.userId._id === userId.value);
};

const handleComment = async () => {
  if (rating.value === 0 || comment.value === "") {
    return;
  }

  if (isRated()) {
    await productsStore.updateRateProductById(route.params.id, rating.value);
    await productsStore.updateCommentProductById(
      route.params.id,
      comment.value,
    );
    isEdit.value = false;
    return;
  }
  await productsStore.rateProductById(route.params.id, rating.value);
  await productsStore.commentProductById(route.params.id, comment.value);
};

const handleDeleteComment = async () => {
  if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;
  await productsStore.deleteRACProductById(route.params.id, userId.value);
  isEdit.value = false;
  comment.value = "";
  rating.value = 0;
};
</script>
<template>
  <section class="px-48">
    <div class="mb-4">
      <h2 class="py-4 text-lg font-medium">Đánh giá sản phẩm</h2>
      <div class="bg-gray-100">
        <div class="flex">
          <div class="flex-grow">
            <h1 class="text-center text-lg font-medium" v-if="isRated()">
              Đánh giá của bạn
            </h1>
            <div class="flex justify-center">
              <ViewStar :star="getMyRating()" v-if="isRated() && !isEdit" />
              <InputRating
                v-else
                :value="getMyRating() || 0"
                :max-stars="5"
                @onChange="
                  (value) => {
                    rating = value;
                  }
                "
              ></InputRating>
            </div>
            <textarea
              v-model="comment"
              placeholder="Nhập bình luận của bạn..."
              name="comment"
              :disabled="!isEdit && isRated()"
              class="clear-left w-full resize-none bg-inherit p-2 focus:outline-none"
            ></textarea>
          </div>
          <button
            v-if="isEdit || isRated() === false"
            type="submit"
            class="px-2 transition-all duration-300 ease-in-out"
            :class="comment.length > 0 && rating > 0 ? 'visible' : 'invisible'"
            @click="handleComment"
          >
            <i class="fa-solid fa-paper-plane text-blue-400"></i>
          </button>
        </div>
        <div class="flex justify-end gap-2 p-1" v-if="isRated()">
          <button
            class="hover:text-yellow-400"
            type="button"
            v-if="!isEdit"
            @click="isEdit = true"
          >
            Chỉnh sửa
          </button>
          <button
            class="hover:text-yellow-400"
            type="button"
            v-else
            @click="isEdit = false"
          >
            Huỷ
          </button>
          <button
            class="hover:text-red-600"
            type="button"
            @click="handleDeleteComment"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" class="bg-gray-100 p-3">
        <div class="flex items-center justify-between gap-2">
          <!-- info -->
          <div class="flex items-center gap-2">
            <img
              src="https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg"
              :alt="comment.userId.name"
              class="h-10 w-10 rounded-full"
            />
            <div class="flex flex-col">
              <h3 class="font-medium">{{ comment.userId.full_name }}</h3>
              <p class="text-sm opacity-80">
                {{
                  new Date(comment.createdAt).toLocaleString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ViewStar :star="comment.rate.value" />
        </div>
        <p class="text-lg">{{ comment.comment }}</p>
      </li>
    </ul>
    <h2 v-else class="p-2 text-center font-medium">
      Chưa có bình luận nào cho sản phẩm này. Hãy là người đầu tiên bình luận
    </h2>
  </section>
</template>
