import * as type from './mutations_types'
import * as posApi from 'api/position'

export default {
    async [type.FETCH_POS_DETAIL] (context, id) {
        let data = await posApi.posDetail(id)
        context.commit([type.FETCH_POS_DETAIL], data)
        return data
    },

    async [type.FETCH_POSITIONS] (context) {
        let data = await posApi.favoPosts()
        context.commit(type.FETCH_POSITIONS, data.content)
        return data
    }
}