import { useUi } from "@/composables/ui";
import { describe, expect, it } from "vitest";

describe("useUi", () => {
  const { getFilters } = useUi();

  it("should transform DataTableFilterMeta into a plain object", () => {
    const filters = {
      name: { value: "Truck A", matchMode: "startsWith" },
      status: "Active",
    };

    const expected = {
      name: "Truck A",
      status: "Active",
    };

    const result = getFilters(filters);
    expect(result).toEqual(expected);
  });

  it("should change empty value to undefined", () => {
    const filters = {
      name: { value: "", matchMode: "startsWith" },
    };

    const expected = {
      name: undefined,
    };

    const result = getFilters(filters);
    expect(result).toEqual(expected);
  });

  it("should return an empty object when no filters are provided", () => {
    const filters = {};

    const expected = {};

    const result = getFilters(filters);
    expect(result).toEqual(expected);
  });
});
