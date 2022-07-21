import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button';
import Image from 'primevue/image';
import { LDPlugin, LDPluginOptions } from 'launchdarkly-vue-client-sdk'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  

const app = createApp(App);
app.use(PrimeVue);

const launchDarklyPluginOptions: LDPluginOptions = {
    clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
};

app.use(LDPlugin, launchDarklyPluginOptions)

app.component('Button', Button);
app.component('Image', Image);

app.mount('#app');
