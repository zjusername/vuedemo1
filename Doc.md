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

## 设置Vue本地调试
1 在 vue.config.js 中设置本地调试
``` 
 module.exports = defineConfig({
  // 编译选项
  transpileDependencies: true,  // 是否转译依赖包
  productionSourceMap: true, //启用源码映射
  // 开发服务器配置
  devServer: {
    proxy: {                   // 代理配置
      '/calculator': {         // 代理路径
        target: 'http://localhost:8080',  // 目标服务器
        changeOrigin: true,    // 改变请求源
        pathRewrite: {         // 路径重写规则
          '^/calculator': '/calculator'
        }
      }
    },
    hot: true,                 // 热重载配置正确
    open: true,                // 自动打开浏览器
    port: 8080,                // 端口配置正确
    https: false,              // HTTPS 配置正确
  },
  // Webpack 配置
  configureWebpack: {
    devtool: 'source-map',
    output: {
      devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]'
    },
    resolve: { 
      extensions: [".ts", ".tsx", ".js", ".json"]  // 支持的文件扩展名
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,     // 处理 .ts 和 .tsx 文件
          loader: 'ts-loader',  // 使用 ts-loader
          exclude: /node_modules/,//npm
          options: {
            appendTsSuffixTo: [/\.vue$/]  // 给 .vue 文件添加 .ts 后缀
          }
        }
      ]
    }
  },

});
```

2 新增 launch.json 文件
```
//实测这个配置有用。

"type": "msedge",          // 使用 Microsoft Edge 浏览器进行调试
      "request": "launch",       // 启动新的浏览器实例进行调试
      "name": "调试 Vue 应用",   // 在 VS Code 调试面板显示的名称
      "url": "http://localhost:8080", // 要调试的应用地址
      "webRoot": "${workspaceFolder}", // 项目根目录
      "breakOnLoad": true,      // 允许在页面加载时命中断点
      "sourceMapPathOverrides": {  // 源码映射路径重写规则
        // 将 webpack 打包后的路径映射回本地源码路径
        "webpack:///./*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/src/*",
        "webpack:///*": "*",
        "webpack:///./~/*": "${webRoot}/node_modules/*"
      }
```


3 调试步骤：
```
. 关闭所有正在运行的 Vue 开发服务器
. 删除 node_modules/.cache 文件夹
. 重新运行 npm run serve
. 完全关闭浏览器
. 在 VS Code 中按 F5 启动调试 
. 在代码行输入 debugger 或者 直接断点

```


