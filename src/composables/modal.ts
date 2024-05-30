import type { Optional } from "@/types";
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import { inject, type Ref } from "vue";

export function useModal() {
  const dialogRef: Optional<Ref<DynamicDialogInstance>> = inject("dialogRef");

  function closeModal() {
    dialogRef?.value?.close();
  }

  function getData<T>(): Optional<T> {
    return dialogRef?.value?.data;
  }

  function setModalHeader(header: string) {
    if (!dialogRef?.value.options.props) {
      return;
    }

    dialogRef.value.options.props.header = header;
  }

  return {
    closeModal,
    getData,
    setModalHeader,
  };
}
