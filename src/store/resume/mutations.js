import * as type from './mutations_types'

export default {
    [type.FETCH_R_BASE_INFO] (state, baseInfo = {}) {
        state.resume.baseInfo = baseInfo
    },

    [type.FETCH_R_HOPE_INFO] (state, hopeInfo = {}) {
        state.resume.hopeInfo = hopeInfo
    },

    [type.FETCH_R_EDUEXPS] (state, eduexps = {}) {
        state.resume.eduexps = eduexps
    },

    [type.FETCH_R_WORKS] (state, works = {}) {
        state.resume.works = works
    },
    
    [type.FETCH_R_AWARDS] (state, awards = {}) {
        state.resume.awards = awards
    },

    [type.FETCH_RESUMES] (state, resumes = {}) {
        state.resume.resumes = resumes
    },

    [type.FETCH_RESUME] (state, resume = {}) {
        state.resume.resume = resume
    }
}