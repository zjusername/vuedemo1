<!--  手动显示导出组件，不写业务逻辑，使用组件时，显示组件名称为 HelloWorldCopy-->
<script lang="ts">
export default {
  name: 'MyCounter',
}
</script>

<script setup lang="ts">

// setup : vue3 的最佳实践语法
// lang="ts" : 表示使用 ts 语法
// setup 下无法使用 export default 来导出组件。
// 默认 vue 会默认使用文件名作为导出组件的名称。但是在组件使用时，可能语法检查会爆红线提示
// 可以新写一个script lang="ts" 来导出组件，不写业务逻辑，只写组件的名称，来显示导出组件。

import { ref, defineProps } from 'vue';
import { Button } from 'ant-design-vue';
import axios from 'axios';


/**
 * 使用ts 定义一个vue 的props 类型
 */
interface Props {
  /**
   * 界面标题
   */
  title: string;

  /**
   * 作者
   */
   author?: string;  // ？表示非必需，可选属性
}

// 定义 props，在使用组件时可以传递参数
defineProps<Props>();

/**
 * 或者这么定义
 * defineProps<any>();
 * 或者
 * defineProps<{
 *  title: string;
 *  author?: string;
 * }>();
 */

// 创建一个响应式引用,等同于： const message = ref<string>("");  // 显式类型标注
const message = ref(""); 
const num1 = ref(0);
const num2 = ref(0);
const inputValue1 = ref("");
const inputValue2 = ref("");
const selectData = ref("1");

// 方法定义
// async 表示异步函数，await 表示等待异步函数执行完成
const calc = async () => {
  try {
    const response = await axios.post("/calculator/calc", {
      num1: inputValue1.value,
      num2: inputValue2.value,
      opt: selectData.value
    });
    num2.value = response.data;
    message.value += response.data + ",";
  } catch (error) {
    console.error('请求出错:', error);
  }
};

const add = async () => {
  try {
    const response = await axios.get('/calculator/add?num1=1&num2=1');
    num1.value = response.data;
    message.value += response.data + ",";
  } catch (error) {
    console.error('请求出错:', error);
  }
};

const fetchData = () => {
  message.value = "";
  calc();
  add();
};
</script>



<template>
  <p>界面标题：{{ title }} ，作者：{{ author }}</p>
  <div>
    输入第一个数字:<input v-model="inputValue1" type="text" placeholder="请输入内容">

    <form action="" id="yunsuan">
      <select name="" id="" v-model="selectData">
        <option value="1">加</option>
        <option value="2">减</option>
      </select>
    </form>

    输入第二个数字:<input v-model="inputValue2" type="text" placeholder="请输入内容">
    <p>你输入的内容是：{{ inputValue1 }} {{ inputValue2 }}</p>
    <Button type="primary" @click="fetchData">确定</Button>
    <p>结果：{{ num2 }}</p>

    <p>getReturn: {{ num1 }}, PostReturn: {{ num2 }}</p>
    <p>msg: {{ message }}</p>
  </div>
</template>

<style scoped>
</style>