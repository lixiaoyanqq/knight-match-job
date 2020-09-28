import fetch from 'utils/fetch'

export function getCity(){
    return fetch({
        url: 'amj/resume/getMyExpect',
        method: 'get',
        // params: {
        //     area: 1
        // }
    })
}

export function getDashboard(){
    return fetch({
        url: 'amj/me/getMyDashboard',
        method: 'get'
    })
}

export function getCompDashboard(){
    return fetch({
        url: 'amj/entp/entpDashboard',
        method: 'get'
    })
}

export function top5List(data){
    return fetch({
        url: "amj/search/post/list",
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum,
            queryInfo: data.queryInfo
        }
    })
}

export function cardList(data){
    return fetch({
        url: "amj/search/post/list",
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum,
            queryInfo: data.queryInfo
        }
    })
}
export  function postList () {
    return fetch({
        url: 'amj/post/list',
        method: 'post',
        data: {
            pageSize: '20',
            pageNum: '1'
        }
    })
}
export function addPost (data) {
    return fetch({
        url: 'amj/post/save',
        method: 'post',
        data: data
    })
}

export function editPost (data) {
    return fetch({
        url: 'amj/post/update',
        method: 'post',
        data: data
    })
}

export function switchPublish (data){
    return fetch({
        url: 'amj/post/switchPublish',
        method: 'post',
        data: data
    })
}

export function onePost (id) {
    return fetch({
        url: `amj/post/get/${id}`,
        method: 'get'
    })
}

export function applicantTop (data) {
    return fetch({
        url: 'amj/search/tal/recommend',
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum,
            postId: data.postId
        }
    })
}

export function applicantList (data) {
    return fetch({
        url: 'amj/search/tal/recommend',
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum,
            postId: data.postId
        }
    })
}

export function keySearchResume(data) {
    return fetch({
        url: 'amj/search/tal/search',
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum ,
            queryInfo: data.queryInfo,
            city: data.city
        }
    })
}

export function keySearchPosition(data) {
    return fetch({
        url: 'amj/search/post/query',
        method: 'post',
        data: {
            pageSize: data.pageSize,
            pageNum: data.pageNum ,
            queryInfo: data.queryInfo,
            city: data.city
        }
    })
}

//留言反馈列表
export function feedbackList (data) {
    return fetch({
        url: 'amj/inter/comm/listWithReply',
        method: 'post',
        data: {
            resId: '1',
            resType: '3',
            pageNum: data.pageNum,
            pageSize: data.pageSize
        }
    })
}