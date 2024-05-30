<template>
  <Menubar :model="items" />
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";

const items: Ref<MenuItem[]> = ref([
  { label: "Dashboard", icon: "pi pi-fw pi-home", url: "/" },
  { label: "Trucks", icon: "pi pi-fw pi-truck", url: "/trucks" },
]);
</script>
