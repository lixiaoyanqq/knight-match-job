<template>
    <div class="interview">
        <van-nav-bar title="邀约面试"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="interview-list">
            <!-- <h1 class="interview-tit">
                职位
            </h1> -->
            <div v-if="interviews.length > 0">
                <div class="interview-card" v-for="(item, index) in interviews" :key="index">
                    <van-row>
                        <van-col span="8">
                            <van-image
                                width="100"
                                height="80"
                                :src="item.entpImg"/>
                        </van-col>
                        <van-col span="16">
                            <h1 @click="onDetail(item)">{{baseInfo.userType === '0' ? item.postName : item.userName}}</h1>
                            <h1>{{baseInfo.userType === '0' ? '邀请人' : '投递职位'}}：{{baseInfo.userType === '0' ? item.hrUserName : item.postName}}</h1>
                            <h1>{{item.entpName}}</h1>
                            <!-- <p>
                                <span>{{item.hrUserName}}</span>
                                <span>|</span>
                                <span>本科</span>
                                <span>|</span>
                                <span>应届生</span>
                            </p> -->
                        </van-col>
                        <!-- <van-col span="4">
                            <h2>12-14k</h2>
                            <h3>未处理</h3>
                        </van-col> -->
                    </van-row>
                </div>
            </div>
            <van-empty v-else :description="baseInfo.userType === '0' ? '您还没有被邀约面试哦' :'您还没有邀请人面试哦'" />
        </section>
    </div>
</template>
<script>
import { getLocalStore } from 'utils/global'
import * as userApi from 'api/user'
import * as compApi from 'api/company'
import { BASE_URL } from 'api/config'
export default {
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            baseInfo: JSON.parse(getLocalStore('baseInfo')),
            recruitStatus: this.$route.query.recruitStatus || null,
            interviews: []
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        onDetail (item) {
            this.$router.push({name: 'interviewDetail', query: {id: item.userId, recruitId:item.id}})
        },
        async init(){
            if (this.baseInfo.userType === '0') {
                // console.log('个人xx')
                if (this.recruitStatus) {
                    let data = await userApi.listTalRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.interviews = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        console.log('this.interviews',this.interviews)
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                    }
                }
            } else if (this.baseInfo.userType === '1') {
                // console.log('公司xx')
                if (this.recruitStatus) {
                    let data = await compApi.checkRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.interviews = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                    }
                }
            }
            
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="stylus" scoped>
.interview
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background-color #f5f5f5
    z-index 999
    overflow-y scroll
.interview-list
    width 90%
    margin 5rem auto 0
    color #000000
.interview-list .interview-tit
    height 30px
    line-height 30px
    font-size 20px
    // padding-left 20px
.interview-card
    margin 10px 0
    padding 15px
    background #ffffff
    border-radius 20px
    box-shadow 0 2px 4px 0 #cccccc
.interview-card h1,
.interview-card p,
.interview-card h2,
.interview-card h3 
    height 26px
    line-height 26px
    font-size 14px
.interview-card h1,
.interview-card p
    padding-left 10px
.interview-card h3 
    font-size 16px
    font-weight bolder
</style>