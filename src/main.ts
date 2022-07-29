import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Panel from 'primevue/image';
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import ProgressBar from 'primevue/progressbar';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';


import { LDPlugin, LDPluginOptions } from 'launchdarkly-vue-client-sdk'

import 'primevue/resources/themes/fluent-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  
import 'primeflex/primeflex.css';

const routes = [{ path: "/", component: App }];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.use(PrimeVue);

if (import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID) {
    const launchDarklyPluginOptions: LDPluginOptions = {
        clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
    };
    app.use(LDPlugin, launchDarklyPluginOptions)
}

app.use(ToastService);
app.component('Card', Card);
app.component('Button', Button);
app.component('Image', Image);
app.component('Panel', Panel);
app.component('Message', Message);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toast', Toast);
app.component('ProgressBar', ProgressBar);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('Menu', Menu);
app.component('PanelMenu', PanelMenu);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.mount('#app');
