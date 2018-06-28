module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
    },
  },
  devServer: {
    port: 8020,
    https: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
        '/api/': {
            target: 'http://oa.ichingsmart.com/ycyj',
            changeOrigin: true,
            // pathRewrite: {
            //   '^/api': ''
            // }
        }
    },
  },
};
