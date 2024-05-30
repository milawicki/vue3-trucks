import type { TruckStatus } from "@/types";
import type { StatusTransition } from "./types";

export class ReturningStatusTransition implements StatusTransition {
  availableTransitions(): TruckStatus[] {
    return ["OUT_OF_SERVICE", "LOADING"];
  }
}
