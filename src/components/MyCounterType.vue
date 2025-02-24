<script lang="ts">
export default {
  name: 'MyCounterType',
}
</script>

<script setup lang="ts">  
import { ref, defineProps, watch, initCustomFormatter } from 'vue';
import { Button,Input,Textarea,CollapsePanel,Collapse } from 'ant-design-vue';
import axios from 'axios';

import MyCounter2 from './MyCounter2.vue';



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

//创建响应式数据
const inputValue =ref('') //显示操作符
const numberOne=ref<number|null>(null)
const opt=ref('')
const numberTow=ref<number|null>(null)
const isCalculated=ref(true) //标记是否完成第一次运算
const inputValueTemp=ref('')//记录第二个数值
//ts计算
//当前bug输入0数值使用运算符数值等于就会报错
const calc=()=>{
  numberOne.value=eval(inputValue.value)
  inputValue.value=String(numberOne.value)
}
  //接收计算器按钮的值
const numberButton = (number:string)=>{
  inputValue.value+=number
  console.log(inputValue.value)
}
//清空input
const clearDisplay=()=>{ 
  inputValue.value=''
  inputValueTemp.value=''
}
//添加小数点
const poInt =(decimal:string)=>{
  //includes判断某个对象中是否包含值为decimal的元素
  if(!inputValue.value.includes(decimal)){
    inputValue.value+=decimal;
    inputValueTemp.value+=decimal;
  }
}
</script>

<template>
  <div style="padding: 20px 0;font-size: 14px;">界面标题：{{ title }} ，作者：{{ author }}</div>
  
  <div style="width: 500px;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="计算器">
        <div style="width:170px">
          <div style="margin-bottom: 15px;padding: 5px 3px;border: 1px solid #f5f5f5;">
            <Input placeholder="此处显示数字" readonly  v-model:value="inputValue"/>
      
          </div>
          <div>
            <Button type="primary" shape="round" @click="numberButton('7')">7</Button>
            <Button type="primary" shape="round" @click="numberButton('8')" v-text="8" ></Button>
            <Button type="primary" shape="round" @click="numberButton('9')" v-text="9" ></Button>
            <Button type="primary" shape="round" class="calc-opt" @click="numberButton('/')">/</Button>
            <br />
            <Button type="primary" shape="round" @click="numberButton('4')" v-text="4" ></Button>
            <Button type="primary" shape="round" @click="numberButton('5')" v-text="5" ></Button>
            <Button type="primary" shape="round" @click="numberButton('6')" v-text="6" ></Button>
            <Button type="primary" shape="round" class="calc-opt" @click="numberButton('*')">*</Button>
            <br />
            <Button type="primary" shape="round" @click="numberButton('1')" v-text="1" ></Button>
            <Button type="primary" shape="round" @click="numberButton('2')" v-text="2" ></Button>
            <Button type="primary" shape="round" @click="numberButton('3')" v-text="3" ></Button>
            <Button type="primary" shape="round" class="calc-opt" @click="numberButton('-')">-</Button>
            <br />
            <Button type="primary" shape="round" @click="clearDisplay">C</Button>
            <Button type="primary" shape="round" @click="numberButton('0')" v-text="0" ></Button>
            <Button type="primary" shape="round" @click="numberButton('.')">.</Button>
            <Button type="primary" shape="round" class="calc-opt" @click="numberButton('+')">+</Button>
            <div style="width: 160px;margin-top: 3px;">
              <Button type="primary" shape="round" style="background-color: black;"  @click="calc()" :block="true">=</Button>
             
            </div>
          </div>
        </div>

      </CollapsePanel>
    </Collapse>
  </div>
  <MyCounter2 title="计算器2" author="彭行松"></MyCounter2>
</template>

<style scoped>
.calc-opt {
  background-color: mediumturquoise;
}
</style>