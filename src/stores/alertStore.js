import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const alert = ref('');
  const type = ref('');
  const invalidToken = ref(false);

  const setInvalidToken = (status) => {
    invalidToken.value = status;
  };

  const setAlert = ({
    message = '',
    typeAlert = 'error',
    isInvalidToken = false,
  }) => {
    alert.value = message;
    type.value = typeAlert;
    invalidToken.value = isInvalidToken;
  };

  const resetAlert = () => {
    alert.value = '';
    type.value = '';
    invalidToken.value = false;
  };

  const deleteAlert = () => {
    alert.value = '';
    type.value = '';
  };
  return {
    alert,
    type,
    invalidToken,
    resetAlert,
    setInvalidToken,
    deleteAlert,
    setAlert,
  };
});
