import * as type from './mutations_types'
import * as compApi from 'api/company'

export default {
    async [type.FETCH_COMP_DETAIL] (context) {
        let data = await compApi.getMyEntp()
        context.commit(type.FETCH_COMP_DETAIL, data.content)
        return data
    }
}