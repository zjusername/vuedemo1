<script lang="ts">
export default {
  name: 'MyCounter',
}
</script>

<script setup lang="ts">  
import { ref, defineProps, watch } from 'vue';
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
const inputValue =ref('')
const numberOne=ref<number|null>(null)
const opt=ref('')
const numberTow=ref<number|null>(null)

//post方法，计算
const calc = async () => {
  numberTow.value=parseFloat(inputValue.value)
  try {
    const response = await axios.post("/calculator/calc", {
      num1:numberOne.value,
      num2: numberTow.value,
      opt: opt.value
    });
    //重置状态
    numberTow.value=0;
    opt.value='0';
    inputValue.value=response.data;//将返回的结果显示给input
  } catch (error){
    console.error('请求出错:', error);
  }
};


//接收计算器按钮的值，显示到Input,如果值是0直接输入值，如果不是0就拼接前面的值
const numberButton = (number:number)=>{
  if(inputValue.value==='0'){
    inputValue.value=number.toString()
  }else{
    inputValue.value+=number.toString()
  }
  // inputValue.value+=a
  // console.log(inputValue.value)
}
//清空input
const clearDisplay=()=>{ 
  inputValue.value=''
  
}
//按下计算按钮,判断一个值是否为空，如果不是空，就把第一个值给firstNumber，如果是空就直接计算
const  jisuan = (b:string)=>{
  if (numberOne.value === null) {
      numberOne.value = parseFloat(inputValue.value);//string转换float
    } else {
      calc();
    }
    opt.value = b;
    inputValue.value = '0';//赋值第一个数完成后，清空inputValue
}
//添加小数点
const poInt =(decimal:string)=>{
  if(!inputValue.value.includes(decimal)){
    inputValue.value+=decimal;
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
            <Button type="primary" shape="round" @click="clearDisplay">C</Button>
            <Button type="primary" shape="round" @click="numberButton(7)">7</Button>
            <Button type="primary" shape="round" @click="numberButton(8)" v-text="8" ></Button>
            <Button type="primary" shape="round" @click="numberButton(9)" v-text="9" ></Button>
            <Button type="primary" shape="round" class="calc-opt">/</Button>
            <br />
            <Button type="primary" shape="round" @click="numberButton(4)" v-text="4" ></Button>
            <Button type="primary" shape="round" @click="numberButton(5)" v-text="5" ></Button>
            <Button type="primary" shape="round" @click="numberButton(6)" v-text="6" ></Button>
            <Button type="primary" shape="round" class="calc-opt">*</Button>
            <br />
            <Button type="primary" shape="round" @click="numberButton(1)" v-text="1" ></Button>
            <Button type="primary" shape="round" @click="numberButton(2)" v-text="2" ></Button>
            <Button type="primary" shape="round" @click="numberButton(3)" v-text="3" ></Button>
            <Button type="primary" shape="round" class="calc-opt" @click="jisuan('2')">-</Button>
            <br />
            <Button type="primary" shape="round" @click="numberButton(0)" v-text="0" ></Button>
            <Button type="primary" shape="round" @click="poInt('.')">.</Button>
            <Button type="primary" shape="round" style="background-color: black;"  @click="calc()">=</Button>
            <Button type="primary" shape="round" class="calc-opt" @click="jisuan('1')">+</Button>
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
