const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // 编译选项
  transpileDependencies: true,  // 是否转译依赖包

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
    }
  },

  // Webpack 配置
  configureWebpack: {
    resolve: { 
      extensions: [".ts", ".tsx", ".js", ".json"]  // 支持的文件扩展名
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,     // 处理 .ts 和 .tsx 文件
          loader: 'ts-loader',  // 使用 ts-loader
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]  // 给 .vue 文件添加 .ts 后缀
          }
        }
      ]
    }
  }
});

/**
 * 这个配置文件的主要作用是：
 * 
 * 1. Vue CLI 配置：
 *    - 配置 Vue CLI 的编译选项
 *    - 设置开发服务器选项
 *    - 定义项目构建行为
 * 
 * 2. 开发服务器设置：
 *    - 配置代理，解决跨域问题
 *    - 设置开发环境的服务器行为
 *    - 定义 API 请求转发规则
 * 
 * 3. Webpack 配置：
 *    - 扩展 Webpack 配置
 *    - 添加 TypeScript 支持
 *    - 配置模块解析规则
 * 
 * 4. 构建优化：
 *    - 配置构建性能优化
 *    - 设置资源处理规则
 *    - 定义编译转换行为
 */