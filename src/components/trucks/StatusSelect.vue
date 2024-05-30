<template>
  <Dropdown
    :options="statuses"
    option-label="label"
    option-value="value"
    placeholder="Select"
    @change="({ value }) => emit('change', value)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import Dropdown from "primevue/dropdown";

import { useTrucks } from "@/composables/trucks";
import type { TruckStatus } from "@/types";
import { useTrucksStore } from "@/stores/trucks";

const { getStatusesLabels } = useTrucks();
const { getStatusTransition } = useTrucksStore();

const props = withDefaults(
  defineProps<{
    statusesToShow?: "all" | "transition";
    currentStatus?: TruckStatus;
  }>(),
  {
    statusesToShow: "all",
  }
);

const emit = defineEmits<{
  (event: "change", status: TruckStatus): void;
}>();

const statuses = computed(() => {
  const limitTo =
    props.statusesToShow === "transition" && props.currentStatus
      ? getStatusTransition(props.currentStatus).availableTransitions()
      : [];

  const statuses = getStatusesLabels(limitTo);

  return (Object.keys(statuses) as TruckStatus[]).map((status) => ({
    label: statuses[status],
    value: status,
  }));
});
</script>
