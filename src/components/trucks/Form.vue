<template>
  <form @submit.prevent="submit">
    <Message v-if="fieldsWithError?.length" severity="error" :closable="false">Please fix form data</Message>

    <p class="mb-3 text-right">
      <small>* required fields</small>
    </p>

    <div class="flex mb-3 flex-col">
      <div class="flex justify-between items-center">
        <label for="code">Code *</label>
        <InputText
          id="code"
          v-model="truck.code"
          placeholder="Enter unique code"
          :invalid="fieldsWithError.includes('code')"
        />
      </div>

      <small class="text-right">Only alphanumeric characters are allowed</small>
    </div>
    <div class="flex justify-between items-center mb-3">
      <label for="name">Name *</label>
      <InputText id="name" v-model="truck.name" placeholder="Enter name" :invalid="fieldsWithError.includes('name')" />
    </div>
    <div class="flex justify-between items-center mb-3">
      <label for="description">Description</label>
      <Textarea
        id="description"
        v-model="truck.description"
        rows="3"
        placeholder="Enter description (optional)"
        :invalid="fieldsWithError.includes('description')"
      />
    </div>

    <div class="flex justify-between items-center mb-3">
      <Button label="Cancel" @click="closeModal" severity="danger" size="small" />
      <Button label="Submit" @click="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from "vue";

import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Message from "primevue/message";

import { useTrucksStore } from "@/stores/trucks";
import type { Optional, Truck, TruckData } from "@/types";
import { useModal } from "@/composables/modal";

const { createTruck, validate, updateTruck } = useTrucksStore();
const { closeModal, getData, setModalHeader } = useModal();

const initData = computed((): Optional<Truck> => getData());
const isInEditMode = computed(() => Boolean(initData.value?.id));

const truck: Ref<TruckData> = ref(
  initData.value || {
    code: "",
    name: "",
    status: "LOADING",
  }
);

const fieldsWithError: Ref<(keyof TruckData)[]> = ref([]);

setModalHeader(`${isInEditMode.value ? "Edit" : "Add"} Truck`);

function submit() {
  const validation = validate(truck.value);

  if (validation !== true) {
    fieldsWithError.value = validation as unknown as (keyof TruckData)[];

    return;
  }

  !isInEditMode.value ? createTruck(truck.value) : updateTruck(initData.value!.id, truck.value);

  closeModal();
}
</script>

<script lang="ts">
export default {
  name: "TruckForm",
};
</script>
