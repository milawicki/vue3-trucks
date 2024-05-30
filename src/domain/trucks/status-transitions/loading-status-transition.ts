import type { TruckStatus } from "@/types";
import type { StatusTransition } from "./types";

export class LoadingStatusTransition implements StatusTransition {
  availableTransitions(): TruckStatus[] {
    return ["OUT_OF_SERVICE", "TO_JOB"];
  }
}
