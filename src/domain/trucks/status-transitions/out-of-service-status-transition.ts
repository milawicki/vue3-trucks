import { TruckStatuses, type TruckStatus } from "@/types";
import type { StatusTransition } from "./types";

export class OutOfServiceStatusTransition implements StatusTransition {
  availableTransitions(): TruckStatus[] {
    return [...TruckStatuses];
  }
}
