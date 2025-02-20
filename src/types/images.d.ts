/* eslint-disable */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

/**
 * 这个文件的作用是：
 * 
 * 1. 类型声明：
 *    - 告诉 TypeScript 如何处理图片文件的导入
 *    - 使得可以在 TypeScript 文件中导入图片文件
 * 
 * 2. 模块声明：
 *    - declare module '*.png' 等表示对所有图片文件的类型定义
 *    - 使得 TypeScript 能够理解 import logo from './logo.png' 这样的语句
 * 
 * 3. 开发体验：
 *    - 避免 TypeScript 报错说不认识图片文件
 *    - 默认情况下 TypeScript 只认识 .ts、.js 等代码文件
 * 
 * 4. 项目兼容：
 *    - 使项目能够正确处理各种图片资源
 *    - 支持在 Vue 组件中使用图片导入
 */