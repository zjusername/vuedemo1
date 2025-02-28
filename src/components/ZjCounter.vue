<script lang="ts">
export default {
  name: 'ZjCounter',
}
</script>

<script setup lang="ts">
import { ref, defineProps, } from 'vue';
import { Button, CollapsePanel, Collapse } from 'ant-design-vue';
const activeKey = ref(['1'])

//两个显示
const dispaly1 = ref("")
const dispaly2 = ref("0")
//两个数
let n1: string = ''
let n2: string = ''
let opt1: boolean = true //记录是否遇到opt
//c建
function clearDisplay(): void {

}
//数字输入建
function numberButton(number: string): void {
  //如果没有opt就输入n1，如果有就输入n2
  if (opt1) {
    n1 += number
    dispaly2.value = n1
  } else {
    n2 += number
    dispaly2.value = n2
  }
}
//运算符
function jisuan(opt: string): void {//o按钮接收的计算符
  n1 += opt//加号赋值n1
  console.log(n1)
  dispaly1.value = n1//显示给显示1
  opt1 = false
}
//结果
function calc(): void {
  n1 += n2//n1有opt，组合第二个数
  dispaly2.value=eval(n1)//计算结果
  dispaly1.value=n1//等式赋值给显示1
  n1=eval(n1)//结果给n1
  //同时清空n2
  n2=""
}

</script>
<template>
  <!-- <div style="padding: 20px 0;font-size: 14px;">{{ title }} ，作者：{{ author }}</div> -->
  <div style="width: 450px; margin:20px auto;">
    <Collapse v-model:activeKey="activeKey">
      <CollapsePanel key="1" header="计算器  作者：zj">
        <div>
          <div class="top">
            <p>{{ dispaly1 }}</p>
            <p>{{ dispaly2 }}</p>
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
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 按钮大小 */
.ButtonNum {
  margin: 2px 2px;
  width: 100px;
  height: 70px;
  font-size: 20px;
}
</style>