import fetch from 'utils/fetch'
import uploadFetch from 'utils/uploadFetch'

export function login(data){
    return fetch({
        url: 'amj/user/login',
        method: 'post',
        data: data
    })
}

export function register(data){
    return fetch({
        url: 'amj/user/registerByCode',
        method: 'post',
        data: data
    })
}
export function logout () {
    return fetch({
        url: 'amj/user/logout',
        method: 'get'
    })
}

export function forgetPassword (data) {
    return fetch({
        url: 'amj/user/resetPasswordByMobile',
        method: 'post',
        data: data
    })
}

export function sentMsg(data){
    return fetch({
        url: 'amj/user/sendMobileCode',
        method: 'post',
        data: data
    })
}

export function getBaseInfo(){
    return fetch({
        url: 'amj/resume/myBaseInfo',
        method: 'get'
    })
}

//用户的操作
//点赞或取消点赞操作
export function isGiveLike(data){
    return fetch({
        url: 'amj/inter/awesome/doOrNot',
        method: 'post',
        data: data
    })
}
//关注用户或者取关操作
export function isFocus(data){
    return fetch({
        url: 'amj/inter/atten/doOrNot',
        method: 'post',
        data: data
    })
}
//收藏或者取消收藏
export function isCollect(data){
    return fetch({
        url: 'amj/inter/favo/doOrNot',
        method: 'post',
        data: data
    })
}
//喜欢或者取消喜欢
export function isLike(data){
    return fetch({
        url: 'amj/inter/like/doOrNot',
        method: 'post',
        data: data
    })
}
//不喜欢
export function dislike(data){
    return fetch({
        url: 'amj/inter/dislike/save',
        method: 'post',
        data: data
    })
}
//留言操作
export function leaveMessage(data){
    return fetch({
        url: 'amj/inter/comm/save',
        method: 'post',
        data: data
    })
}

export function leaveMessageList(data) {
    return fetch({
        url: 'amj/inter/comm/list',
        method: 'post',
        data: data
    })
}
export function listTalRecruit (recruitStatus) {
    return fetch({
        url: 'amj/recruit/listTalRecruit',
        method: 'post',
        data:{
            // recruitStatus: '0' + ',' + recruitStatus
            recruitStatus: recruitStatus
        }
    })
}

export function getInterViewDetail(recruitId) {
    return fetch({
        url: 'amj/inter/getInterviewByRecruitId',
        method: 'post',
        data: {
            recruitId: recruitId
        }
    })
}

export function uploadHeadPic (data) {
    return uploadFetch({
        url: 'amj/user/uploadHeadPic',
        method: 'post',
        data: data
    })
}

export function updateUserInfo (data) {
    return fetch({
        url: 'amj/user/updateUserInfo',
        method: 'post',
        data: data
    })
}

export function uploadResumeFile (data) {
    return uploadFetch({
        url : 'amj/resume/uploadResumeFile',
        method: 'post',
        data: data
    })
}

export function fetchUserBaseInfo() {
    return fetch({
        url: 'amj/user/getUserInfo',
        method: 'post'
    })
}

export function updataPassword (data) {
    return fetch({
        url: 'amj/user/resetPassword',
        method: 'post',
        data: data
    })
}
//拒绝面试
export function refuseInterview (id) {
    return fetch({
        url: 'amj/inter/refuseInterview',
        method: 'post',
        data: {
            id: id
        }
    })
}
//接受面试
export function acceptInterview (id) {
    return fetch({
        url: 'amj/inter/acceptInterview',
        method: 'post',
        data: {
            id: id
        }
    })
}

//喜欢的数量和状态
export function likeNumber (data) {
    return fetch({
        url: 'amj/inter/like/getCountAndStatus',
        method: 'post',
        data: data
    })
}

//收藏的数量和状态
export function collectionNumber(data) {
    return fetch({
        url: 'amj/inter/favo/getCountAndStatus',
        method: 'post',
        data: data
    })
}

//评论的数量
export function commentsNumber(data) {
    return fetch({
        url: 'amj/inter/comm/getCount',
        method: 'post',
        data: data
    })
}