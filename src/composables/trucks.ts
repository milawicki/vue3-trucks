import { type Truck, type TruckStatus } from "@/types";
import { useCrud } from "./crud";

import Form from "@/components/trucks/Form.vue";
import Details from "@/components/trucks/Details.vue";

import { useTrucksStore } from "@/stores/trucks";
import { computed } from "vue";

export function useTrucks() {
  const { deleteTruck } = useTrucksStore();

  const statusLabel = computed(() => ({
    OUT_OF_SERVICE: "Out of service",
    LOADING: "Loading",
    TO_JOB: "To job",
    AT_JOB: "At job",
    RETURNING: "Returning",
  }));

  function getStatusLabel(status: TruckStatus): string {
    return statusLabel.value[status];
  }

  function getStatusesLabels(limitTo?: TruckStatus[]): Partial<Record<TruckStatus, string>> {
    if (!limitTo?.length) {
      return statusLabel.value;
    }

    return (Object.keys(statusLabel.value) as TruckStatus[]).reduce((all, current) => {
      if (!limitTo.includes(current)) {
        return all;
      }

      return {
        ...all,
        [current]: statusLabel.value[current],
      };
    }, {});
  }

  return {
    ...useCrud(Details, Form, async (truck: Truck) => deleteTruck(truck.id)),

    getStatusLabel,
    getStatusesLabels,
  };
}
