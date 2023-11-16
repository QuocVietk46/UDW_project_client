<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useProductsStore } from "@/stores/productsStore";
import { useUserStore } from "@/stores/userStore";

const productsStore = useProductsStore();
const userStore = useUserStore();

const route = useRoute();
const comments = storeToRefs(productsStore).comments;
const comment = ref("");
const userId = storeToRefs(userStore).userId;

const handleComment = async () => {
  if (!comment.value) return;
  await productsStore.commentProductById(route.params.id, comment.value);
  comment.value = "";
};

const handleDeleteComment = async (commentId) => {
  console.log(commentId);
  if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;

  await productsStore.deleteCommentProductById(commentId);
};
</script>
<template>
  <section class="px-48">
    <div>
      <h2>Bình luận sản phẩm</h2>
      <form class="flex bg-gray-200" @submit.prevent="">
        <textarea
          v-model="comment"
          name="comment"
          class="w-full resize-none bg-inherit p-2 focus:outline-none"
        ></textarea>
        <button
          type="submit"
          class="px-2 transition-all duration-300 ease-in-out"
          :class="comment.length > 0 ? 'visible' : 'invisible'"
          @click="handleComment"
        >
          <i class="fa-solid fa-paper-plane text-blue-400"></i>
        </button>
      </form>
    </div>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" class="py-3">
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
          <!-- actions -->
          <div v-if="comment.userId._id === userId">
            <button class="p-2 hover:bg-green-500 hover:text-white">
              Chỉnh sửa
            </button>
            <button
              class="p-2 hover:bg-red-500 hover:text-white"
              @click="handleDeleteComment(comment._id)"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="text-lg">{{ comment.comment }}</p>
      </li>
    </ul>
    <h2 v-else class="p-2 text-center font-medium">
      Chưa có bình luận nào cho sản phẩm này. Hãy là người đầu tiên bình luận
    </h2>
  </section>
</template>
