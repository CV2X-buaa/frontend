import { createRouter, createWebHistory } from 'vue-router';
import AppFull from './App_full.vue';
import AppTable from './App_table.vue';
import AppDetect from './App_detect.vue';
import AppWarn from './App_warn.vue';
import AppOBU from './App_obu.vue';

const routes = [
    { path: '', component: AppFull },
    { path: '/full', component: AppFull },
    { path: '/table', component: AppTable },
    { path: '/detect', component: AppDetect},
    { path: '/warn', component: AppWarn },
    {path:'/obu',component:AppOBU},
    // 可以添加更多的路由规则
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
