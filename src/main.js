
import { createApp } from 'vue'
import App from './App_router.vue'
import router from '@/router'; // 导入路由配置文件
import echarts from 'echarts';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(router)
// app.prototype.echarts = echarts
app.use(echarts)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')


