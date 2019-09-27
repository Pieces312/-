import Vue from 'vue'
import App from './App'

// 引入weui
import 'mpvue-weui/src/style/weui.css'

// 使用fly
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

App.mpType = 'app'
Vue.config.productionTip = false
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()
