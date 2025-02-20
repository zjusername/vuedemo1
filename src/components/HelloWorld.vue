<!-- eslint-disable vue/no-unused-components -->


<template>
  <div>
    输入第一个数字:<input v-model="inputValue1" type="text" placeholder="请输入内容">

    <form action="" id="yunsuan">
      <select name="" id="" v-model="selectData">
        <option value="1">加</option>
        <option value="2">减</option>
      </select>
    </form>

    输入第二个数字:<input v-model="inputValue2" type="text" placeholder="请输入内容">
    <p>你输入的内容是：{{ inputValue1 }} {{ inputValue2 }}</p>
    <a-button type="primary" autoInsertSpace="false" @click="fetchData">确定</a-button>
    <p>结果：{{ num2 }}</p>

    <p>getReturn: {{ num1 }}, PostReturn: {{ num2 }}</p>
    <p>msg: {{ message }}</p>
    
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios';
//import { Button } from 'ant-design-vue';

 const API_BASE_URL='/calculator/calc';

export default{
  components: {
    },
  data(){
    return{
      message:'',
      num1:0,
      num2:0,
      inputValue1:'',
      inputValue2:'',
    }
  },

  methods:{

    fetchData(){
      this.message=""
      this.calc();
      this.add();
    },

    //calc方法
    calc(){
      axios.post(API_BASE_URL,{
        num1:this.inputValue1,
        num2:this.inputValue2,
        opt:this.selectData
      })
      .then(response=>{
          //请求成功，将响应数据赋值给message
          this.num2=response.data;
          this.message += response.data+",";
      })
      .catch(error=>{
        //请求失败，打印错误信息
        console.error('请求出错:',error);
      })
    },
    //add方法
    add(){
      axios.get('/calculator/add?num1=1&num2=1')
      .then(response=>{
          //请求成功，将响应数据赋值给message
          this.num1=response.data;
          this.message += response.data+","
      })
      .catch(error=>{
        //请求失败，打印错误信息
        console.error('请求出错:',error);
      })
    },
    //弹出提示
    toPage(){
      alert("111");
    },
  }
}
</script>