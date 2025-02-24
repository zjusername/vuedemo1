<script lang="ts">
export default {
  name: 'HrontEndPorgraming',
}
</script>

<script setup lang="ts">  
import { ref, defineProps, } from 'vue';
import { Button,CollapsePanel,Collapse } from 'ant-design-vue';
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

//创建响应式数据
const inputValue =ref('') //显示操作符
const inputValue2=ref('')
const numberOne=ref<number|null>(null)
const numberLog=ref<boolean>(true)
const reister=ref()//记录
//ts计算
//当前bug输入0数值使用运算符数值等于就会报错
const calc=()=>{
    inputValue2.value+=inputValue.value+"="
    numberOne.value=eval(reister.value)//eval计算
    inputValue.value=String(numberOne.value)
}
  //接收计算器按钮的值
const numberButton = (number:string)=>{
    //是否第一次计算，不是第一次计算，就为true否则为false
    //为false就赋值第一个值，为false就赋值第二个值，并且清空第一个值的显示，在显示第二个值
    //当在次按加的时候，就进行计算
    if(numberLog.value){
        inputValue.value=number
        reister.value=number
    }else{
        inputValue.value+=number//怎么清除一个字符
        reister.value+=number
    }
}
const jisuan=(opt:string)=>{
    inputValue2.value+=inputValue.value+opt
    numberLog.value=false
    reister.value+=opt
}
//清空input
const clearDisplay=()=>{ 
  inputValue.value=''
}
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
            <Button   @click="clearDisplay">%</Button>
            <Button   @click="clearDisplay">CE</Button>
            <Button   @click="clearDisplay">C</Button>
            <Button   @click="clearDisplay">⌫</Button>
            <br>
            <Button   @click="numberButton('')">⅟x</Button>
            <Button   @click="numberButton('')">x²</Button>
            <Button   @click="numberButton('')">2√x</Button>
            <Button   @click="jisuan('/')">÷</Button>
            <br />
            <Button   @click="numberButton('7')">7</Button>
            <Button   @click="numberButton('8')">8</Button>
            <Button   @click="numberButton('9')">9</Button>
            <Button   @click="jisuan('*')">×</Button>
            <br />
            <Button   @click="numberButton('4')">4</Button>
            <Button   @click="numberButton('5')">5</Button>
            <Button   @click="numberButton('6')">6</Button>
            <Button   @click="jisuan('-')">-</Button>
            <br />
            <Button   @click="numberButton('1')">1</Button>
            <Button   @click="numberButton('2')">2</Button>
            <Button   @click="numberButton('3')">3</Button>
            <Button   @click="jisuan('+')">+</Button>
            <br />
            <Button   @click="numberButton('')">+/-</Button>
            <Button   @click="numberButton('0')">0</Button>
            <Button   @click="numberButton('.')">.</Button>
            <Button   type="primary" @click="calc()">═</Button>
            </div>
        </div>
      </CollapsePanel>
    </Collapse>
  </div>
</template>
<style scoped>
*{
    padding: 0;
    margin: 0;
}
.top{
    margin-bottom: 15px;
    width:420px;
    height: 120px;
}
p{
    height: 60px;
    width: 300px;
    margin-left: auto;
    font-size: 50px;
    text-align: right;
}
/* 按钮大小 */
    Button{
    margin: 2px 2px;
    width: 100px;
    height: 70px;
    font-size: 20px;
    }
</style>