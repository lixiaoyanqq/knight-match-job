import * as type from './mutations_types'
import * as home from 'api/home'

export default {
    async [type.FETCH_CITY](context ) {
        let data = await home.getCity()
        context.commit(type.FETCH_CITY, data)
        return data
    },

    async [type.FETCH_DASHBOARD](context ) {
        let  data = await home.getDashboard()
        
        context.commit(type.FETCH_DASHBOARD, data.content)
        return data.content
    },

    async [type.FETCH_TOP5](context ) {
        let  data = await home.top5List()
        
        context.commit(type.FETCH_TOP5, data.content)
        return data.content
    },

    async [type.FETCH_CARDS](context, parms = {}) {
        let  data = await home.cardList(parms)
        context.commit(type.FETCH_CARDS, data.content)
        return data.content
    },

    async [type.FETCH_RECOMMEND] (context, parms = {}) {
        let data = await home.applicantList(parms)
        context.commit(type.FETCH_RECOMMEND, data.content)
        return data.content
    },

    async [type.FETCH_POSITION] (context) {
        let data = await home.postList()
        context.commit(type.FETCH_POSITION, data.content)
        return data.content
    }
}