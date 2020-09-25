<template>
    <div ref="topRecomment" class="top-recomment">
        <div class="top-tit">
            <van-row>
                <van-col span="6"><span>TOP 5</span></van-col>
                <van-col span="14"></van-col>
                <van-col span="4"><van-icon size="24" :name="rightIcon"/></van-col>
            </van-row>
        </div>
        <div class="top-slider-box" v-if="baseInfo.userType === '0'">
            <van-swipe :loop="false" :width="220" :height="320" :show-indicators='false'>
                <van-swipe-item  v-for="(top, index) in postTop5" :key="index">
                    <div :class="'slider-card' + (index + 1)" class="slider-card">
                        <div class="slider-content">
                            <h1 class="view-value" @click="onPosDetail(top.id)">
                                {{top.postName}}
                                <van-icon :name="intoDetailIcon" size="50" />
                            </h1>
                            <p class="view-value">{{top.entpName}}</p>
                            <p>{{top.reflushFmtTime}}</p>
                            <p class="view-value">{{top.city}}</p>
                            <h2 class="pos-salary">{{top.postSalary}}</h2>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="top-slider-box" v-else>
            <van-swipe :loop="false" :width="220" :height="320" :show-indicators='false'>
                <van-swipe-item  v-for="(top, index) in resumeTop5" :key="index">
                    <div :class="'slider-card' + (index + 1)" class="slider-card">
                        <div class="slider-content">
                            <h1 @click="onResDetail(top.cvId)">
                                {{top.name || '-'}}
                                <van-icon :name="intoDetailIcon" size="50" />
                            </h1>
                            <p>{{top.schoolName || '-'}}</p>
                            <p>{{top.degree || '-'}}</p>
                            <p>{{top.major || '-'}}</p>
                            <h2 class="pos-salary">{{top.expectSalary || '-'}}</h2>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { getLocalStore } from 'utils/global'
import { mapActions, mapGetters, mapState} from 'vuex'
import * as type from "store/home/mutations_types"
import * as userType from 'store/user/mutations_types'
import * as homeApi from 'api/home'
import * as userApi from 'api/user'
import { Dialog } from 'vant'
export default {
    inject: ['reload'],
    data () {
        return {
            baseInfo: JSON.parse(getLocalStore('baseInfo')) || { userStatus : '1'},
            rightIcon: require('common/image/home/let-right-icon.png'),
            intoDetailIcon: require('common/image/home/into-detail.png'),
            resumeTop5: [],
            postTop5: [],
            isLogin: false
        }
    },
    computed: {
        ...mapState({
            top5(state){
                return state.home.tops.top5
            },
            idkey (state) {
                return state.user.searchKey.searchResumeIdKey
            },
            namekey (state) {
                return state.user.searchKey.searchPositionNameKey
            }
        })
    },
    methods: {
        ...mapActions({
            fetchTop5: type.FETCH_TOP5,
            logout: userType.LOGOUT
        }),
        async getTop5(){
            if(this.baseInfo.userType === '0') {
                let parmsp = {
                    pageSize: '5',
                    pageNum: '1',
                    queryInfo: this.namekey ? this.namekey : ''
                }
                let data = await homeApi.top5List(parmsp)
                if(data.code === '200') {
                    this.postTop5 = data.content.listx
                }
            } else if (this.baseInfo.userType === '1') {
                let parmsr = {
                    pageSize: '5',
                    pageNum: '1',
                    postId: this.idkey ? this.idkey.toString() : ''
                }
                let data = await homeApi.applicantTop(parmsr)
                if(data && data.code === '200') {
                    this.resumeTop5 = data.content.listx
                }
            }
            // return this.fetchTop5()
        },
        onPosDetail(id){
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
        beforeClose(action, done){
            if(action === 'confirm'){
                this.logout()
                this.$router.push({ name: 'login'})
                done()
            } else {
                done()
            }
        },
        onResDetail(clId){
            if (this.isLogin) {
                this.$router.push({name: 'likeResumeDetail', query: {cvId: clId}})
            } else {
                Dialog.confirm({
                    title: '退出提示',
                    message: '登录过期，请先登录',
                    beforeClose: this.beforeClose
                })
            }
            
        },
        setScrollTop () {
            // let stop = this.$refs.topRecomment.childNodes[0].setScrollTop
            // console.log('stop',stop)
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
    created (){
        this.getTop5()
        this.getUserInfo()
    },
    watch: {
        'idkey': {
            handler(val, oldVal) {
                this.getTop5()
                // this.setScrollTop()
            },
            deep: true
        },
        'namekey': {
            handler(val, oldVal) {
               this.getTop5() 
            }
        },
        $route (to) {
            this.reload()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.top-tit
    width 100%
    height 60px
    line-height 50px
    color #000
.top-tit span 
    font-size 24px
    font-weight bolder
    padding-left 15px
.slider-card
    width 100%
    height 100%
.slider-card1
    background url('~common/image/home/top-bg-1.png') 100% 100% no-repeat
    background-size cover
.slider-card2
    background url('~common/image/home/top-bg-2.png') 100% 100% no-repeat
    background-size cover
.slider-card3
    background url('~common/image/home/top-bg-3.png') 100% 100% no-repeat
    background-size cover
.slider-card4
    background url('~common/image/home/top-bg-4.png') 100% 100% no-repeat
    background-size cover
.slider-card5
    background url('~common/image/home/top-bg-5.png') 100% 100% no-repeat
    background-size cover
.slider-content
    width 180px
    margin  0 auto
    padding-top 110px
    color $color-text
.slider-content h1
    font-size 18px
    line-height 32px
    font-weight bolder
    padding 0 10px
.slider-content p
    line-height 24px
    padding 0 10px
.slider-content h2
    font-size 24px
    line-height 54px
    padding 0 10px
.slider-content span 
    font-size 14px
    padding-left 5px
.slider-content h1 .van-icon
    animation mymove 1s infinite
    -webkit-animation mymove 1s infinite
    position relative
    top 16px
.view-value
  display -webkit-box
  overflow hidden
  -webkit-line-clamp 1
  text-overflow ellipsis
  -webkit-box-orient vertical
.pos-salary
    font-weight bolder
@keyframes mymove
    from 
        left 0px
    to 
        left 10px
</style>