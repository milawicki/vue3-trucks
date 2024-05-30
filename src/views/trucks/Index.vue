<template>
  <PageHeader title="Trucks" @create="add" />
  <TrucksList ref="list" class="mt-4" :showActions="true" @edit="edit" @select="show" @remove="remove" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from "vue";

import { useTrucks } from "@/composables/trucks";
import { useTrucksStore } from "@/stores/trucks";
import type { Nullable } from "@/types";

import TrucksList from "@/components/trucks/List.vue";
import PageHeader from "@/components/core/PageHeader.vue";

const { add, edit, remove, show } = useTrucks();
const { subscribeToDataUpdate } = useTrucksStore();

const list: Ref<Nullable<typeof TrucksList>> = ref(null);

const unsubscribe = subscribeToDataUpdate(() => list.value?.getData());
onBeforeUnmount(unsubscribe);
</script>

<script lang="ts">
export default {
  name: "TrucksListView",
};
</script>
