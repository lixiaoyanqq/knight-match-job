import fetch from 'utils/fetch'

export function posDetail(id){
    return fetch({
        url: `amj/post/get/${id}`,
        method: 'get'
    })
}

export function onDelivery(id){
    return fetch({
        url: 'amj/recruit/delivery',
        method: 'post',
        data: {
            postId: id
        }
    })
}

export function commList(data){
    return fetch({
        url: 'amj/inter/comm/list',
        method: 'post',
        data: data
    })
}

export function otherCommList (data) {
    return fetch({
        url: 'amj/search/post/recomByPost',
        method: 'post',
        data: data
    })
}

export function favoPosts (){
    return fetch({
        url: 'amj/inter/favo/listFavPost',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}

export function offerInterView (data) {
    return fetch({
        url: 'amj/inter/sendInterview',
        method: 'post',
        data: data
    })
}

export function sentInterView (data) {
    return fetch({
        url: 'amj/inter/activeInvitation',
        method: 'post',
        data: data
    })
}