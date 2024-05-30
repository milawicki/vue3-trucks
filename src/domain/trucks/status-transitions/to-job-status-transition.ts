import type { TruckStatus } from "@/types";
import type { StatusTransition } from "./types";

export class ToJobStatusTransition implements StatusTransition {
  availableTransitions(): TruckStatus[] {
    return ["OUT_OF_SERVICE", "AT_JOB"];
  }
}
