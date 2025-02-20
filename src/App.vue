<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorldCopy msg="123123"/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import HelloWorldCopy from './components/HelloWorldCopy.vue';

export default {
  name: 'App',
  components: {
    HelloWorldCopy
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
