import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import Jues from './plugins/jues'
import Apis from './plugins/apis'

const app = createApp(App)
installElementPlus(app)
Jues.install(app)
Apis.install(app)
app.mount('#app')

const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}