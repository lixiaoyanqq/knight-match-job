import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import Dashboard from 'components/dashboard/Dashboard'

// 懒加载二级组件 Tarbar
const Home = () => import('components/home/list/List')
const Position = () => import('components/position/list/List')
const Message = () => import('components/message/list/List')
const Personal = () => import('components/personal/list/List')
const ResumeCollection = () => import('components/resume/list/List')

const UserCenter = () => import('components/personal/detail/user-center')
const InterviewDetail = () => import('components/personal/detail/interview-detail')
const MyMessage = () => import('components/personal/detail/my-message')
const MyCompany = () => import('components/personal/detail/my-company')
const ResumeCollect = () =>import('components/personal/detail/resume-collection')
const ProblemFeedback =() =>import('components/personal/detail/problem-feedback')
const SetUp = () => import('components/personal/detail/set-up')
const UploadResume = () => import('components/personal/detail/upload-resume')
const Delivery = () => import('components/personal/detail/delivery')
const View = () => import('components/personal/detail/view')
const InterView = () => import('components/personal/detail/interview')
const NotFit = () => import('components/personal/detail/notfit')

const PosDetail = () => import('components/pos-desc/Detail')
const Resume = () => import('components/home/resume/Resume')
const LikeResumeDetail = () => import('components/home/resume/Detail')
const EditResume = () => import('components/home/resume/edit-resume')
const OfferInterView = () => import('components/home/resume/offer-interview')
const PositionManage = () => import('components/home/position-manage/List')
const OpenPosition = () => import('components/home/position-manage/open-position')
const SearchPosition = () => import('components/home/search/search-position')
const SearchResume = () => import('components/home/search/search-resume')


//注册登录
const Login = () =>import('components/login/index')

Vue.use(Router)
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export const constantRouterMap =  [
    {
      //登录
      
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      // // 是否数据缓存
      // meta: {
      //     keepAlive: true
      // },
    },
    {
      // 根页面 
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/dashboard',
          redirect: '/dashboard/home',
          meta: {
            keepAlive: true
          }
        },
        {
          //主页
          path: 'home',
          name: 'home',
          component: Home,
          children: [
            {
              //简历中心
              path: 'resumeDetail',
              name: 'resumeDetail',
              component: Resume
            },
            {
              //C端--简历详情
              path: 'likeResumeDetail',
              name: 'likeResumeDetail',
              component: LikeResumeDetail
            },
            {
              //编辑简历
              path: 'editResume',
              name: 'editResume',
              component: EditResume
            },
            {
              //C端搜索职位
              path: 'searchPosition',
              name: 'searchPosition',
              component: SearchPosition
            },
            {
              //B端搜索简历
              path: 'searchResume',
              name: 'searchResume',
              component: SearchResume
            },
            {
              //B端--职位管理
              path: 'positionManage',
              name: 'positionManage',
              component: PositionManage
            },
            {
              //B端--发布职位
              path: 'openPosition',
              name: 'openPosition',
              component: OpenPosition
            },
            {
              //B端--发送面试
              path: 'offerInterView',
              name: 'offerInterView',
              component: OfferInterView
            }
          ]
        },
        {
          //职位详情
          path: 'posDetail',
          name: 'posDetail',
          component: PosDetail
        },
        {
          // C端 职位收藏
          path: 'position',
          name: 'position',
          component: Position
        },
        {
          //B端 简历收藏
          path: 'resume',
          name: 'resume',
          component: ResumeCollection
        },
        {
          //消息中心
          path: 'message',
          name: 'message',
          component: Message
        },
        {
          //个人中心
          path: 'personal',
          name: 'personal',
          component: Personal,
          children: [
            {
              //用户中心
              path: 'userCenter',
              name: 'userCenter',
              component: UserCenter
            },
            {
              //面试详情
              path: 'interviewDetail',
              name: 'interviewDetail',
              component: InterviewDetail
            },
            {
              //公司--我的消息
              path: 'myMessage',
              name: 'myMessage',
              component: MyMessage
            },
            {
              //公司--收藏的简历
              path: 'resumeCollect',
              name: 'resumeCollect',
              component: ResumeCollect
            },
            {
              //公司--我的公司
              path: 'myCompany',
              name: 'myCompany',
              component: MyCompany
            },
            {
              //公司--问题反馈
              path: 'problemFeedback',
              name: 'problemFeedback',
              component: ProblemFeedback
            },
            {
              //公司--投递
              path: 'delivery',
              name: 'delivery',
              component: Delivery
            },
            {
              //公司--查看
              path: 'view',
              name: 'view',
              component: View
            },
            {
              //公司--邀约面试
              path: 'interview',
              name: 'interview',
              component: InterView
            },
            {
              //公司--不合适
              path: 'notfit',
              name: 'notfit',
              component: NotFit
            },
            {
              //公司--设置
              path: 'setUp',
              name: 'setUp',
              component: SetUp
            },
            {
              //个人--上传简历
              path: 'uploadResume',
              name: 'uploadResume',
              component: UploadResume
            }
          ]
        }
      ]
    }
  ]
const router = new Router({
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
