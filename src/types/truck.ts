import type { DeepPartial } from "./generic";

export interface Truck {
  id: number;
  code: string;
  name: string;
  status: TruckStatus;
  description?: string;
}

export type TruckData = Omit<Truck, "id">;

export const TruckStatuses = ["OUT_OF_SERVICE", "LOADING", "TO_JOB", "AT_JOB", "RETURNING"] as const;
export type TruckStatus = (typeof TruckStatuses)[number];

export type SortableFields = "id" | "code" | "name" | "status";
export type TruckFilters = DeepPartial<Truck>;
