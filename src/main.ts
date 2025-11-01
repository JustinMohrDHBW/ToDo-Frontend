import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue'
import router from './router'
import { initializeAuthenticatedClient } from './composables/apiClient'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(ToastPlugin)
app.use(router)

// Initialize auth client and setup auth listener after Pinia is set up
initializeAuthenticatedClient()
const authStore = useAuthStore()
authStore.setupAuthListener()

app.mount('#app')
