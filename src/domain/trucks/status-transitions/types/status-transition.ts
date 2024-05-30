import type { TruckStatus } from "@/types";

export interface StatusTransition {
  availableTransitions(): TruckStatus[];
}
