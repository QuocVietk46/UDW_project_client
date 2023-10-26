import { getActivePinia } from 'pinia';

export function useResetStore() {
  localStorage.clear();
  const pinia = getActivePinia();

  if (!pinia) {
    throw new Error('There is no active Pinia instance');
  }

  const resetStore = {};

  pinia._s.forEach((store, name) => {
    resetStore[name] = () => store.$dispose();
  });

  resetStore.all = () => pinia._s.forEach((store) => store.$dispose());

  return resetStore;
}
