import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrapcss from './bootstrap-dist/css/bootstrap.min.css'
import bootstrapjs from './bootstrap-dist/js/bootstrap.bundle'
createApp(App).use(store,bootstrapcss,bootstrapjs).use(router).mount('#app')
