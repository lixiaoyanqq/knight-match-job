import * as type from './mutations_types'
import { setToken, removeToken } from 'utils/auth'
import { setLocalStore, getLocalStore, removeLocalStore } from 'utils/global'

export default {
    [type.SET_TOKEN] (state, token) {
        state.token = token
        setToken(state.token)
    },
    [type.CLEAR_TOKEN] (state) {
        state.token = ''
        removeToken()
    },
    [type.CLEAR_STORAGE] () {
        const name = 'baseInfo'
        removeLocalStore(name)
        removeLocalStore('typeValue')
        removeLocalStore('typeNames')
    },
    [type.SET_SEARCH_RESUME_ID] (state, id = null) {
        state.searchKey.searchResumeIdKey = id
    },
    [type.DEL_SEARCH_RESUME_ID] (state) {
        state.searchKey.searchResumeIdKey = null
    },
    [type.SET_SEARCH_POSITION_NAME] (state, name = null) {
        state.searchKey.searchPositionNameKey = name
    },
    [type.DEL_SEARCH_POSITION_NAME] (state) {
        state.searchKey.searchPositionNameKey = null
    },
    [type.SET_BADE_INFO] (state, { gender, id, mobile, nickName, profilePicture, recdUserId, recordStatus, userStatus, userType } = {}) {
        state.baseInfo.gender = gender,
        state.baseInfo.id = id,
        state.baseInfo.mobile = mobile,
        state.baseInfo.nickName = nickName,
        state.baseInfo.profilePicture = profilePicture,
        state.baseInfo.recdUserId = recdUserId,
        state.baseInfo.recordStatus = recordStatus,
        state.baseInfo.userStatus = userStatus,
        state.baseInfo.userType = userType
        setLocalStore('baseInfo', state.baseInfo)
    },
    [type.INIT_USER_INFO] (state) {
       let initUserInfo = getLocalStore('baseInfo')
       if (initUserInfo) {
            state.baseInfo = JSON.parse(initUserInfo);
        } 
    }
}