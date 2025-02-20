<template>
  <div>
    输入第一个数字:
    <input v-model="message" type="text" placeholder="请输入内容">

  </div>
</template>

<script lang="ts" >
//import axios from 'axios';
import { ref } from "vue";

const message = ref("");

const fetchData = () => {
  message.value = "";

};
fetchData()
</script>

<style scoped>
/* 可添加样式 */
</style>