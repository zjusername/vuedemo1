import { createApp } from 'vue';
import App from './App.vue';
//全局导入ant-design-v
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

//import axios from 'axios';



const app = createApp(App);

app.use(Antd);
//app.use(axios);
app.mount('#app');
