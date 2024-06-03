const { defineConfig } = require('@vue/cli-service')
const { UniverPlugin } = require('@univerjs/webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:  {
    plugins: [
      new UniverPlugin()
    ]
  },
})
