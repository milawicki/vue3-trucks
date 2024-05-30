import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", function () {
  const loading = ref(false);
  const isLoading = computed(() => loading.value);

  function setLoading(state: boolean) {
    loading.value = state;
  }

  //==

  const itemsPerPage = computed(() => +import.meta.env.VITE_ITEMS_PER_PAGE);

  return {
    isLoading,
    setLoading,

    itemsPerPage,
  };
});
