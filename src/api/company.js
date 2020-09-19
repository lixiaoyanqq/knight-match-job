import fetch from 'utils/fetch'
import uploadFetch from 'utils/uploadFetch'

export function getMyEntp(){
    return fetch({
        url: 'amj/entp/getMyEntp',
        method: 'post'
    })
}

export function addCompany(data){
    return fetch({
        url: 'amj/entp/save',
        method: 'post',
        data: data
    })
}

export function editCompany(data){
    return fetch({
        url: 'amj/entp/update',
        method: 'post',
        data: data
    })
}

export function countRecruitStatus () {
    return fetch({
        url: 'amj/recruit/countRecruitStatus',
        method: 'get'
    })
}

export function checkRecruit (recruitStatus) {
    return fetch({
        url: 'amj/recruit/listHrRecruit',
        method: 'post',
        data:{
            // recruitStatus: '0' + ',' + recruitStatus
            recruitStatus: recruitStatus
        }
    })
}

export function uploadEnptLogo (data) {
    return uploadFetch({
        url: 'amj/entp/uploadEntpLogo',
        method: 'post',
        data: data
    })
}