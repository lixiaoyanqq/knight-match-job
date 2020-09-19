import fetch from 'utils/fetch'

export function getMessages(roleType){
    return fetch({
        url: 'amj/mess/list',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10',
            roleType: roleType
        }
    })
}