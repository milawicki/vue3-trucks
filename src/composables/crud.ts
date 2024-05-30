import { toRaw, type Component } from "vue";
import { useDialog } from "primevue/usedialog";
import { useConfirm } from "primevue/useconfirm";

import type { Optional } from "@/types";

type RemoveFunction<TData> = (data: TData) => Promise<Optional<boolean>>;

export function useCrud<TData>(
  detailsComponent: Component,
  formComponent: Component,
  removeFunction: RemoveFunction<TData>
) {
  const dialog = useDialog();
  const confirm = useConfirm();

  const dialogProps = {
    modal: true,
    style: { width: "25rem" },
  };

  function add() {
    dialog.open(formComponent, { props: dialogProps });
  }

  function edit(data: TData) {
    dialog.open(formComponent, { props: dialogProps, data: { ...toRaw(data) } });
  }

  function remove(data: TData) {
    confirm.require({
      message: "Are you sure you want to remove this item?",
      header: "Confirmation",
      acceptClass: "bg-red-500 border-red-500 hover:bg-red-600",
      rejectLabel: "Cancel",
      acceptLabel: "Remove",
      accept: () => removeFunction(toRaw(data)),
    });
  }

  function show(data: TData) {
    dialog.open(detailsComponent, {
      props: dialogProps,
      data: { ...toRaw(data) },
    });
  }

  return {
    add,
    edit,
    remove,
    show,
  };
}
