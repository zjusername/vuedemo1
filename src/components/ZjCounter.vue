<script lang="ts">
export default {
  name: 'ZjCounter',
}
</script>

<script setup lang="ts">
import { ref, defineProps, } from 'vue';
import { Button, CollapsePanel, Collapse, AutoCompleteOptGroup } from 'ant-design-vue';
import { alertProps } from 'ant-design-vue/es/alert';
const activeKey = ref(['1'])

//两个显示
const dispaly1 = ref("")
const optplay = ref("")
const dispaly3 = ref("")
const dispaly4 = ref("0")
//两个数
let n1: string = ''
let n2: string = ''
let opt: string = ''
let n4: number//存储结果
let opt1: boolean = true //记录是否遇到opt
let opt4: string//上一次按下的opt
let dengyu:string= "="//等于符号
//c建
function clearDisplay(): void {
  dispaly1.value = ""
  optplay.value = ""
  dispaly3.value = ""
  dispaly4.value = '0'
  n1 = ""
  n2 = ''
  opt = ""
  n4 = 0
  opt1 = true
}
//数字输入建
function numberButton(number: string): void {
  //如果没有opt就输入n1，如果有就输入n2
  if (opt1) {
    if(n1.length>11){
      alert("数值上线")
    }else{n1 += number
      dispaly4.value = n1
    }
    
  } else {
    if(n2.length>11){
      alert("数值上线")
    }else{
    n2 += number
    dispaly4.value = n2
    opt4 = opt
    }
  }
}
//运算符

function jisuan(opt3: string): void {//o按钮接收的计算符
  optplay.value = ""
  opt = ""
  opt = opt3
  dispaly1.value = n1
  optplay.value = opt //显示给显示opt
  if (n1 == "") {//显示3为0
    n1 = "0"
    dispaly1.value = "0"
  }
  if (n2 != "") {
    dispaly3.value = n2
    n4 = calc2(opt4)
    dispaly4.value = n4.toString()
    dispaly1.value = n4.toString()
    n1 = n4.toString()
    //计算完成显示完成清空n2和显示3
    n2 = ""
    dispaly3.value = ""
  }
  if(n4!=null){
    dispaly1.value=n4.toString()
    n1=n4.toString()
    //清空n2与显示框3
    n2=""
    dispaly3.value=""
  }
  opt1 = false
}
//结果
function calc(): void {
  if (n1 != "" && n2 != "") {
    n4 = calc2(opt)
    dispaly4.value = n4.toString()
    dispaly3.value=n2
    dispaly3.value+=dengyu
    n2 = ""
  } else {
    alert("没有等式")
  }
}

//计算
function calc2(opt: string) {
  let result: number = 0
  switch (opt) {
    case "+":
      result = parseFloat(n1) + parseFloat(n2);
      break;
    case "-":
      result = parseFloat(n1) - parseFloat(n2);
      break;
    case "*":
      result = parseFloat(n1) * parseFloat(n2);
      break;
    case "÷":
      if(n2=="0"){
        result=0
      }else{
        result = parseFloat(n1) / parseFloat(n2);
        result=Number(result.toFixed(2))
      }
      
      break;
  }
  return result;
}

</script>
<template>
  <!-- <div style="padding: 20px 0;font-size: 14px;">{{ title }} ，作者：{{ author }}</div> -->
  <div style="width: 450px; margin:20px auto;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="计算器  作者：zj">
        <div>
          <div class="top">
            <p>{{ dispaly1 }}{{ optplay }}{{ dispaly3 }}</p>
            <p>{{ dispaly4 }}</p>
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
            <Button class="ButtonNum" @click="jisuan('÷')">÷</Button>
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
  width: 420px;
  margin-left: auto;
  font-size: 50px;
  /* 文本靠左 */
  text-align: right;
  /* 文本溢出，定义宽度,隐藏超出元素宽度内容,防止文本换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 0px solid red;
}

/* 按钮大小 */
.ButtonNum {
  margin: 2px 2px;
  width: 100px;
  height: 70px;
  font-size: 20px;
}
</style>