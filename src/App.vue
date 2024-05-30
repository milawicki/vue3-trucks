<script setup lang="ts">
import { RouterView } from "vue-router";

import DynamicDialog from "primevue/dynamicdialog";
import ConfirmDialog from "primevue/confirmdialog";

import MainMenu from "@/components/core/MainMenu.vue";
import Notification from "@/components/core/Notification.vue";
import Loader from "@/components/core/Loader.vue";
</script>

<template>
  <MainMenu />
  <Notification />
  <Loader />

  <div class="container mx-12 my-5">
    <RouterView />
  </div>

  <DynamicDialog />
  <ConfirmDialog />
</template>
