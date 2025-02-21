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
const app = (a:number)=>{
  alert(a)
}

</script>

<template>
  <div style="padding: 20px 0;font-size: 14px;">界面标题：{{ title }} ，作者：{{ author }}</div>
  <div style="width: 500px;">
    <Collapse v-model:activeKey="activeKey">
      <Panel key="1" header="计算器">
        <div style="width:170px">
          <div style="margin-bottom: 15px;padding: 5px 3px;border: 1px solid #f5f5f5;">
            <Input placeholder="此处显示数字" readonly width="100%" />
            
          </div>
          <div>
            <Button type="primary" shape="round" @click="app(7)">7</Button>
            <Button type="primary" shape="round" @click="app(8)" v-text="8" ></Button>
            <Button type="primary" shape="round" @click="app(9)" v-text="9" ></Button>
            <Button type="primary" shape="round" class="calc-opt">/</Button>
            <br />
            <Button type="primary" shape="round" @click="app(4)" v-text="4" ></Button>
            <Button type="primary" shape="round" @click="app(5)" v-text="5" ></Button>
            <Button type="primary" shape="round" @click="app(6)" v-text="6" ></Button>
            <Button type="primary" shape="round" class="calc-opt">*</Button>
            <br />
            <Button type="primary" shape="round" @click="app(1)" v-text="1" ></Button>
            <Button type="primary" shape="round" @click="app(2)" v-text="2" ></Button>
            <Button type="primary" shape="round" @click="app(3)" v-text="3" ></Button>
            <Button type="primary" shape="round" class="calc-opt">-</Button>
            <br />
            <Button type="primary" shape="round" @click="app(0)" v-text="0" ></Button>
            <Button type="primary" shape="round">.</Button>
            <Button type="primary" shape="round" style="background-color: black;">=</Button>
            <Button type="primary" shape="round" class="calc-opt">+</Button>
          </div>
        </div>

      </Panel>
    </Collapse>
  </div>
</template>

<style scoped>
.calc-opt {
  background-color: mediumturquoise;
}
</style>
