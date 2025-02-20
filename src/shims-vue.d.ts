/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * shims-vue.d.ts 文件的主要意图是为 TypeScript 提供 .vue 文件的类型声明。让我解释一下它的作用：
 * 这个文件的作用是：
类型声明：
告诉 TypeScript 如何处理 .vue 文件的导入
定义了 .vue 文件会导出一个 Vue 组件
模块声明：
declare module '*.vue' 表示这是对所有以 .vue 结尾的文件的类型定义
使得 TypeScript 能够理解 import Xxx from './Xxx.vue' 这样的语句
组件类型：
DefineComponent<{}, {}, any> 定义了组件的 props、data 和其他选项的类型
这里使用了泛型参数，但都设为了基础类型，保证基本的类型检查
如果没有这个文件，TypeScript 会报错说不认识 .vue 文件，因为默认情况下 TypeScript 只认识 .ts、.js 等标准文件类型。
 * 
 */