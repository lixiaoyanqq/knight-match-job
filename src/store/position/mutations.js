import * as type from './mutations_types'

export default {
    [type.FETCH_POS_DETAIL] (state, position = {}) {
        state.position = position
    },

    [type.FETCH_POSITIONS] (state, positions = {}) {
        state.positions = positions
    }
}