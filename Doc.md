# Vue疑难杂症

## 安装vue cli 和ts相关组件
```
npm install -g @vue/cli   // 安装vue-cli
npm install --save-dev @types/webpack-env // 安装webpack-env
npm install --save-dev @vue/compiler-sfc vue-tsc // 安装vue-tsc
npm install typescript ts-loader --save-dev // 安装typescript ts-loader
```
## vue 支持 typescript

```
命令：vue add typescript

运行命令后，CLI 会询问一些配置选项，建议选择:
Use class-style component syntax? No
Use Babel alongside TypeScript? Yes
Convert all .js files to .ts? Yes
Allow .js files to be compiled? Yes
Skip type checking of all declaration files (recommended for apps)? Yes

```


## 使用 ref 定义的变量
在 Vue 3 中使用 ref 定义的变量，在不同场景下的使用方式是不同的：
### 1. 在 script 中：
是的，必须使用 .value 来访问或修改值
因为 ref 是一个响应式对象，真正的值被包装在 .value 属性中
```
<script setup>
import { ref } from 'vue'

const inputValue = ref('hello')
console.log(inputValue.value) // 必须用 .value
inputValue.value = 'world'    // 修改值也必须用 .value
</script>
```

### 2. 在模板 template 中：
. 不需要使用 .value
. Vue 会自动解包 ref 的值
```
<template>
  <!-- 在模板中直接使用，不需要 .value -->
  <input v-model="inputValue">
  <p>{{ inputValue }}</p>
</template>
```
### 3. 为什么要这样设计？
. 这是为了保持响应式
. 如果直接赋值给一个普通变量，会丢失响应式
```
let x = ref(0)
let y = x.value // ❌ y 将不再是响应式的
```
### 4. 使用 reactive 的替代方案：
. 如果不想总是写 .value，可以使用 reactive
```
import { reactive } from 'vue'

const state = reactive({
  inputValue: 'hello'
})

// 直接使用，不需要 .value
console.log(state.inputValue)
state.inputValue = 'world'
```
. 总结：在 script 中必须使用 .value，在模板中则不需要。这是 Vue 3 的设计决定，目的是为了保持响应式系统的一致性。


