import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app) => {
  //app.use(ElementPlus, { locale })
  app.use(ElementPlus)
  //  统一注册el-icon图标
  // for (let iconName in ElementPlusIconsVue) {
  //   app.component(iconName, ElementPlusIconsVue[iconName])
  // }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  //app.use(ElementPlusIconsVue)
}
