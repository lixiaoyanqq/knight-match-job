<template>
    <div class="view">
        <van-nav-bar title="查看"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <section class="view-list">
            <!-- <h1 class="view-tit">
                职位
            </h1> -->
            <div v-if="views.length > 0">
                <div class="view-card">
                    <van-row>
                        <van-col span="8">
                            <van-image
                                width=""
                                height=""
                                src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                        </van-col>
                        <van-col span="12">
                            <h1>张俊梅</h1>
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
                            <h3>未处理</h3>
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
export default {
    data () {
        return {
            baseInfo: JSON.parse(getLocalStore('baseInfo')),
            recruitStatus: this.$route.query.recruitStatus || null,
            views: []  
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        async init(){
            if (this.baseInfo.userType === '0') {
                // console.log('个人--')
                if (this.recruitStatus) {
                    let data = await userApi.listTalRecruit(this.recruitStatus)
                    if(data && data.content && data.content.listx) {
                        this.views = data.content.listx
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
    margin-top 3rem
    width 90%
    margin 3rem auto
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
    height 36px
    line-height 36px
    font-size 14px
.view-card h1,
.view-card p
    padding-left 10px
.view-card h3 
    font-size 16px
    font-weight bolder
</style>