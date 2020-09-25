<template>
    <div class="card-list">
        <div class="card-list-title">
            <h1>猜你喜欢</h1>
        </div>
        <van-pull-refresh v-show="userInfo.userType === '0'" v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div id="position-content">
                    <div class="card-box" @click.prevent="selectPos(cont.id)" v-for="(cont, index) in resumeCards" :key="index">
                        <div class="card-content">
                            <van-row>
                                <van-col span="12">
                                    <h1 class="card-left-up">
                                        <span>{{cont.postName.length > 6 ? cont.postName.substring(0,6)+'...' : cont.postName}}</span>
                                        <van-icon @click.stop="onLikePos(cont)" color="#ff5a8c" size="22" :name="cont.isLike === '1' ? 'like' : 'like-o'" />
                                    </h1>
                                    <h2 class="card-left-down">{{cont.postSalary}}<span>k/月</span> </h2>
                                </van-col>
                                <van-col span="12">
                                    <h1 class="card-right-up">
                                        <van-icon color="#a2b0b6" size="16" name="clock-o" />
                                        <span>{{cont.reflushFmtTime}}</span>
                                    </h1>
                                    <h2 class="card-right-down">HR <span>{{cont.Id || '-'}}</span> </h2>  
                                </van-col>
                            </van-row>
                            <div class="divider"></div>
                            <van-row>
                                <van-col span="8">
                                    <h1 class="card-down card-down-left">公司名称</h1>
                                    <p class="card-p view-value">{{cont.entpName}}</p>
                                </van-col>
                                <van-col span="8">
                                    <h1 class="card-down card-down-center">公司地址</h1>
                                    <p class="card-p view-value">{{cont.city}}</p>
                                </van-col>
                                <van-col span="8">
                                    <h1 class="card-down card-down-right">热度</h1>
                                    <p class="card-p">{{cont.entpId}}</p>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </div>  
            </van-list>
        </van-pull-refresh>
        <van-pull-refresh v-show="userInfo.userType === '1'" v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div id="resume-content">
                    <div class="card-box" @click="onLikeResumeDetail(item)" v-for="item in tempRecm" :key="item.cvId">
                        <div class="card-content">
                            <h1 class="objective-tit">
                                <van-row>
                                    <van-col span="24">
                                        <span class="objective-label">求职意向：</span>
                                        <span class="objective-text">{{item.expectPosts || '-'}}</span>
                                    </van-col>
                                    <!-- <van-col span="4">
                                        <van-button icon="clear" color="#ffffff" type="primary" size="mini"/>
                                    </van-col> -->
                                </van-row>
                            </h1>
                            <van-row>
                                <van-col span="8">
                                    <van-image width="100" height="100" :src="renPic"/>
                                </van-col>
                                <van-col span="16">
                                    <p class="applicant">
                                        <span class="applicant-name">{{item.name || '-'}}</span>
                                        <span class="applicant-icon"><van-icon :name="sexIcon" color="#07c160" />{{item.gender || '-'}}</span>
                                        <span class="applicant-icon"><van-icon :name="exopIcon" color="#07c160" />{{item.degree || '-'}}</span>
                                        <span class="applicant-icon"><van-icon :name="posiIcon" color="#07c160" />{{item.expectCitys || '-'}}</span>
                                    </p>
                                    <p class="applicant">
                                        <van-rate readonly v-model.trim="item.matchLevel" allow-half color="#ff5a8c" void-color="#ff5a8c" />
                                        <span class="applicant-rate">（推荐指数）</span>
                                    </p>
                                    <p class="applicant">
                                        <van-tag color="#eff1fb" size="large">{{item.schoolName.length > 6 ?  item.schoolName.substring(0,6)+'...' : item.schoolName || '-'}}</van-tag>
                                        <van-tag color="#eff1fb" size="large">{{item.major.length > 6 ? item.major.substring(0,6)+'...' : item.major || '-'}}</van-tag>
                                    </p>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { mapActions, mapState} from 'vuex'
import * as type from "store/home/mutations_types"
import * as homeApi from 'api/home'
import * as userApi from 'api/user'
import { getLocalStore } from 'utils/global'
import { Dialog, Notify, Toast } from 'vant'
import store from 'store'
import * as userType from 'store/user/mutations_types'
export default {
    data () {
        return {
            refreshing: false,
            loading: false,
            finished: false,
            isLogin: false,
            renPic: require('common/image/home/ren.png'),
            userInfo: JSON.parse(getLocalStore('baseInfo')) || { userStatus : '0'},
            value: 2.5,
            sexIcon: require('common/image/home/sex.png'),
            resumeCards: [],
            resumeCard: '',
            total: '1',   //总条数
            pageNum: '2',     //页码
            pageSize: '5',      //每页条数
            rowStart: '',   //哪条开始
            exopIcon: require('common/image/home/exop.png'),
            posiIcon: require('common/image/home/position.png'),
            tempRecm: [],
            tempRecmAdd : ''
        }
    },
    computed: {
        ...mapState({
            idkey (state) {
                return state.user.searchKey.searchResumeIdKey
            },
            namekey (state) {
                return state.user.searchKey.searchPositionNameKey
            }
        })
    },
    methods:{
        ...mapActions({
            fetchCards: type.FETCH_CARDS,
            fetchRecommend: type.FETCH_RECOMMEND,
            logout: userType.LOGOUT
        }),
        async getCards(){
            let that = this
            if (this.userInfo.userType === '0') {
                let pramP = {
                    'pageSize': this.pageSize.toString(),
                    'pageNum': this.pageNum.toString(),
                    'queryInfo': this.namekey ? this.namekey : ''
                }
                let data = await this.fetchCards(pramP)
                if (data && data.listx) {
                    this.resumeCards = data.listx
                    that.total = data.total
                    if (that.resumeCards.length >= that.total) {
                        that.finished = true
                    }
                }
            }
            
            if (this.userInfo.userType === '1'){
                let pramR = {
                    'pageSize': this.pageSize.toString(),
                    'pageNum': this.pageNum.toString(), 
                    'postId': this.idkey ? this.idkey.toString() : ''
                    }
                let data = await this.fetchRecommend(pramR)
                if(data && data.listx) {
                    data.listx.forEach( (item) => {
                        item.matchLevel = Number(item.matchLevel)
                    })
                    that.tempRecm = data.listx
                    that.total = data.total
                    that.refreshing = false
                    if (that.tempRecm.length >= that.total) {
                        that.finished = true
                    }
                }
            }
        },
        onRefresh () {
            this.pageNum = '1'
            this.finished = false
            this.getCards()
        },
        //上拉加载
        async onLoad () {
            this.pageNum++
            // console.log('this.pageNum',this.pageNum)
            let that = this
            if (this.userInfo.userType === '0') {
                let params = {
                    'pageSize': this.pageSize.toString(),
                    'pageNum': this.pageNum.toString(), 
                    'queryInfo': this.namekey ? this.namekey : ''
                }
                // console.log('params',params)
                let data = await this.fetchCards(params)
                if (data && data.listx) {
                    that.resumeCard = data.listx
                    that.total = data.total
                    that.resumeCard.forEach( v => { that.resumeCards.push(v) })
                    this.loading = false
                    // console.log('this.resumeCards.length',this.resumeCards.length)
                    // console.log('this.total',this.total)
                    if (this.resumeCards.length >= this.total -5) {
                        this.finished = true
                    }
                }
            }
            if (this.userInfo.userType === '1') {
                let params = {
                    'pageSize': this.pageSize.toString(),
                    'pageNum': this.pageNum.toString(), 
                    'postId': this.idkey ? this.idkey.toString() : ''
                }
                let data = await this.fetchRecommend(params)
                if (data && data.listx) {
                    data.listx.forEach( (item) => {
                        item.matchLevel = Number(item.matchLevel)
                    })
                    that.tempRecmAdd = data.listx
                    that.total = data.total
                    that.tempRecmAdd.forEach( v => {
                        that.tempRecm.push(v)
                    })
                    this.loading = false
                    if (this.tempRecm.length >= this.total - 5) {
                        this.finished = true
                    }
                }
            }
        },
        onLikeResumeDetail(resume){
            if (this.isLogin) {
                this.$router.push({name: 'likeResumeDetail', query: {cvId: resume.cvId}})
            } else {
                Dialog.confirm({
                    title: '退出提示',
                    message: '登录过期，请先登录',
                    beforeClose: this.beforeClose
                })
            }
            
        },
        selectPos (id) {
            if (this.isLogin) {
                this.$router.push({name: 'posDetail', query: {id: id}})
            } else {
                Dialog.confirm({
                    title: '退出提示',
                    message: '登录过期，请先登录',
                    beforeClose: this.beforeClose
                })
            }
            
        },
        async onLikePos(item){
            let params = {
                resId: item.id,
                resType: '1',
                resName: item.postName,
                
            }
            let data = await userApi.isLike(params)
            if (data.code === '200') {
                Toast.success('操作成功')
                this.pageNum = '2'
                this.pageSize = '5'
                this.getCards()
            } else if (data.code === '0004') {
                Dialog.confirm({
                    title: '退出提示',
                    message: '登录过期，请先登录',
                    beforeClose: this.beforeClose
                })
            }
        },
        beforeClose(action, done){
            if(action === 'confirm'){
                this.logout()
                this.$router.push({ name: 'login'})
                done()
            } else {
                done()
            }
        },
        async init(){
            let data = await homeApi.applicantList()
            if(data && data.content && data.content.listx) {
               data.content.listx.forEach( (item) => {
                   item.matchLevel = Number(item.matchLevel)
               })
               this.tempRecm = data.content.listx
            }
        },
        loadHeight () {
            let winHeight = document.documentElement.clientHeight
            if (this.userInfo.userType === '0') {
                document.getElementById('position-content').style.minHeight = (winHeight - 300) +'px'
            }
            if (this.userInfo.userType === '1') {
                document.getElementById('resume-content').style.minHeight = (winHeight - 300) +'px'
            }
            
        },
        async getUserInfo () {
            let data = await userApi.fetchUserBaseInfo()
            if(data.code === '200') {
                this.isLogin = true
            } else if (data.code === '0004') {
                this.isLogin = false
            }
        }
    },
    mounted () {
        // this.init()
        this.getCards()
        this.loadHeight()
        this.getUserInfo()
    },
    watch: {
        'idkey': {
            handler(val, oldVal) {
                this.getCards()
                // this.setScrollTop()
            },
            deep: true
        },
        'namekey': {
            handler(val, oldVal) {
               this.getCards() 
            }
        },
        $route (to) {
            this.reload()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"

.card-list-title
    width 100%
.card-list-title h1 
    font-size 24px
    font-weight bolder
    line-height 50px
    padding-left 15px
    color #000
.card-box
    width 90%
    padding 20px 0
    background #ffffff
    margin 10px auto
    border-radius 10px
    margin-bottom 15px
.card-content
    width 90%
    margin 0 auto
.card-content .card-left-up
    font-size 16px
    color $color-text-b
    line-height 40px
.card-content .card-left-up .van-icon
    position relative
    top 5px
    padding-left 5px
    font-size 18px
.card-content .card-left-down 
    color #283ac8
    font-size 30px
    font-weight bolder
.card-content .card-left-down span
    font-size 20px
    padding-left 5px
.card-content .card-right-up
    padding-top 15px
    color #a2b0b6
.card-content .card-right-up .van-icon
    padding-right 5px
.card-content .card-right-up span
    font-size 16px
    display inline-block
.card-content .card-right-down
    color #fe5a8c
    padding-top 18px
.card-content .divider
    width 100%
    height 3px
    background #f0f3f8
    margin 10px auto
.card-content .card-down
    width 80px
    height 24px
    border-radius 15px
    text-align center
    line-height 24px
    margin 0 auto
    color $color-text
    font-size 14px
.card-content .card-p
    color #a9aeb2
    text-align center
    line-height 20px
    font-size 14px
    margin-top 10px
.card-content .card-down-left
    background -webkit-gradient(linear, 0 0, 100% 100%, from(#87a0ef), to(#b3bef3));
.card-content .card-down-center
    background -webkit-gradient(linear, 0 0, 100% 100%, from(#f8729c), to(#fbccdd));
.card-content .card-down-right
    width 60px
    background -webkit-gradient(linear, 0 0, 100% 100%, from(#f0bc32), to(#fae7c2));
.objective-tit
    height 44px
    line-height 44px
    font-size 18px
    // margin-top 10px
.objective-label
    color #a9aeb2
.objective-text
    color #000000
.applicant
    color #a9aeb2
    height 34px
    line-height 34px
.applicant-name
    color #000000
    font-size 18px
.applicant-icon .van-icon
    padding-right 3px
.applicant-rate
    color #000000
.applicant .van-tag
    color #a9aeb2
.objective-tit .van-button
    paddingh-top 30px
.objective-tit .van-icon
    color #cbced1
    font-size 30px
.view-value
  display -webkit-box
  overflow hidden
  -webkit-line-clamp 2
  text-overflow ellipsis
  -webkit-box-orient vertical
</style>