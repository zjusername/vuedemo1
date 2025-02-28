<script lang="ts">
export default {
  name: 'HrontEndPorgraming',
}
</script>

<script setup lang="ts">
import { ref, defineProps, } from 'vue';
import { Button, CollapsePanel, Collapse } from 'ant-design-vue';
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

const num1 = ref("");
const num2 = ref("");
const opt = ref("");

const firstOpt = ref(true); //第一次操作计算按钮
const clearNum1 = ref(false); //每次遇到opt后重新赋值num1

const enum optEnum {
  "加" = "+",
  "减" = "-",
  "乘" = "*",
  "除" = "/"
}

const calc = () => {
  let result = jisuan();
  clear();
  num1.value = result.toString();
}

const clear = ()=>{
  opt.value = "";
  num1.value = "0";
  num2.value = "";
  firstOpt.value= true;
  clearNum1.value =false;
}


//接收计算器按钮的值
const numberButton = (number: string) => {
  if(clearNum1.value){
    num1.value = number;
  }else{
    num1.value += number;
  }
}

const print = () => {
  console.log("opt=" + opt.value 
  + "num1=" + num1.value 
  //+ ",num1Show=" + num1Show.value 
  + ",num2=" + num2.value 
//  + ",num2Show=" + num2Show.value
)
}


const optBtn = (optStr: string) => {
  opt.value = optStr;
  if(firstOpt.value){
    num2.value =  num1.value 
    firstOpt.value = false;
  }else{
    let res =  jisuan();
    num2.value =  res.toString();
  }
  clearNum1.value=true;
}

//运算符
const jisuan = (): number => {
  let result = 0;
  let n1 = parseFloat(num1.value);
  let n2 = parseFloat(num2.value);
  
  switch (opt.value) {
    case optEnum.加:
      result = n1 + n2;
      break
    case optEnum.减:
      result = n1 - n2;
      break
    case optEnum.乘:
      result = n1 * n2;
      break
    case optEnum.除:
      if(n2==0){
        result = 0;
      }else{
        result = n1 / n2;
      }
      break;
  }
  return result;
}

const clearDisplay = () => {
  clear();
}

</script>

<template>
  <div style="width: 450px; margin:20px auto;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" :header='(title + " " + author)'>
        <div>
          <div class="top">
            <p>{{ num2 }} {{ opt }}</p>
            <p>{{ num1 }}</p>
          </div>
          <div style="width: 420px;height: 450px;">
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">%</Button>
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">CE</Button>
            <Button class="ButtonNum" @click="clearDisplay">C</Button>
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">⌫</Button>
            <br>
            <Button :disabled="true" class="ButtonNum">⅟x</Button>
            <Button :disabled="true" class="ButtonNum">x²</Button>
            <Button :disabled="true" class="ButtonNum">2√x</Button>
            <Button class="ButtonNum" @click="optBtn('/')">÷</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('7')">7</Button>
            <Button class="ButtonNum" @click="numberButton('8')">8</Button>
            <Button class="ButtonNum" @click="numberButton('9')">9</Button>
            <Button class="ButtonNum" @click="optBtn('*')">×</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('4')">4</Button>
            <Button class="ButtonNum" @click="numberButton('5')">5</Button>
            <Button class="ButtonNum" @click="numberButton('6')">6</Button>
            <Button class="ButtonNum" @click="optBtn('-')">-</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('1')">1</Button>
            <Button class="ButtonNum" @click="numberButton('2')">2</Button>
            <Button class="ButtonNum" @click="numberButton('3')">3</Button>
            <Button class="ButtonNum" @click="optBtn('+')">+</Button>
            <br />
            <Button :disabled="true" class="ButtonNum">+/-</Button>
            <Button class="ButtonNum" @click="numberButton('0')">0</Button>
            <Button class="ButtonNum" @click="numberButton('.')">.</Button>
            <Button class="ButtonNum" type="primary" @click="calc()">═</Button>
          </div>
        </div>
      </CollapsePanel>
    </Collapse>
  </div>
</template>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.top {
  margin-bottom: 15px;
  width: 420px;
  height: 120px;
}

p {
  height: 60px;
  width: 300px;
  margin-left: auto;
  font-size: 50px;
  text-align: right;
  /* 文本溢出，定义宽度,隐藏超出元素宽度内容,防止文本换行 */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
/* 按钮大小 */
.ButtonNum {
  margin: 2px 2px;
  width: 100px;
  height: 70px;
  font-size: 20px;
}
</style>