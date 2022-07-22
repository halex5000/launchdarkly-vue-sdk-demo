import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button';
import Image from 'primevue/image';
import Panel from 'primevue/image';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import ProgressBar from 'primevue/progressbar';
import ToastService from 'primevue/toastservice';

import { LDPlugin, LDPluginOptions } from 'launchdarkly-vue-client-sdk'

import 'primevue/resources/themes/fluent-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue);

const launchDarklyPluginOptions: LDPluginOptions = {
    clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
};

app.use(LDPlugin, launchDarklyPluginOptions)
app.use(ToastService);
app.component('Button', Button);
app.component('Image', Image);
app.component('Panel', Panel);
app.component('Message', Message);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toast', Toast);
app.component('ProgressBar', ProgressBar);

app.mount('#app');
