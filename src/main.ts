import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import Lara from "@/assets/presets/lara";

import App from "./App.vue";
import router from "./router";

import "primeicons/primeicons.css";
import "@/assets/css/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

app.directive("tooltip", Tooltip);

app.mount("#app");
