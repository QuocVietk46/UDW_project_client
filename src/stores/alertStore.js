import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const alert = ref('');
  const type = ref('');
  const invalidToken = ref(false);

  const setInvalidToken = (status) => {
    invalidToken.value = status;
  };

  const setAlert = ({ message, type }) => {
    alert.value = message;
    type.value = type;
  };

  const deleteAlert = () => {
    alert.value = '';
    type.value = '';
  };
  return { alert, type, setInvalidToken, deleteAlert, setAlert };
});
