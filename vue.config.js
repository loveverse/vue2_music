module.exports = {
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [px2rem({ remUnit: 375 / 10 })], //375是设计稿宽度
    //         },
    //     },
    // },
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://music-api-delta.vercel.app',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/api2': {
                target: 'http://note.loveverse.top/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': ''
                }
            }
        },
    },
    lintOnSave: false,
}