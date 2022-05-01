module.exports = {
    devServer: {
        open: true,
        // host: "localhost",
        // post: 3450,
        proxy: {
            '/api': {
                target: 'http://localhost:3450',
                changeOrigin: true,
                pathRewrite: {
                    '^/aapi': ''
                }
            }
        }
    },
    lintOnSave: 'warning',
    productionSourceMap: false
}