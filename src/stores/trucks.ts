import { defineStore } from "pinia";

import type { Optional, SortOrder, SortableFields, Truck, TruckData, TruckFilters, TruckStatus } from "@/types";
import { trucks, getStatusTransition } from "@/domain/trucks";

import { useApi } from "@/composables/api";
import { useAppStore } from "./app";
import { useNotificationStore } from "./notification";

const { getAll, create, update, remove, validate } = trucks;

export const useTrucksStore = defineStore("trucks", function () {
  const { itemsPerPage } = useAppStore();
  const { addNotification } = useNotificationStore();

  const { handleApiCall } = useApi();

  async function getTrucks(
    filters?: TruckFilters,
    sort?: SortableFields,
    sortOrder?: SortOrder,
    page?: number
  ): Promise<Optional<Truck[]>> {
    return handleApiCall(() => getAll(filters, sort, sortOrder, page, itemsPerPage));
  }

  async function createTruck(truckData: TruckData) {
    return handleApiCall(async () => {
      await create({ ...truckData, status: "LOADING" });
      addNotification("Truck created successfully");
    });
  }

  async function updateTruck(truckId: number, truckData: TruckData) {
    return handleApiCall(async () => {
      const { status, ...data } = truckData;

      await update(truckId, data);
      addNotification("Truck updated successfully");
    });
  }

  async function deleteTruck(truckId: number): Promise<Optional<boolean>> {
    return handleApiCall(async () => {
      await remove(truckId);

      addNotification("Truck deleted successfully");

      return true;
    });
  }

  async function updateTruckStatus(truckId: number, status: TruckStatus) {
    return handleApiCall(async () => {
      await update(truckId, { status });
      addNotification("Truck status updated successfully");
    });
  }

  function subscribeToDataUpdate(callback: () => void) {
    return useTrucksStore().$onAction(({ name, after }) => {
      if (["createTruck", "updateTruck", "deleteTruck", "updateTruckStatus"].includes(name)) {
        after(callback);
      }
    });
  }

  return {
    getTrucks,
    createTruck,
    updateTruck,
    updateTruckStatus,
    deleteTruck,

    validate,
    getStatusTransition,

    subscribeToDataUpdate,
  };
});
