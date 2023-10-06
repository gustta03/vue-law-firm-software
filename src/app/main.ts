import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css';
import 'devextreme/dist/css/dx.light.css';

import App from './App.vue'
import router from './router'
import { makeRemoteSaveCases } from '../main/factories/usecases/cases/save-case-factory';
import Provider from '../app/providers/providers'
import { makeRemoteLoadCustomer } from '../main/factories/usecases/customer/load-customer-factory';

const app = createApp(App)
app.provide('saveCaseUseCase', makeRemoteSaveCases)
// for(const provider of Provider) {
//  app.provide(provider.key, provider.provider)
// }
app.provide('customer', makeRemoteLoadCustomer)
app.use(createPinia())
app.use(router)

app.mount('#app')
