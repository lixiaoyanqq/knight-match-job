import 'babel-polyfill'
import Vue from 'vue'
import Vant from 'vant'
import lodash from 'utils/lodash'
import router from './router'
import 'vant/lib/index.css'
import App from './App'
import store from './store'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import 'common/stylus/vant-ui.styl' // 覆盖 Vant-UI 的样式
import { getToken } from 'utils/auth'

Vue.use(Vant)
fastclick.attach(document.body)
Vue.use(lodash)
//路由守卫
router.beforeEach((to, from, next) =>{
  if(getToken()){
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  if(to.meta.requireAuth) {
    if(state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
