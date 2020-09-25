<template>
    <div class="resume-detail">
        <van-nav-bar title="简历详情"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem" >
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <!-- <section class="desc-swipe">
            <van-swipe class="my-swipe" :width="'100%'" :height="200" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <div class="resume-pic">
                        <van-image :src="image" />
                    </div>
                </van-swipe-item>
            </van-swipe>
        </section> -->
        <section class="company-logo">
            <div class="head-portrait">
              <img :src="userHead" />
            </div>
        </section>
        <section class="resume-name">
            <van-row>
                <van-col :span="userInfo.userType === '1' ? '14' : '20'">
                    <h1>{{resemeBaseInfo.actualName || '-'}}</h1>
                </van-col>
                <van-col v-if="isUnFit !== true" :span="userInfo.userType === '1' ? '10' : '4'">
                    <van-button v-if="id && resemeBaseInfo.isUnfit === '0'" class="invite-btn" @click="onNotFit(resemeBaseInfo.userId)" size="mini">
                        不合适
                    </van-button>
                    <van-button class="invite-btn" :disabled="resemeBaseInfo.isInterView === '1'" @click="onInvite(resemeBaseInfo.userId)" size="mini">
                        {{resemeBaseInfo.isInterView === '1' ? '已邀请' : '邀请面试'}}
                    </van-button>
                    <van-icon @click="onFover(resemeBaseInfo)" :name="resemeBaseInfo.isFavorites === '1' ? 'star' : 'star-o'" />
                </van-col>
            </van-row>
        </section>
        <section class="personal-profile">
            <h1>
                <van-row>
                    <van-col span="24">
                        <span>个人简介</span>
                    </van-col>
                </van-row>
            </h1>
            <p>
                {{resemeBaseInfo.selfEvaluation || '-'}}
            </p>
        </section>
        <section class="education">
            <h1>
                <van-row>
                    <van-col span="24">
                        <span>教育经历</span>
                    </van-col>
                </van-row>
            </h1>
            <div class="education-list" v-for="(eduexp, index) in resuemEduexps" :key="index">
                <van-row>
                    <!-- <van-col span="8">
                        <div class="school-pic">
                            <van-image :src="eduexp.schoolImg || schoolImg"/>
                        </div>
                    </van-col> -->
                    <van-col span="24">
                        <h2>{{eduexp.schoolName}}</h2>
                        <p><span>{{eduexp.education}}</span><span>-</span><span>{{eduexp.proName}}</span></p>
                        <p><span>{{eduexp.startTime}}</span><span>-</span><span>{{eduexp.endTime}}</span></p>
                    </van-col>
                </van-row>
            </div>
        </section>
        <section class="work-experience">
            <h1>
                <van-row>
                    <van-col span="24">
                        <span>工作经历</span>
                    </van-col>
                </van-row>
            </h1>
            <div class="work-list" v-for="(work, index) in resumeWorks" :key='index'>
                <h2>
                   <van-row>
                        <van-col span="24">
                            <span>{{work.entpName}}</span>
                        </van-col>
                    </van-row> 
                </h2>
                <p>
                    {{work.post}}
                </p>
                <p>
                    {{work.startTime}} / {{work.endTime}}
                </p>
                <h2>
                    <span>职责业绩</span>
                </h2>
                <p>
                    {{work.jobDesc}}
                </p>
                <van-divider />
            </div>
        </section>
        <section class="awards">
            <h1>
                <van-row>
                    <van-col span="24">
                        <span>证书信息</span>
                    </van-col>
                </van-row>
            </h1>
            <div class="awards-list" v-for="(award, index) in resumeAwards" :key="index">
                <h2>
                   <van-row>
                        <van-col span="24">
                            <span>{{award.adwardsName}}</span>
                        </van-col>
                    </van-row> 
                </h2>
               <ul>
                   <li><span>{{award.orgName || '-'}}</span></li>
                   <li>{{award.adwardTime || '-'}}</li>
                   <li>{{award.adwardDesc || '-'}}</li>
                </ul> 
                <van-divider />
            </div>
        </section>
    </div>
</template>
<script>
import { Dialog, Toast } from 'vant'
import * as resuemeType from 'store/resume/mutations_types'
import * as resumeApi from 'api/resume'
import * as userApi from 'api/user'
import { mapState, mapActions } from 'vuex'
import { getLocalStore } from "utils/global"
import { BASE_URL } from 'api/config'
export default {
    inject: ['reload'],
    components: {
        Dialog,
        Toast
    },
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
            id: this.$route.query.id || null,
            cvId: this.$route.query.cvId || null,
            recruitId: this.$route.query.recruitId || null,
            isUnFit: this.$route.query.recruitId || null,
            resemeBaseInfo: {},
            resumeExpectDto: {},
            resumeProjectExp: [],
            resuemEduexps: [],
            resumeWorks: [],
            resumeAwards:[],
            schoolImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
            images: [
                require('common/image/detail/personal-pic.png'),
                require('common/image/detail/personal-pic.png'),
                require('common/image/detail/personal-pic.png'),
            ],
            userHead: ''
        }
    },
    computed: {},
    methods: {
        ...mapActions({
            fetchDetail: resuemeType.FETCH_RESUME
        }),
        onClickLeft(){
            this.$router.back()
        },
        async getResumeDetail(){
            if(this.id){
                // console.log('收藏列表进')
                let prams = {
                    userId: this.id.toString(),
                    recruitId: this.recruitId.toString()
                }
                let data = await this.fetchDetail(prams)
                if(data.code === '200'){
                    this.initData(data.content)
                }
            }
            if(this.cvId){
                // console.log('首页进的')
                let prams = {
                    cvId: this.cvId
                }
                let data = await this.fetchDetail(prams)
                if(data.code === '200'){
                    this.initData(data.content)
                }
            }
            
        },
        async onFover(val){
            let params = {
                resId: val.userId,
                resType: '2'
                
            }
            let data = await userApi.isCollect(params)
            if (data.code === '200') {
                Toast.success('操作成功')
                this.getResumeDetail()
            }
        },
        onInvite (id) {
            this.$router.push({name: 'offerInterView', query: {id: id,recruitId: this.recruitId}})
        },
        async onNotFit () {
            let data = await resumeApi.doNotFit(this.recruitId)
            if (data.code === '200') {
                Toast.success('操作成功')
                this.getResumeDetail()
            } 
        },
        initData(data){
            this.resemeBaseInfo = data.resumeBaseInfoDto
            if(this.resemeBaseInfo.userHeadPic) {
                this.userHead = `${BASE_URL}${this.resemeBaseInfo.userHeadPic}`
            } else {
                this.userHead = require("common/image/home/default-avatar.jpeg")
            }
            this.resumeExpectDto = data.expectDto
            this.resuemEduexps = data.eduExpList
            this.resumeWorks = data.jobExpList
            this.resumeProjectExp = data.projectExpList
            this.resumeAwards = data.awardsList
            // console.log('initData',data)
        }
    },
    mounted(){
        this.getResumeDetail()
    },
    watch: {
        $route (to) {
            this.reload()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.company-logo
    margin-top 4rem
    text-align center
    width 100%
    padding 30px 0
.head-portrait {
    margin 0 auto
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
}

.head-portrait img {
  width: 100%;
  height: 100%;
}
.resume-detail
    padding-bottom 80px
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 999
    background $color-background
    overflow-y scroll
.resume-pic
    width 80%
    height 90%
    margin 10px auto
.resume-pic .van-image
    width 100%
    height 100%
    overflow hidden
    border-top-right-radius 70px
.resume-name 
    height 60px
.resume-name h1 
    color #000000
    font-size 20px 
    padding-left 29px 
    padding-top 23px
.resume-name p 
    padding 5px 0 0 15px
    color #999999
.resume-name .van-icon
    font-size 24px
    padding-top 15px
    color #ff5a8c
.opr-btn
    width 24px
    height 24px
    box-shadow 0 2px 6px 0 #4a4c50
.opr-btn .van-icon
    font-size 20px
.personal-profile, 
.education, 
.work-experience,
.awards
    width 90%
    padding 20px 0
    margin 0 auto
    background #ffffff
    border-radius 10px
    margin-top 10px
.personal-profile h1, 
.education h1, 
.work-experience h1,
.awards h1
    height 24px
    line-height 24px
    color #000000
.personal-profile h1 span, 
.education h1 span, 
.work-experience h1 span,
.awards h1 span
    padding-left 10px
.personal-profile p
    color #666666
    font-size 14px
    line-height 16px
    padding 0 10px
.education-list
    margin-top 10px
.education-list .school-pic
    width 80%
    height auto
    margin 0 auto
.education-list .school-pic .van-image img
    width 100%
    height 100% 
    overflow hidden
.education-list h2 
    color #000000
    font-size 16px
    padding-left 15px
.education-list p
    padding-left 15px
    padding-top 8px
    font-size 14px
    color #666666
.work-list h2 
    color #000000
    font-size 14px
    line-height 24px
.work-list h2 span 
    padding-left 10px
.work-list p 
    color #666666
    padding 0 15px 5px
    font-size 14px
    line-height 16px
// .edit-resume
//     background red
//     width 100% 
//     height 100%
.popup-box
    width 85%
    padding 10px 0
    margin 0 auto
    // background blue
.popup-box h1 
    text-align center
    color #000000
    line-height 35px
.cust-label 
    padding-top 14px
.cust-label span
    color #646566
    font-size 14px
    padding 16px
.awards h2
    color #000000
    font-size 14px
    padding-left 10px
    line-height 28px
.awards-list ul
    padding 10px
    color #666666
    font-size 14px
.awards-list ul li
    line-height 18px
.invite-btn
    position relative
    bottom 6px
    background linear-gradient(to right, #2739c8, #f51e67)
    color #ffffff
    border-radius 6px
</style>