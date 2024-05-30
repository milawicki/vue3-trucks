<template>
  <Toast @close="removeNotification" />
</template>

<script setup lang="ts">
import { computed, watch } from "vue";

import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import { useNotificationStore } from "@/stores/notification";

const toast = useToast();
const notificationStore = useNotificationStore();

const activeNotification = computed(() => notificationStore.notification);

watch(activeNotification, () => {
  const { message, type } = activeNotification.value;

  if (!message) {
    return;
  }

  toast.add({ severity: type || "info", detail: message });
});

function removeNotification() {
  notificationStore.removeNotification();
}
</script>
