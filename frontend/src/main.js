import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'   
// import 'primeflex/themes/primeone-dark.css'   
import Aura from '@primevue/themes/aura';

//in main.js
// import 'primevue/resources/themes/aura-light-green/theme.css'

import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


const app = createApp(App)
// app.use(PrimeVue)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        // options: {
        //     prefix: 'p',
        //     darkModeSelector: 'system',
        //     cssLayer: false
        // }
    }
});
app.component('InputText',InputText)
app.component('Dialog',Dialog)
app.component('Button',Button)

app.mount('#app')
