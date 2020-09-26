import fetch from 'utils/fetch'

export function likeResumeList() {
    return fetch({
        url: 'amj/inter/favo/listFavTal',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}

export function resumeDetail (data) {
    return fetch({
        url: 'amj/resume/getUserAllResumeByUid',
        method: 'post',
        data: data
    })
}

export function baseMessage(){
    return fetch({
        url: "amj/resume/myBaseInfo",
        method: 'get'
    })
}

export function hopeMessahe () {
    return fetch({
        url: 'amj/resume/getMyExpect',
        method: 'get'
    })
}

export function editHopeMsg (data) {
    return fetch({
        url: 'amj/resume/updateMyExpect',
        method: 'post',
        data: data
    })
}

export function saveBseMsg(data){
    return fetch({
        url: '/amj/resume/save',
        method: 'post',
        data: data
    })
}

export function editBaseMsg(data){
    return fetch({
        url: 'amj/resume/update',
        method: 'post',
        data: data
    })
}

export function editMyExpect(data){
    return fetch({
        url: 'amj/resume/updateMyExpect',
        method: 'post',
        data: data
    })
}

export function editSelfEvaluation(data){
    return fetch({
        url: 'amj/resume/updateSelfEvaluation',
        method: 'post',
        data: data
    })
}
//获取所有的教育经历
export function getAllEduexp(){
    return fetch({
        url: 'amj/eduexp/list',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}
//获取某条教育经历
export function getEduexp(id){
    return fetch({
        url: `amj/eduexp/get/${id}`,
        method: 'get'
    })
}
//添加教育经历
export function addEduexp(data){
    return fetch({
        url: 'amj/eduexp/save',
        method: 'post',
        data: data
    })
}
//编辑教育经历
export function editEduexp(data){
    return fetch({
        url: 'amj/eduexp/update',
        method: 'post',
        data: data
    })
}
//删除某条教育经历
export function deleteEduexp(id){
    return fetch({
        url: 'amj/eduexp/del',
        method: 'post',
        data: {
            id: id
        }
    })
}
//获取我的工作经历列表
export function workExpList(){
    return fetch({
        url: 'amj/jobexp/list',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}
//添加工作经历
export function addWorkExp(data){
    return fetch({
        url: 'amj/jobexp/save',
        method: 'post',
        data: data
    })
}
//根据Id获取某条工作经历
export function getWorkExp(id){
    return fetch({
        url: `amj/jobexp/get/${id}`,
        method: 'get'
    })
}
//编辑工作经历
export function editWorkExp(data){
    return fetch({
        url: 'amj/jobexp/update',
        method: 'post',
        data: data
    })
}
//根据Id删除某条工作经历
export function deleteWorkExp(id){
    return fetch({
        url: 'amj/jobexp/del',
        method: 'post',
        data: {
            id: id
        }
    })
}

//获取项目经历列表
export function getProjectExpList() {
    return fetch({
        url: 'amj/proexp/list',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}

//添加项目经历
export function addProjectExp(data) {
    return fetch({
        url: 'amj/proexp/save',
        method: 'post',
        data: data
    })
}

//编辑项目经历
export function editProjectExp(data) {
    return fetch({
        url: 'amj/proexp/update',
        method: 'post',
        data: data
    })
}

//查看项目经历
export function getProjectExp(id) {
    return fetch({
        url: `amj/proexp/get/${id}`,
        method: 'get'
    })
}

//删除项目经历
export function delProjectExp(id) {
    return fetch({
        url: 'amj/proexp/del',
        method: 'post',
        data: {
            id: id
        }
    })
}

//获取经理证书列表
export function awardList(){
    return fetch({
        url: 'amj/awards/list',
        method: 'post',
        data: {
            pageNum: '1',
            pageSize: '10'
        }
    })
}
//添加奖项证书
export function addAward(data){
    return fetch({
        url: 'amj/awards/save',
        method: 'post',
        data: data
    })
}
//根据ID获取某条
export function getAward(id){
    return fetch({
        url: `amj/awards/get/${id}`,
        method: 'get'
    })
}
//根据ID删除某条
export function delAward(id){
    return fetch({
        url: 'amj/awards/del',
        method: 'post',
        data: {
            id: id
        }
    })
}
//编辑奖项证书
export function editAward(data){
    return fetch({
        url: 'amj/awards/update',
        method: 'post',
        data: data
    })
}

export function doNotFit (id) {
    return fetch({
        url: 'amj/recruit/unsuit',
        method: 'post',
        data: {
            id: id
        }
    })
}