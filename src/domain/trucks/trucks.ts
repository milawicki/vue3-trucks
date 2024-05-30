import type { SortableFields, Truck, TruckData, TruckFilters } from "@/types";
import { createRestClient } from "../rest-client";

function validate(truckData: TruckData): boolean | (keyof TruckData)[] {
  const errors: (keyof TruckData)[] = [];

  if (!truckData.code) {
    errors.push("code");
  }

  if (!truckData.code.match(/^[0-9A-z]+$/)) {
    errors.push("code");
  }

  if (!truckData.name) {
    errors.push("name");
  }

  return errors.length ? errors : true;
}

export const trucks = {
  ...createRestClient<Truck, TruckData, TruckFilters, SortableFields>("trucks"),

  validate,
};
