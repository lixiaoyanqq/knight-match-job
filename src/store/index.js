import Vuex from 'vuex'
import Vue from 'vue'
import home from './home'
import user from './user'
import resume from './resume'
import position from './position'
import company from './company'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        user,
        resume,
        position,
        company
    }
})