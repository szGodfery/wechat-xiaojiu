import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.config.productionTip = false
App.mpType = 'app'

// 设置默认url地址
axios.defaults.baseURL = 'https://www.zhengzhicheng.cn/'

// 设置适配器,用于支持小程序发送请求,相当于改底层的请求方式,,默认方式是xhr
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.url, // 开发者服务器接口地址",
            method: config.method === 'get' ? 'GET' : 'POST',
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

// 在vue原型中添加方法
Vue.prototype.$axios = axios

const app = new Vue(App)
app.$mount()