module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    lintOnSave: 'warning',
    productionSourceMap: false
}