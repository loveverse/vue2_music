import axios from 'axios'
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'


const http = axios.create({
    baseURL: "http://1.15.42.9:40001",
    timeout: 50000,
})
http.interceptors.request.use(config => {
    Nprogress.start()
    return config
})
http.interceptors.response.use(response => {
    Nprogress.done()
    // console.log(response);
    return response
}, error => {
    Nprogress.done()
    // 错误响应信息
    // console.log(error.response);
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    return Promise.reject(error.message)
})

export default function ajax(url, data = {}, type = "POST") {
    // data作为请求体发送的的数据只适用put,post,patch
    let promise;
    return new Promise((resolve, reject) => {
        switch (type) {
            case "GET":
                promise = http.get(url, { params: data })
                break;
            case "POST":
                promise = http.post(url, data)
                break;
            case "DELETE":
                promise = http.delete(url, _)
                break;
            default:
                break;
        }
        promise.then(result => resolve(result.data))
            // 处理失败的请求
            .catch(error => console.log("错误：",error))
    })
}