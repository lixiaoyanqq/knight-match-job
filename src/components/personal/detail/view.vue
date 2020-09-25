<template>
    <div class="view">
        <van-nav-bar title="查看"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="view-list">
            <!-- <h1 class="view-tit">
                职位
            </h1> -->
            <div v-if="views.length > 0">
                <div class="view-card" v-for="item in views" :key="item.id">
                    <van-row>
                        <van-col span="8">
                            <van-image
                                width="100"
                                height="80"
                                :src="baseInfo.userType === '0' ? item.entpImg : item.avatar"/>
                        </van-col>
                        <van-col span="16">
                            <h1 class="view-value" @click="onDetail(item)">{{baseInfo.userType === '0' ? item.entpName : item.userName}}</h1>
                            <h1>{{baseInfo.userType === '0' ? '投递职位' : '应聘岗位'}}：{{baseInfo.userType === '0' ? item.postName : item.postName}}</h1>
                            <h1>{{item.createTime}}</h1>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <van-empty v-else :description="baseInfo.userType === '0' ? '您还没有被公司查看哦' : '您还没有传看过简历哦'" />
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
            views: []  
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        onDetail (item) {
            if (this.baseInfo.userType === '0') {
                this.$router.push({name: 'posDetail', query: {id: item.postId}})
            }
            if (this.baseInfo.userType === '1') {
                this.$router.push({name: 'likeResumeDetail', query: {id: item.userId, recruitId:item.id}})
            }
            
        },
        async init(){
            if (this.baseInfo.userType === '0') {
                // console.log('个人--')
                if (this.recruitStatus) {
                    let data = await userApi.listTalRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.views = data.content.listx
                        this.views = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                        console.log('this.views',this.views)
                    }
                }
            } else if(this.baseInfo.userType === '1'){
                // console.log('公司--')
                if (this.recruitStatus) {
                    let data = await compApi.checkRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.views = data.content.listx
                        this.views = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                        console.log('this.views',this.views)
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
.view
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.view-list
    width 90%
    margin 5rem auto 0
    color #000000
.view-list .view-tit
    height 30px
    line-height 30px
    font-size 20px
    // padding-left 20px
.view-card
    margin 10px 0
    padding 15px
    background #ffffff
    border-radius 20px
    box-shadow 0 2px 4px 0 #cccccc
.view-card h1,
.view-card p,
.view-card h2,
.view-card h3 
    height 28px
    line-height 28px
    font-size 14px
.view-card h1,
.view-card p
    padding-left 10px
.view-card h3 
    font-size 16px
    font-weight bolder
</style>