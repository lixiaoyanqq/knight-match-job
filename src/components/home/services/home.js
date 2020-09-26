import _ from 'lodash'

export function transformTermtoArray (term = {}){
    let res = []
    _.forOwn(term, (v, k) => {
      res.push({ key: k, value: v })
    })
    return res
  }

export function extractTypesArry (arry = []){
  console.log('arry',arry)
    let res = {
      postType: [],
      postNum: [],
      deliverNum: []

    }
    arry.map((item, index)=>{
        res.postType.push(item.postType)
        res.postNum.push(item.postNum)
        res.deliverNum.push(item.deliverNum)
    })
    return res
}
export function extractKeyArry (arry = []){
  console.log('arry',arry)
    let res = {
        key: [],
        val: []
    }
    arry.map((item, index)=>{
        res.key.push(item.key)
        res.val.push(item.value)
    })
    console.log('res',res)
    return res
}

export function extractKey ( arry = [] ){
  let res = []
  arry.map((item, index) =>{
    res.push(item.key)
  })
  return res
}

export const BASE_FORM = {
  //个人基本信息
  id: null,
  actualName: '',         //姓名
  gender: '1',             //性别
  userMobile: '',         //手机号
  userEmail: '',          //邮箱
  birthYear: '',          //出生年月
  startWrokYear: '',      //参加工作年月
  livingCity: '',         //所在城市
  resumeStatus: '',       //目前工作状态
  selfEvaluation: '',     //自我评价
  //期望信息
  expectCitys: '',        //期望城市
  expectJobNature: '',    //期望工作性质
  expectTerritorys: '',   //期望行业
  expectPosts: '',        //期望职位
  expectSalary: '',        //期望薪水
  //教育经历
  schoolName: '',         //学校名称
  proName: '',            //专业
  startTime: '',          //入校时间
  endTime: '',            //离校时间
  education: '',          //学历
  unified: '',            //是否统招
  eduDesc: '',            //学习情况描述
  //项目经历
  projectName: '',        //项目名称
  projectEntpName: '',    //项目所在公司
  projectPost: '',        //所任职位
  startProjectTime: '',   //项目开始时间
  endProjectTime: '',     //项目结束时间
  projectDesc: '',        //项目介绍
  projectType: '',        //项目类型
  //工作经历
  entpName: '',           //公司名称
  post: '',//职位
  startWorkTime: '',      //开始工作时间
  endWorkTime: '',        //结束工作时间
  jobDesc: '',            //职位描述
  //证书奖项
  adwardsName: '',        //证书奖项信息
  orgName: '',            //颁发证书奖项机构
  adwardTime: '',         //获得奖项时间
  adwardDesc: ''          //描述
}

export const BASE_OPEN_FORM = {
  postName: '',         //名称
  postDept: '',         //名称
  postWorktype: '',     //全职，兼职，实习（选择）
  postSalary: '',       //选择薪水范围
  postCity: '',         //职位城市(选择)
  district: '',         //详细地址
  reqJobExp: '',        //
  reqAcademic: '',      //学历（选择）
  postAllure: '',       //福利
  postRequirements: '', //职位要求
  postDemand: '',       //职位职责
  postWorkplace: '',    //具体地址
  recruitNum: 0,       //招聘人数
  postCatg: ''          //职位类别
}