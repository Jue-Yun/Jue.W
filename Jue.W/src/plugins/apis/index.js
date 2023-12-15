import Jues from '../jues';
import { getCurrentInstance } from "vue";

/**
 * Apis插件
 */
class Apis {
    /**
     * Apis插件
     * @param {Jues} jues 
     */
    constructor(jues) {
    }
}

let obj = {
    /**
     * 安装
     * @param {App<Element>} app 
     */
    install: function (app) {
        app.config.globalProperties.$apis = new Apis(app.config.globalProperties.$jues);
    },
    /**
     * 获取Global对象
     */
    getGlobal: () => {
        // 获取全局组件
        const instance = getCurrentInstance();
        const global = instance?.appContext.config.globalProperties;
        return global;
    },
    /**
     * 获取当前Apis对象
     * @returns {Apis}
     */
    getCurrent: () => {
        // 获取全局组件
        const instance = getCurrentInstance();
        const global = instance?.appContext.config.globalProperties;
        return global.$apis;
    }
}

// 外部暴露
export default obj;