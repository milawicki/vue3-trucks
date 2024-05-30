<template>
  <div class="loader" v-if="isLoading">
    <ProgressSpinner class="spinner" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProgressSpinner from "primevue/progressspinner";

import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const isLoading = computed(() => appStore.isLoading);
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
}

.spinner {
  width: 25px;
  height: 25px;
}
</style>
