<script lang="ts">
export default {
  name: 'MyCounter',
}
</script>

<script setup lang="ts">

import { ref, defineProps, watch } from 'vue';
import { Button,Input,Textarea } from 'ant-design-vue';
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

const activeKey = ref(['1']);


//post
const calc = async () => {
  try {
    const response = await axios.post("/calculator/calc", {
      num1: 0,
      num2: 0,
      opt: 1
    });
  } catch (error) {
    console.error('请求出错:', error);
  }
};



</script>

<template>
  <div style="padding: 20px 0;font-size: 14px;">界面标题：{{ title }} ，作者：{{ author }}</div>
  <div style="width: 500px;">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="计算器">
        <div style="width:170px">
          <div style="margin-bottom: 15px;padding: 5px 3px;border: 1px solid #f5f5f5;">
            <Input placeholder="此处显示数字" readonly width="100%" />
          </div>
          <div>
            <Button type="primary" shape="round">7</Button>
            <a-button type="primary" shape="round" v-text="8" />
            <a-button type="primary" shape="round" v-text="9" />
            <a-button type="primary" shape="round" class="calc-opt">/</a-button>
            <br />
            <a-button type="primary" shape="round" v-text="4" />
            <a-button type="primary" shape="round" v-text="5" />
            <a-button type="primary" shape="round" v-text="6" />
            <a-button type="primary" shape="round" class="calc-opt">*</a-button>
            <br />
            <a-button type="primary" shape="round" v-text="1" />
            <a-button type="primary" shape="round" v-text="2" />
            <a-button type="primary" shape="round" v-text="3" />
            <a-button type="primary" shape="round" class="calc-opt">-</a-button>
            <br />
            <a-button type="primary" shape="round" v-text="0" />
            <a-button type="primary" shape="round">.</a-button>
            <a-button type="primary" shape="round" style="background-color: black;">=</a-button>
            <a-button type="primary" shape="round" class="calc-opt">+</a-button>
          </div>
        </div>

      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<style scoped>
.calc-opt {
  background-color: mediumturquoise;
}
</style>
