<template>
    <div class="resume-detail">
        <van-nav-bar title="简历中心"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="company-logo">
            <div class="head-portrait">
              <img :src="userHead" />
            </div>
        </section>
        <section class="resume-name">
            <van-row>
                <van-col span="20">
                    <h1>{{resemeBaseInfo.actualName || '-'}}</h1>
                    <p>简历完整度 <span>{{resemeBaseInfo.perfection || '-'}}%</span></p>
                </van-col>
                <van-col span="4">
                    <van-button class="opr-btn" @click="editBaseInfo(resemeBaseInfo.id)" size="mini" :icon="editIcon" />
                </van-col>
            </van-row>
        </section>
        <section class="hope-infor">
            <h1>
                <van-row>
                    <van-col span="20">
                        <span>期望信息</span>
                    </van-col>
                    <van-col span="4">
                        <van-button class="opr-btn" @click="editHope(resemeBaseInfo.id)" size="mini" :icon="editIcon" />
                    </van-col>
                </van-row>
            </h1>
            <van-row>
                <van-col span="24">
                    <van-tag round v-if="resumeHopeInfo.expectCitys"  size="medium" color="#88a1ef">{{resumeHopeInfo.expectCitys}}</van-tag>
                    <van-tag round v-if="resumeHopeInfo.expectJobText"   size="medium" color="#f86e99">{{resumeHopeInfo.expectJobText}}</van-tag>
                    <van-tag round v-if="resumeHopeInfo.expectPosts"  size="medium" color="#f1bd39">{{resumeHopeInfo.expectPosts}}</van-tag>
                    <van-tag round v-if="resumeHopeInfo.expectSalary"   size="medium" color="#88a1ef">{{resumeHopeInfo.expectSalary}}</van-tag>
                    <van-tag round v-if="resumeHopeInfo.expectTerritorys"   size="medium" color="#f86e99">{{resumeHopeInfo.expectTerritorys}}</van-tag>
                </van-col>
            </van-row>
        </section>
        <section class="education">
            <h1>
                <van-row>
                <van-col span="19">
                    <span>教育经历</span>
                </van-col>
                <van-col span="5">
                    <van-button class="opr-btn" size="mini" @click="addEducation" :icon="addIcon" />
                </van-col>
                </van-row>
            </h1>
            <div class="education-list" v-for="(eduexp, index) in resuemEduexps.listx" :key="index">
                <van-row>
                    <van-col span="19">
                        <h2>{{eduexp.schoolName}}</h2>
                        <p><span>{{eduexp.education}}</span><span>-</span><span>{{eduexp.proName}}</span></p>
                        <p><span>{{eduexp.startTime}}</span><span>-</span><span>{{eduexp.endTime}}</span></p>
                    </van-col>
                    <van-col span="5">
                        <van-button class="opr-btn" size="mini" @click="editEducation(eduexp.id)" :icon="editIcon" />
                        <van-button class="opr-btn" size="mini" @click="delEducation(eduexp.id)" :icon="delIcon" />
                    </van-col>
                </van-row>
            </div>
        </section>
        <section class="projects">
            <h1>
                <van-row>
                    <van-col span="19">
                        <span>项目经历</span>
                    </van-col>
                    <van-col span="5">
                        <van-button class="opr-btn" size="mini" @click="addProject" :icon="addIcon" />
                    </van-col>
                </van-row>
            </h1>
            <div class="project-list" v-for="(project, index) in resumeProjects.listx" :key="index">
                <van-row>
                    <van-col span="19">
                        <h2>{{project.projectName}}</h2>
                        <p>{{project.projectType}}</p>
                        <p><span>{{project.projectEntpName}}</span><span>-</span><span>{{project.projectPost}}</span></p>
                        <p><span>{{project.startProjectTime}}</span><span>-</span><span>{{project.endProjectTime}}</span></p>
                    </van-col>
                    <van-col span="5">
                        <van-button class="opr-btn" size="mini" @click="editProject(project.id)" :icon="editIcon" />
                        <van-button class="opr-btn" size="mini" @click="delProject(project.id)" :icon="delIcon" />
                    </van-col>
                </van-row>
                <h2>
                    <span>项目说明</span>
                </h2>
                <p>
                    {{project.projectDesc}}
                </p>
                <van-divider />
            </div>
        </section>
        <section class="work-experience">
            <h1>
                <van-row>
                    <van-col span="19">
                        <span>工作经历</span>
                    </van-col>
                    <van-col span="5">
                        <van-button class="opr-btn" size="mini" @click="addWork" :icon="addIcon" type="default" />
                    </van-col>
                </van-row>
            </h1>
            <div class="work-list" v-for="(work, index) in resumeWorks.listx" :key='index'>
                <h2>
                   <van-row>
                        <van-col span="19">
                            <span>{{work.entpName}}</span>
                        </van-col>
                        <van-col span="5">
                            <van-button class="opr-btn" size="mini" @click="editWork(work.id)" :icon="editIcon" />
                            <van-button class="opr-btn" size="mini" @click="delWork(work.id)" :icon="delIcon" />
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
                    <van-col span="19">
                        <span>证书信息</span>
                    </van-col>
                    <van-col span="5">
                        <van-button class="opr-btn" size="mini" @click="addAward" :icon="addIcon" />
                    </van-col>
                </van-row>
            </h1>
            <div class="awards-list" v-for="(award, index) in resumeAwards.listx" :key="index">
                <h2>
                   <van-row>
                        <van-col span="19">
                            <span>{{award.adwardsName}}</span>
                        </van-col>
                        <van-col span="5">
                            <van-button class="opr-btn" size="mini" @click="editAward(award.id)" :icon="editIcon" />
                            <van-button class="opr-btn" size="mini" @click="delAward(award.id)" :icon="delIcon" />
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
        <section class="personal-profile">
            <h1>
                <van-row>
                <van-col span="20">
                    <span>个人简介</span>
                </van-col>
                <van-col span="4">
                    <van-button class="opr-btn" size="mini" @click="editIntro(resemeBaseInfo.id)" :icon="editIcon" />
                </van-col>
                </van-row>
            </h1>
            <p>
                {{resemeBaseInfo.selfEvaluation || '-'}}
            </p>
        </section>
        <transition name="van-slide-right">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import { Dialog, Toast } from 'vant'
import * as resuemeType from 'store/resume/mutations_types'
import * as resumeApi from 'api/resume'
import * as userApi from 'api/user'
import { mapState, mapActions } from 'vuex'
import { BASE_URL } from 'api/config'
export default {
    components: {
        Dialog,
        Toast
    },
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            schoolImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
            images: [
                require('common/image/detail/personal-pic.png'),
                require('common/image/detail/personal-pic.png'),
                require('common/image/detail/personal-pic.png'),
            ],
            addIcon: require('common/image/detail/addicon.png'),
            delIcon: require('common/image/detail/delicon.png'),
            editIcon: require('common/image/detail/editicon.png'),
            jobNature: [
                { text: '全职', value: '01' },
                { text: '兼职', value: '02' },
                { text: '实习', value: '03' }
            ],
            resumeHopeInfo: {},
            userHead: '',
        }
    },
    computed: {
        ...mapState({
            resemeBaseInfo (state){
                return state.resume.resume.baseInfo
            },
            resuemEduexps (state) {
                return state.resume.resume.eduexps
            },
            resumeWorks (state) {
                return state.resume.resume.works
            },
            resumeAwards (state) {
                return state.resume.resume.awards
            },
            resumeProjects (state) {
                return state.resume.resume.projects
            }
        })
    },
    methods: {
        ...mapActions({
            fetchResumeBase: resuemeType.FETCH_R_BASE_INFO,
            fetchResumeHope: resuemeType.FETCH_R_HOPE_INFO,
            fetchResumeEduexps: resuemeType.FETCH_R_EDUEXPS,
            fetchReusmeWorks: resuemeType.FETCH_R_WORKS,
            fetchResumeAwards: resuemeType.FETCH_R_AWARDS,
            fetchResumeProjects: resuemeType.FETCH_R_PROJECT_EXPS
        }),
        getResumeBaseInfo(){
            this.fetchResumeBase()
            
        },
        async getResumeHopeInfo() {
            let data = await this.fetchResumeHope()
            if (data.code === '200' && data.content.expectJobNature) {
                let val = data.content.expectJobNature
                let valObject = this.jobNature.find( item => item.value === val)
                let valText = valObject.text
                this.resumeHopeInfo = {...data.content, expectJobText: valText}
            }
        },
        getResumeEduexps(){
            this.fetchResumeEduexps()
        },
        getResumeWorks(){
            this.fetchReusmeWorks()
        },
        getResumeAwards(){
            this.fetchResumeAwards()
        },
        getResumeProjects () {
            this.fetchResumeProjects()
        },
        onClickLeft(){
            this.$router.back()
        },
        editBaseInfo(id){
            this.$router.push({ name: 'editResume', query: { title: '基本信息', id: id, isBaseInfo: true, isUpdate: true}})
        },
        editHope (id) {
            this.$router.push({ name: 'editResume', query: { title: '期望信息', id: id, isHopeInfo: true, isUpdate: true}})
        },
        editIntro(id) {
            this.$router.push({ name: 'editResume', query: { title: '编辑自我评价', id: id, isSelfEvaluation: true, isUpdate: true}})
        },
        addEducation(){
            this.$router.push({ name: 'editResume', query: { title: '添加教育经历', id: null, isEducation: true}})
        },
        addProject() {
            this.$router.push({ name: 'editResume', query: { title: '添加项目经历', id: null, isProject: true}})
        },
        editProject (id) {
            this.$router.push({ name: 'editResume', query: { title: '编辑项目经历', id: id, isProject: true, isUpdate: true}})
        },
        delProject (id) {
            Dialog.confirm({
                title: '删除提醒',
                message: '确认删除',
            }).then(()=>{
                resumeApi.delProjectExp(id).then( res =>{
                    Toast.success(res.content)
                    this.$store.dispatch(resuemeType.FETCH_R_PROJECT_EXPS)
                })
            }).catch(()=>{

            })
        },
        editEducation(id){
            this.$router.push({ name: 'editResume', query: { title: '编辑教育经历', id: id, isEducation: true, isUpdate: true}})
        },
        delEducation(id){
            Dialog.confirm({
                title: '删除提醒',
                message: '确认删除',
            }).then(()=>{
                resumeApi.deleteEduexp(id).then( res =>{
                    Toast.success(res.content)
                    this.$store.dispatch(resuemeType.FETCH_R_EDUEXPS)
                })
            }).catch(()=>{

            })
        },
        addWork(){
            this.$router.push({ name: 'editResume', query: { title: '添加工作经历', id: null, isWork: true,}})
        },
        editWork(id){
            this.$router.push({ name: 'editResume', query: { title: '编辑工作经历', id: id, isWork: true, isUpdate: true}})
        },
        delWork(id){
            Dialog.confirm({
                title: '删除提醒',
                message: '确认删除',
            }).then(()=>{
                resumeApi.deleteWorkExp(id).then( res =>{
                    Toast.success(res.content)
                    this.$store.dispatch(resuemeType.FETCH_R_WORKS)
                })
            }).catch(()=>{

            })
        },
        addAward(){
            this.$router.push({ name: 'editResume', query: { title: '添加奖项证书', id: null, isAward: true}})
        },
        editAward(id){
            this.$router.push({ name: 'editResume', query: { title: '编辑奖项证书', id: id, isAward: true, isUpdate: true}})
        },
        delAward(id){
            Dialog.confirm({
                title: '删除提醒',
                message: '确认删除',
            }).then(()=>{
                resumeApi.delAward(id).then( res =>{
                    Toast.success(res.content)
                    this.$store.dispatch(resuemeType.FETCH_R_AWARDS)
                })
            }).catch(()=>{

            })
        },
        onInvite(id) {

        },
        closed(){
            this.isPopup = false
            this.title = '',
            this.isBaseInfo = false,
            this.isSelfAppraisal = false
            this.isEducation = false
        },
        async getUserBaseInfo () {
            let data = await userApi.fetchUserBaseInfo()
            if (data.code === '200') {
                this.userBaseInfo = data.content
                this.userBaseInfo.profilePicture ? this.userHead = `${BASE_URL}${this.userBaseInfo.profilePicture}` : 
                this.userHead = require("common/image/personal/user-head.png")
            }
        }
    },
    mounted(){
        this.getUserBaseInfo()
        this.getResumeBaseInfo()
        this.getResumeHopeInfo()
        this.getResumeEduexps()
        this.getResumeWorks()
        this.getResumeAwards()
        this.getResumeProjects()
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
.head-portrait
    margin 0 auto
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
    width 90%
    height 60px
    margin 0 auto
.resume-name h1 
    color #000000
    font-size 20px 
    padding-left 10px 
    padding-top 10px
.resume-name p 
    padding 5px 0 0 10px
    color #999999
.opr-btn
    width 24px
    height 24px
    // box-shadow 0 2px 6px 0 #4a4c50
.opr-btn .van-icon
    font-size 20px
.resume-name,
.hope-infor,
.personal-profile, 
.education, 
.projects,
.work-experience,
.awards
    width 90%
    padding 20px 0
    margin 0 auto
    background #ffffff
    border-radius 10px
    margin-top 10px
.projects h1,
.hope-infor h1,
.personal-profile h1, 
.education h1, 
.work-experience h1,
.awards h1
    height 24px
    line-height 24px
    color #000000
.hope-infor h1 span,
.personal-profile h1 span, 
.education h1 span, 
.projects h1 span,
.work-experience h1 span,
.awards h1 span
    padding-left 10px
.personal-profile p
    color #666666
    font-size 14px
    line-height 16px
    padding 0 10px
.education-list, .project-list
    margin-top 10px
.education-list .school-pic
    width 80%
    height auto
    margin 0 auto
.education-list .school-pic .van-image img
    width 100%
    height 100% 
    overflow hidden
.education-list h2, .project-list h2
    color #000000
    font-size 16px
    padding-left 15px
.education-list p, .project-list p
    padding-top 8px
    font-size 14px
    color #666666
    padding-left 15px
.work-list h2, .project-list h2
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
.van-button--default
    background none 
    border none
.hope-infor .van-tag
    margin 3px 0
.hope-infor .van-tag:first-child
    margin-left 10px
.head-portrait {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  overflow: hidden;
}

.head-portrait img {
  width: 100%;
  height: 100%;
}
.hope-message
    color #000000
    padding-left 10px
</style>