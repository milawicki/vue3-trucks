import type { DataTableFilterMeta, DataTableFilterMetaData } from "primevue/datatable";

export function useUi() {
  /**
   * Converts DataTableFilterMeta into Record eg {}
   */
  function getFilters<T extends Record<string, unknown>>(filters: DataTableFilterMeta): T {
    return Object.keys(filters).reduce(
      (all, filter) => ({
        ...all,
        [filter]:
          (typeof filters[filter] === "string"
            ? filters[filter]
            : (filters[filter] as DataTableFilterMetaData).value) || undefined,
      }),
      {} as T
    );
  }

  return {
    getFilters,
  };
}
