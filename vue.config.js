module.exports = {
    devServer: {
        host: "0.0.0.0",
        open: true,
        // port: 9998,
        proxy: {
            '/api': {
                target: 'https://music-api-delta.vercel.app',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/api2': {
            //     target: 'http://127.0.0.1:3000',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api2': ""
            //     }
            // }
        },
    },
    lintOnSave: false,
}