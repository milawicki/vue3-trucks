<template>
  <div class="flex items-center">
    <h1 class="text-3xl font-bold">{{ title }}</h1>

    <button
      v-if="!hideCreateButton"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
      @click="emits('create')"
    >
      <i class="pi pi-plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  hideCreateButton?: boolean;
}>();

const emits = defineEmits<{
  (event: "create"): void;
}>();
</script>
