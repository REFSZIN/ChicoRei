const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
