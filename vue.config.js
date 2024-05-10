const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:  {
    externals: {
      fs: 'commonjs2 node:fs'
    }
  }
})
