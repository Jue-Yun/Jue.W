import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import Jues from './plugins/jues'

const app = createApp(App)
installElementPlus(app)
Jues.install(app)
app.mount('#app')