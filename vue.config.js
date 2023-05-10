const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("network", resolve("src/network"))
      .set("common", resolve("src/common"))
  },
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/agile-bpm-platform':{
        target: 'https://www.zszjdxs.com',
        changeOrigin: true,
        // ['/api1']:'',
      }
    }
  }
})

