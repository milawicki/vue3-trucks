<template>
  <div>
    <DataTable
      v-model:filters="filters"
      lazy
      showGridlines
      stripedRows
      :value="trucks"
      :size="size"
      editMode="cell"
      filterDisplay="menu"
      filter
      @sort="updateData"
      @filter="updateData"
    >
      <template #empty> No trucks found</template>

      <Column field="id" header="ID" sortable filterField="id" :showFilterMatchModes="false">
        <template #filter="{ filterModel }">
          <InputNumber v-model="filterModel.value" />
        </template>
      </Column>

      <Column field="code" header="Code" sortable filterField="code" :showFilterMatchModes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" />
        </template>
      </Column>

      <Column field="name" header="Name" sortable filterField="name" :showFilterMatchModes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" />
        </template>

        <template #body="{ data }">
          {{ data.name }}
          <Chip v-if="data.description" v-tooltip="data.description" icon="pi pi-info" class="m-0" />
        </template>
      </Column>

      <Column
        field="status"
        header="Status"
        sortable
        filterField="status"
        :showFilterMatchModes="false"
        :showFilterMenu="!status"
      >
        <template #filter="{ filterModel }">
          <StatusSelect v-model="filterModel.value" />
        </template>

        <template #body="{ data }">
          {{ getStatusLabel(data.status) }}
          <i class="pi pi-pencil cursor-pointer ml-2 text-xs" size="small" />
        </template>

        <template #editor="{ data }">
          <StatusSelect
            statusesToShow="transition"
            :currentStatus="data.status"
            @change="(status) => updateTruckStatus(data.id, status)"
          />
        </template>
      </Column>

      <Column v-if="showActions" header="Actions">
        <template #body="{ data }">
          <div class="flex justify-center items-center gap-2">
            <Button icon="pi pi-eye" severity="info" size="small" @click="emit('select', data)" />
            <Button icon="pi pi-pencil" size="small" @click="emit('edit', data)" />
            <Button icon="pi pi-times" severity="danger" size="small" @click="emit('remove', data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    {{ allPages }}

    <Pagination :allPages="allPages" @updated="changePage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";

import DataTable, { type DataTableFilterMeta, type DataTableSortEvent } from "primevue/datatable";
import Column from "primevue/column";
import Chip from "primevue/chip";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import StatusSelect from "./StatusSelect.vue";
import Pagination from "@/components/core/Pagination.vue";

import { useTrucksStore } from "@/stores/trucks";
import {
  type TruckFilters,
  type Optional,
  type SortOrder,
  type SortableFields,
  type Truck,
  type TruckStatus,
} from "@/types";
import { useTrucks } from "@/composables/trucks";
import { useUi } from "@/composables/ui";
import { useAppStore } from "@/stores/app";

const { getTrucks, updateTruckStatus } = useTrucksStore();

const { getStatusLabel } = useTrucks();
const { getFilters } = useUi();
const { itemsPerPage } = useAppStore();

const trucks: Ref<Optional<Truck[]>> = ref();

onMounted(getData);

const props = defineProps<{
  size?: "small" | "large";
  status?: TruckStatus;
  showActions?: boolean;
}>();

const emit = defineEmits<{
  (event: "select", data: Truck): void;
  (event: "edit", data: Truck): void;
  (event: "remove", data: Truck): void;
}>();

defineExpose({ getData });

const filters: Ref<DataTableFilterMeta> = ref({
  id: "",
  code: "",
  name: "",
  status: {
    value: props.status ?? "",
    matchMode: undefined,
  },
});

const currentPage = ref(1);
const allPages = ref(1);

const sortField: Ref<Optional<SortableFields>> = ref(undefined);
const sortOrder: Ref<Optional<SortOrder>> = ref(undefined);

async function getData() {
  const _filters = getFilters<TruckFilters>(filters.value);

  trucks.value = await getTrucks(_filters, sortField.value, sortOrder.value, currentPage.value);

  updatePagination();
}

function updatePagination() {
  if (trucks.value?.length === itemsPerPage && currentPage.value === allPages.value) {
    allPages.value += 1;
  }
}

function updateData(event: DataTableSortEvent) {
  sortField.value = event.sortField as SortableFields;
  sortOrder.value = event.sortOrder ? (event.sortOrder === 1 ? "asc" : "desc") : undefined;

  getData();
}

function changePage(page?: number) {
  if (!page) {
    return;
  }

  currentPage.value = page;
  getData();
}
</script>

<script lang="ts">
export default {
  name: "TrucksList",
};
</script>
