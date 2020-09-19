import actions from './action'
import mutations from './mutations'
import getters from './getters'

const state = {
    baseInfo: {
        gender: null,
        id: null,
        mobile: '',
        nickName: '',
        profilePicture: '',
        recdUserId: '',
        recordStatus: '',
        userStatus: '',
        userType: ''
    },
    state: null,
    searchKey: {
        searchResumeIdKey: null,
        searchPositionNameKey: null
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}