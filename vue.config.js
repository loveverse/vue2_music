module.exports = {
    devServer: {
        disableHostCheck: true,
        // post: 40001,
        proxy: {
            '/api': {
                target: 'http://loveverse.top',
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