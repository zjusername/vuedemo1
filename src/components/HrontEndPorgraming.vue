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

//创建响应式数据
const inputValue = ref('') //显示操作符
const inputValue2 = ref('')
const numberOne = ref<number | null>(null)
const numberLog = ref<boolean>(true)
const reister = ref()//记录数值和操作符
//js：string等式数组拆分
function errBreak(e: string) {
  const regex = /(\d+|[+\-*/])/g;
  return e.match(regex) || [];
}
//ts计算
//当前bug输入0数值使用运算符数值等于就会报错
const calc = () => {
  inputValue2.value += inputValue.value + "="
  numberOne.value = eval(String(reister.value))//eval计算
  console.log(reister.value)
  inputValue.value = String(numberOne.value)
}

let log = true
reister.value=""//初始化
//接收计算器按钮的值
const numberButton = (number: string) => {
  //是否第一次计算，不是第一次计算，就为true否则为false
  //为ture就赋值第一个值，为false就赋值第二个值，并且清空第一个值的显示，在显示第二个值
  //当在次按加的时候，就进行计算
  if (numberLog.value) {
    inputValue.value+= number
    reister.value+= number
    console.log(reister.value)
  } else {
    if (log) {//去掉显示框的第一位数值，并且只运行一次
      inputValue.value = ""
      log = false
    }
    inputValue.value += number
    reister.value += number
    console.log(reister.value)
  }
}

//运算符
const jisuan = (opt: string) => {
  let r
  r = reister.value
  r = errBreak(r)//等式拆分
  //如果加号后面有数组，且不是第一次运行，就运行计算功能，如果没有，就添加加号
  if (r[2] != " " && numberLog.value == false) {
    //运算结果后，结果赋值给第二个显示框
    inputValue2.value = eval(String(reister.value))
    //然后在把结果赋值给第一个显示框
    inputValue.value = inputValue2.value
    //第二个显示框显示“运算符”
    inputValue2.value += opt
    //最终的结果也需要赋值“赋值最后的结果和运算符”
    reister.value=inputValue.value
    reister.value+= opt
    log=true
  } else {
    inputValue2.value += inputValue.value + opt
    numberLog.value = false
    reister.value += opt
  }
}

//清空1、2显示框
const clearDisplay = () => {
  inputValue.value = ''
  inputValue2.value = ''
  reister.value = ''
}
//设计意图、程序设计逻辑加思维
//编程思想
//逻辑思维
//设计、细化、组合、
//vue：功能拆分、管理包npm、管理
//文件名简写
</script>

<template>
  <!-- <div style="padding: 20px 0;font-size: 14px;">{{ title }} ，作者：{{ author }}</div> -->
  <div style="width: 450px; margin:20px auto;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="计算器  作者：zj">
        <div>
          <div class="top">
            <p>{{ inputValue2 }}</p>
            <p>{{ inputValue }}</p>
          </div>
          <div style="width: 420px;height: 450px;">
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">%</Button>
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">CE</Button>
            <Button class="ButtonNum" @click="clearDisplay">C</Button>
            <Button :disabled="true" class="ButtonNum" @click="clearDisplay">⌫</Button>
            <br>
            <Button :disabled="true" class="ButtonNum" @click="numberButton('')">⅟x</Button>
            <Button :disabled="true" class="ButtonNum" @click="numberButton('')">x²</Button>
            <Button :disabled="true" class="ButtonNum" @click="numberButton('')">2√x</Button>
            <Button class="ButtonNum" @click="jisuan('/')">÷</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('7')">7</Button>
            <Button class="ButtonNum" @click="numberButton('8')">8</Button>
            <Button class="ButtonNum" @click="numberButton('9')">9</Button>
            <Button class="ButtonNum" @click="jisuan('*')">×</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('4')">4</Button>
            <Button class="ButtonNum" @click="numberButton('5')">5</Button>
            <Button class="ButtonNum" @click="numberButton('6')">6</Button>
            <Button class="ButtonNum" @click="jisuan('-')">-</Button>
            <br />
            <Button class="ButtonNum" @click="numberButton('1')">1</Button>
            <Button class="ButtonNum" @click="numberButton('2')">2</Button>
            <Button class="ButtonNum" @click="numberButton('3')">3</Button>
            <Button class="ButtonNum" @click="jisuan('+')">+</Button>
            <br />
            <Button :disabled="true" class="ButtonNum" @click="numberButton('')">+/-</Button>
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