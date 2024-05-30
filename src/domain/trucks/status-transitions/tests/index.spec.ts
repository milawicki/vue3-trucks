import { describe, expect, it } from "vitest";
import { getStatusTransition } from "../index";

describe("should return available status transitions", () => {
  it("for OUT_OF_SERVICE", () => {
    expect(getStatusTransition("OUT_OF_SERVICE").availableTransitions()).toEqual([
      "OUT_OF_SERVICE",
      "LOADING",
      "TO_JOB",
      "AT_JOB",
      "RETURNING",
    ]);
  });

  it("for LOADING", () => {
    expect(getStatusTransition("LOADING").availableTransitions()).toEqual(["OUT_OF_SERVICE", "TO_JOB"]);
  });

  it("for TO_JOB", () => {
    expect(getStatusTransition("TO_JOB").availableTransitions()).toEqual(["OUT_OF_SERVICE", "AT_JOB"]);
  });

  it("for AT_JOB", () => {
    expect(getStatusTransition("AT_JOB").availableTransitions()).toEqual(["OUT_OF_SERVICE", "RETURNING"]);
  });

  it("for RETURNING", () => {
    expect(getStatusTransition("RETURNING").availableTransitions()).toEqual(["OUT_OF_SERVICE", "LOADING"]);
  });
});
