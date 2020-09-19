<template>
    <div class="delivery">
        <van-nav-bar title="投递详情"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem" >
        <template #left>
            <van-icon :name="leftIcon" size="20" />
        </template>
        </van-nav-bar>
        <section class="delivery-list" >
            <!-- <h1 class="delivery-tit">
                职位
            </h1> -->
            <div v-if="deloveries.length > 0">
                <div class="delivery-card" v-for="(item, index) in deloveries" :key="index">
                    <van-row>
                        <van-col span="8">
                            <van-image
                                width="100"
                                height="80"
                                :src="baseInfo.userType === '0' ? item.entpImg : item.avatar"/>
                        </van-col>
                        <van-col span="12">
                            <h1 class="view-value" @click="onDetail(item)">{{baseInfo.userType === '0' ? item.entpName : item.userName}}</h1>
                            <h1>{{baseInfo.userType === '0' ? '投递职位' : '应聘岗位'}}：{{baseInfo.userType === '0' ? item.postName : item.postName}}</h1>
                            <p>
                                <span>北京</span>
                                <span>|</span>
                                <span>本科</span>
                                <span>|</span>
                                <span>应届生</span>
                            </p>
                        </van-col>
                        <van-col span="4">
                            <h2>12-14k</h2>
                            <!-- <h3>未处理</h3> -->
                        </van-col>
                    </van-row>
                </div>
            </div>
            <van-empty v-else :description="baseInfo.userType === '0' ? '您还没有投递简历哦' : '还没有人投递哦'" />
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
            deloveries: []
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        onDetail (item) {
            if (this.baseInfo.userType === '0') {
                console.log('看职位详情')
                this.$router.push({name: 'posDetail', query: {id: item.id}})
            }
            if (this.baseInfo.userType === '1') {
                this.$router.push({name: 'likeResumeDetail', query: {id: item.userId, recruitId:item.id}})
            }
            
        },
        async init(){
            if (this.baseInfo.userType === '0') {
                // console.log('个人++')
                if(this.recruitStatus) {
                    let data = await userApi.listTalRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.deloveries = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                        console.log('this.deloveries',this.deloveries)
                    }
                }
            } else if (this.baseInfo.userType === '1') {
                // console.log('公司++')
                if (this.recruitStatus) {
                    let data = await compApi.checkRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.deloveries = data.content.listx
                        this.deloveries = data.content.listx.map( item => {
                            return {...item, avatar: `${BASE_URL}${item.userHeadPic}`, entpImg: item.entpLogo ? `${BASE_URL}${item.entpLogo}` : null}
                        })
                        // this.deloveries = JSON.parse(JSON.stringify(data.content.listx))
                        console.log('this.deloveries',this.deloveries)
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
.delivery
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.delivery-list
    margin-top 4rem
    width 90%
    margin 3rem auto
    color #000000
.delivery-list .delivery-tit
    height 30px
    line-height 30px
    font-size 20px
    // padding-left 20px
.delivery-card
    margin 10px 0
    padding 15px
    background #ffffff
    border-radius 20px
    box-shadow 0 2px 4px 0 #cccccc
.delivery-card h1,
.delivery-card p,
.delivery-card h2,
.delivery-card h3 
    // height 26px
    line-height 26px
    font-size 14px
.delivery-card h1,
.delivery-card p
    padding-left 10px
.delivery-card h3 
    font-size 16px
    font-weight bolder
.view-value
  display -webkit-box
  overflow hidden
  -webkit-line-clamp 1
  text-overflow ellipsis
  -webkit-box-orient vertical
</style>