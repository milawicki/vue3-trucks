<template>
  <Paginator
    :rows="itemsPerPage"
    :totalRecords="totalItems"
    template="PrevPageLink NextPageLink"
    @page="({ page }) => emits('updated', page + 1)"
  />
</template>

<script setup lang="ts">
import Paginator from "primevue/paginator";

import { useAppStore } from "@/stores/app";
import { computed } from "vue";

const { itemsPerPage } = useAppStore();

const props = defineProps<{
  allPages: number;
}>();

const emits = defineEmits<{
  (event: "updated", page?: number): void;
}>();

const totalItems = computed(() => props.allPages * itemsPerPage);
</script>
