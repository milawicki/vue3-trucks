import type { TruckStatus } from "@/types";

import type { StatusTransition } from "./types";

import { OutOfServiceStatusTransition } from "./out-of-service-status-transition";
import { LoadingStatusTransition } from "./loading-status-transition";
import { ToJobStatusTransition } from "./to-job-status-transition";
import { AtJobStatusTransition } from "./at-job-status-transition";
import { ReturningStatusTransition } from "./returning-status-transition";

const map: Record<TruckStatus, StatusTransition> = {
  OUT_OF_SERVICE: new OutOfServiceStatusTransition(),
  LOADING: new LoadingStatusTransition(),
  TO_JOB: new ToJobStatusTransition(),
  AT_JOB: new AtJobStatusTransition(),
  RETURNING: new ReturningStatusTransition(),
};

export function getStatusTransition(status: TruckStatus): StatusTransition {
  return map[status];
}
