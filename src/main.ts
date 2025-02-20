import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
//Ant Design Vue 4.x 版本的新路径
import 'ant-design-vue/dist/reset.css'

//Ant Design Vue 3.x 版本的新路径
//npm install ant-design-vue@3.2.20  # 使用 3.x 版本
//import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(Antd)
app.mount('#app') 

/**
 * 这个文件是 Vue 项目的入口文件，主要作用是：
 * 
 * 1. 创建 Vue 应用实例
 * 2. 使用 Ant Design Vue 组件库
 * 3. 挂载应用到 DOM 中的指定元素
 * 
 * 4. 提供项目入口，确保项目能够正确启动
 * 
 * 5. 配置项目初始化行为
 * 
 * 
 */