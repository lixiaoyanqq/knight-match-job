import * as type from './mutations_types'

export default {
    [type.FETCH_COMP_DETAIL] (state, company = {}) {
        state.company = company
    }
}