import * as type from './mutations_types'

export default {
    [type.FETCH_CITY] (state, city = []) {
        state.homes.city = city
        state.homes.total = city.length
    },

    [type.FETCH_DASHBOARD] (state, dashboard = {}) {
        state.dashboard.dashboard = dashboard
    },

    [type.FETCH_TOP5] (state, top5 = {}) {
        state.tops.top5 = top5
    },

    [type.FETCH_CARDS] (state, cards = {}) {
        state.cards.cards = cards
    },

    [type.FETCH_RECOMMEND] (state, applicant = {}) {
        state.applicant.applicant = applicant
    },

    [type.FETCH_POSITION] (state, postList = []) {
        state.postList = postList
    }
}