module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //配置ant design插件
   // 由于使用的是vue/cli3 所以需要在babel.config.js文件内添加插件信息
  // 然后只需从 ant-design-vue 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。
  plugins: [
    // [
    //   "import",
    //   { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    // ]
  ]
}

/**
 * 这个配置文件的主要作用是：
 * 
 * 1. 预设配置：
 *    - 使用 '@vue/cli-plugin-babel/preset' 预设，包含 Vue 项目常用的 Babel 配置
 * 
 * 2. 插件配置：
 *    - 配置 ant-design-vue 插件，用于自动导入组件和样式
 * 
 * 3. 项目范围：
 *    - 定义项目中需要编译的文件范围
 * 
 * 4. 开发体验：
 *    - 提供更好的代码补全和类型推断
 *    - 优化开发体验
 * 
 * 5. 项目兼容性：
 *    - 确保项目在不同环境下的兼容性
 */
