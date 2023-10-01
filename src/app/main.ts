import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css';
import 'devextreme/dist/css/dx.light.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
