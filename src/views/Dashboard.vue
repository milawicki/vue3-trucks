<template>
  <PageHeader title="Dashboard" hideCreateButton />

  <div class="container mx-auto px-4 flex flex-wrap justify-between">
    <div class="w-1/3 p-4">
      <h2 class="text-xl font-semibold my-4">Out of service trucks</h2>
      <TrucksList size="small" status="OUT_OF_SERVICE" />
    </div>
    <div class="w-1/3 p-4">
      <h2 class="text-xl font-semibold my-4">At job trucks</h2>
      <TrucksList size="small" status="AT_JOB" />
    </div>
    <div class="w-1/3 p-4">
      <h2 class="text-xl font-semibold my-4">Returning trucks</h2>
      <TrucksList size="small" status="RETURNING" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/core/PageHeader.vue";
import TrucksList from "@/components/trucks/List.vue";
</script>

<script lang="ts">
export default {
  name: "DashboardView",
};
</script>
