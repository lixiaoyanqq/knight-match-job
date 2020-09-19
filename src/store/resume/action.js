import * as type from './mutations_types'
import * as resumeApi from 'api/resume'

export default {
    async [type.FETCH_R_BASE_INFO] (context) {
        let data = await resumeApi.baseMessage()
        context.commit(type.FETCH_R_BASE_INFO, data.content)
        return data
    },

    async [type.FETCH_R_HOPE_INFO] (context) {
        let data = await resumeApi.hopeMessahe()
        context.commit(type.FETCH_R_HOPE_INFO, data.content)
        return data
    },

    async [type.FETCH_R_EDUEXPS] (context) {
        let data = await resumeApi.getAllEduexp()
        context.commit(type.FETCH_R_EDUEXPS, data.content)
        return data
    },

    async [type.FETCH_R_WORKS] (context) {
        let data = await resumeApi.workExpList()
        context.commit(type.FETCH_R_WORKS, data.content)
        return data
    },

    async [type.FETCH_R_AWARDS] (context) {
        let data = await resumeApi.awardList()
        context.commit(type.FETCH_R_AWARDS, data.content)
        return data
    },

    async [type.FETCH_RESUMES] (context) {
        let data = await resumeApi.likeResumeList()
        context.commit(type.FETCH_RESUMES, data.content)
        return data
    },

    async [type.FETCH_RESUME] (context, params) {
        let data = await resumeApi.resumeDetail(params)
        context.commit(type.FETCH_RESUME, data.content)
        return data
    }
}