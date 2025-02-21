<script lang="ts">
export default {
  name: 'MyCounter2',
}
</script>

<script setup lang="ts">

import { ref, defineProps, watch } from 'vue';
import { Button,Collapse,CollapsePanel,Input,Textarea } from 'ant-design-vue';
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

//记录数字
const selectNumber = ref<number[]>([]);
//当前输入的数字，例如：连续点击1，2，3时，应该为数字 123
const currInputNumber = ref<string>("");
//记录选中的操作符
const selectOpt = ref<string[]>([]);
//计算需要显示的文本
const calcStepText = ref<string>("");


const clickNumber = (value:number)=>{
  currInputNumber.value += value;
  calcStepText.value += value.toString(); //将当前输入的数字拼接成计算步骤的文本
}

const clickOpt = (value:string)=>{
  selectNumber.value.push(Number(currInputNumber.value)); //将当前输入的数字转换为数字并添加到选中的数字数组中
  currInputNumber.value = ""; //清空当前输入的数字
  selectOpt.value.push(value); //将选中的操作符添加到选中的操作符数组中
  calcCalcText(); //拼接计算步骤的文本
}

const calcCalcText = ()=>{
  //采用顺序遍历，将选中的数字和操作符拼接成计算步骤的文本
  let text = '';
  for(let i = 0;i<selectNumber.value.length;i++){
    text += selectNumber.value[i]; //取出 数字
    text += " "+selectOpt.value[i]+" "; //取出 操作符
  }
  calcStepText.value = text; //赋值
}

const calcResult = ()=>{
  //计算结果
  alert("计算结果");
}

</script>

<template>
  <div style="padding: 20px 0;font-size: 14px;">界面标题：{{ title }} ，作者：{{ author }}</div>
  <div style="width: 500px;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="计算器">
        <div style="width:300px">
          <div style="margin-bottom: 15px;padding: 5px 3px;border: 1px solid #f5f5f5;">
            <Input placeholder="此处显示数字" readonly width="100%" :value="calcStepText"  style="text-align: right;"/>
          </div>
          <div>
            <Button type="primary" shape="round" @click="clickNumber(1)">1</Button>
            <Button type="primary" shape="round" @click="clickNumber(2)">2</Button>
            <Button type="primary" shape="round" @click="clickNumber(3)">3</Button>
            <Button type="primary" shape="round" @click="clickNumber(4)">4</Button>
            <Button type="primary" shape="round" @click="clickNumber(5)">5</Button>
            <br />
            <Button type="primary" shape="round" @click="clickNumber(6)">6</Button>
            <Button type="primary" shape="round" @click="clickNumber(7)">7</Button>
            <Button type="primary" shape="round" @click="clickNumber(8)">8</Button>
            <Button type="primary" shape="round" @click="clickNumber(9)">9</Button>
            <Button type="primary" shape="round" @click="clickNumber(0)">0</Button>
           
            <br />
            <Button type="primary" shape="round" class="calc-opt" @click="clickOpt('/')" >/</Button>
            <Button type="primary" shape="round" class="calc-opt" @click="clickOpt('+')" >+</Button>
            <Button type="primary" shape="round" class="calc-opt" @click="clickOpt('-')" >-</Button>
            <Button type="primary" shape="round" class="calc-opt" @click="clickOpt('*')" >*</Button>
            <Button type="primary" shape="round" @click="calcResult()"> = </Button>
            
          </div>
        </div>

      </CollapsePanel>
    </Collapse>
  </div>
</template>

<style scoped>
.calc-opt {
  background-color: mediumturquoise;
}
</style>
