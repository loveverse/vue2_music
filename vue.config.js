module.exports = {
    devServer: {
        open: true,
        // host: "localhost",
        // post: 3450,
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