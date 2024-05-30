<template>
  <div class="flex justify-between items-center mb-3">
    <strong>ID</strong>
    {{ truck?.id }}
  </div>

  <div class="flex justify-between items-center mb-3">
    <strong>Code</strong>
    {{ truck?.code }}
  </div>

  <div class="flex justify-between items-center mb-3">
    <strong>Name</strong>
    {{ truck?.name }}
  </div>

  <div v-if="truck?.description" class="flex justify-between items-center mb-3">
    <strong>Description</strong>
    {{ truck.description }}
  </div>

  <div v-if="truck?.status" class="flex justify-between items-center mb-3">
    <strong>Status</strong>
    {{ getStatusLabel(truck.status) }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Optional, Truck } from "@/types";
import { useModal } from "@/composables/modal";
import { useTrucks } from "@/composables/trucks";

const { setModalHeader, getData } = useModal();
const { getStatusLabel } = useTrucks();

const truck = computed((): Optional<Truck> => getData());

setModalHeader("Truck Details");
</script>

<script lang="ts">
export default {
  name: "TruckDetails",
};
</script>
