import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const alert = ref('');
  const loading = ref(false);

  const setLoading = (status) => {
    loading.value = status;
  };

  const setAlert = (value) => {
    alert.value = value;
    loading.value = false;
  };

  const deleteAlert = () => {
    alert.value = null;
  };
  return { loading, alert, deleteAlert, setAlert, setLoading };
});
