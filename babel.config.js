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

