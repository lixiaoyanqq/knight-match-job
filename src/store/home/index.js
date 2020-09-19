import actions from './action'
import mutations from './mutations'

const state = {
    homes: {
        city: [],
        total: 0
    },
    dashboard: {
        dashboard: {}
    },
    tops: {
        top5:[],
    },
    cards: {
        cards: [],
    },
    postList: {},
    applicant: {
        applicant: []
    }
}

export default {
    state,
    actions,
    mutations
}