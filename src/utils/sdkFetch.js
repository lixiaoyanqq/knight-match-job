import axios from 'axios'
import { SDK_URL } from 'api/config'
import { getToken } from 'utils/auth'
import { Notify } from 'vant'
import * as type from 'store/user/mutations_types'

//创建axios实例
const service = axios.create({
    baseURL: SDK_URL,  // api的base_url
    timeout: 10000       ////请求超时时长
})

//有登陆时做
//request拦截器
service.interceptors.request.use(
    config =>{
        if(getToken()) {
            config.headers['token'] = getToken()
        }
        config.headers['Content-Type'] = 'application/json;charset=utf-8;'
        return config
    },
    arror => {

        Promise.reject(arror)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data || response.content
    },
    error => {
        console.log('err' + error)
        // console.log('error',error.response)
        Notify({
            type: 'warning',
            message: error.response && error.response.data && error.response.data.message || error.message
        })
        if(error.response.content.code === '0004'){
            store.dispatch(type.LOGOUT)
            location.reload()
        }
        return Promise.reject(error)
    }
    
)

export default service