import './assets/main.css'

import { createApp } from 'vue'
import VueGoogleMaps from 'vue-google-maps-community-fork'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDclRsTPAiKysxHZyYhZ4Qn0NBNO6ulHJ8',
    },
}).mount('#app')
