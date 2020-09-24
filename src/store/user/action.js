import * as type from './mutations_types'
import * as user from 'api/user'

export default {
    async [type.LOGIN] (context, playload = {}) {
        let data = await user.login(playload)
        context.commit(type.SET_TOKEN, data.content.token)
        context.commit(type.SET_BADE_INFO, data.content.baseInfo)
    },

    async [type.REGISTER] (context, playload = {}) {
        let data = await user.register(playload)
        console.log('data',data)
        context.commit(type.REGISTER, data)
        return data
        // context.commit(type.SET_TOKEN, data.content.token)
        // context.commit(type.SET_BADE_INFO, data.content.baseInfo)
    },
    
    async [type.LOGOUT] (context) {
        await user.logout()
        context.commit(type.CLEAR_TOKEN)
        context.commit(type.CLEAR_STORAGE)
        context.commit(type.DEL_SEARCH_RESUME_ID)
        context.commit(type.DEL_SEARCH_POSITION_NAME)
    },

    async [type.FETCH_BASE_INFO] (context) {
        let { data } = await user.getBaseInfo()
        context.commit(type.SET_BADE_INFO)
        return data
    },

    async [type.SET_SEARCH_RESUME_ID] (context, id = null) {
        context.commit(type.SET_SEARCH_RESUME_ID, id)
    },

    async [type.DEL_SEARCH_RESUME_ID] (context) {
        context.commit(type.DEL_SEARCH_RESUME_ID)
    },

    async [type.SET_SEARCH_POSITION_NAME] (context, name = null) {
        context.commit(type.SET_SEARCH_POSITION_NAME, name)
    },

    async [type.DEL_SEARCH_POSITION_NAME] (context) {
        context.commit(type.DEL_SEARCH_POSITION_NAME)
    }
}