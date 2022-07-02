import axios, { AxiosError } from 'axios'
import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'
const instance = axios.create({
    withCredentials: true,
    baseURL: '',
    timeout: 30000,
})

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        uni.showLoading({
            title: '加载中...',
            mask: true,
        })
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    },
)

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 隐藏加载框
        uni.hideLoading()
        return response
    },
    (error: AxiosError) => {
        // 对响应错误做点什么
        uni.hideLoading()
        return Promise.reject(error)
    },
)

// 适配 小程序
instance.defaults.adapter = function (config: any) {
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method.toUpperCase(),
            url:
                config.baseURL +
                buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response: any) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    headers: response.header, // 注意此处 单复数
                    config: config,
                }
                settle(resolve, reject, response)
            },
        })
    })
}

export default instance
