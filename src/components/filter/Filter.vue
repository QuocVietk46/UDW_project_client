<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { category, status } from '@/assets/data';
import SearchInput from '@/components/inputs/searchInput.vue';

const router = useRouter();
const search = ref('');

const handleSubmit = async (values) => {
  router.push({
    name: 'ManagerProducts',
    query: {
      ...(search.value && { search: search.value }),
      ...(values.target.category.value && {
        category: values.target.category.value,
      }),
      ...(values.target.status.value && {
        status: values.target.status.value,
      }),
      ...(values.target.sort.value && { sort: values.target.sort.value }),
      ...(values.target.subSort.value && {
        subSort: values.target.subSort.value,
      }),
    },
  });
};
</script>
<template>
  <div>
    <SearchInput
      push="ManagerProducts"
      @value="search = $event"
      :showBtn="false"
    />
  </div>
  <form @submit.prevent="handleSubmit" class="flex gap-4">
    <div class="p-2 bg-white flex divide-x-2 rounded-3xl">
      <div class="px-1">
        <select name="category" class="cursor-pointer focus:outline-none">
          <option value="">Loại</option>
          <option v-for="item in category" :value="item.value">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="px-1">
        <select name="status" class="cursor-pointer focus:outline-none">
          <option value="all">Trạng thái</option>
          <option v-for="item in status" :value="item.value">
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="px-1">
        <select name="sort" class="cursor-pointer focus:outline-none">
          <option value="">Sắp xếp</option>
          <option value="price">Giá</option>
          <option value="date">Ngày ra mắt</option>
          <option value="quantity">Số lượng tồn</option>
        </select>
      </div>
      <div class="px-1">
        <select name="subSort" class="cursor-pointer focus:outline-none">
          <option value="inc">Tăng dần</option>
          <option value="dec">Giảm dần</option>
        </select>
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="py-2 px-4 font-medium bg-white rounded-3xl hover:shadow-md hover:bg-slate-200 transition-colors duration-200"
      >
        Tìm
      </button>
    </div>
  </form>
</template>
