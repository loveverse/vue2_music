module.exports = {
    devServer: {
        open: true,
        // port: 9998,
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
}