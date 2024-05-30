import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";

import type { Nullable } from "@/types";

export const useNotificationStore = defineStore("notification", () => {
  const notification: Ref<Nullable<string>> = ref(null);
  const type: Ref<Nullable<"success" | "error">> = ref(null);

  function addNotification(message: string) {
    notification.value = message;
    type.value = "success";
  }

  function addErrorNotification(message: string) {
    notification.value = message;
    type.value = "error";
  }

  function removeNotification() {
    notification.value = null;
    type.value = null;
  }

  return {
    notification: computed(() => ({
      message: notification.value,
      type: type.value,
    })),

    addNotification,
    addErrorNotification,
    removeNotification,
  };
});
