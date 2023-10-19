import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const search = ref('');
  const category = ref('');
  const sort = ref('');
  const status = ref('');

  const setSearch = ({ search, category, sort, status }) => {
    this.search.value = search;
    this.category.value = category;
    this.sort.value = sort;
    this.status.value = status;
  };

  const resetSearch = () => {
    this.search.value = '';
    this.category.value = '';
    this.sort.value = '';
    this.status.value = '';
  };

  return { status, search, category, sort, setSearch, resetSearch };
});
