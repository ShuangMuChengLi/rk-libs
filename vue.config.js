// vue.config.js
const path = require('path');
const buildPath = path.resolve(__dirname, './rk-libs');
let configVue = {
  publicPath: '',
  chainWebpack (webpackConfig) {
    // webpackConfig.module
    //   .rule('worker')
    //   .test(/\.worker\.js$/)
    //   .use('worker-loader')
    //   .loader('worker-loader')
    //   .options({
    //     inline: 'fallback',
    //   })
    //   // .tap(()=>{
    //   //   return {
    //   //     inline: true,
    //   //     fallback: false,
    //   //     name: '[name]:[hash:8].js'
    //   //   };
    //   // })
    //   .end();
    webpackConfig.module
      .rule('file')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end();
  },
  outputDir: buildPath,
  devServer: {
    liveReload: false,
    hot: false,
    proxy: {
      '/ueditor': {
        target: 'https://www.linchaoqun.com',
        changeOrigin: true
      },
      '/huabanimg': {
        target: 'https://hbimg.huabanimg.com/',
        changeOrigin: true,
        pathRewrite:{
          '/huabanimg': ''
        }
      },
      '/local': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite:{
          '/local': ''
        }
      },
    }
  }
};
module.exports = configVue;
