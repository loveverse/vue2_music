module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://music-api-delta.vercel.app',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    lintOnSave: false,
    productionSourceMap: false
}