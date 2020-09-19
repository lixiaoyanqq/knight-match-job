<template>
    <div class="edit-resume">
        <van-nav-bar :title="title"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <van-form @submit="onSubmit" v-model="resumeForm" ref="resumeForm" label-width="100">
            <van-cell-group class="base-info-group" v-if="isBaseInfo">
                <van-field v-model="resumeForm.actualName" name="actualName" label="用户名" placeholder="请输入用户名"></van-field>
                <van-field name="gender" label="性别">
                    <template #input>
                        <van-radio-group v-model="resumeForm.gender" direction="horizontal">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="0">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-model="birthYear"
                    readonly
                    clickable
                    name="birthYear"
                    :value="birthYear"
                    label="选择出生年月"
                    placeholder="点击选择时间"
                    @click="onShowPicker('birthYear')"/>
                <!-- <van-field v-model="resumeForm.heightEdu" name="heightEdu" label="最高学历" placeholder="请输入最高学历"></van-field> -->
                <van-field
                    v-model="startWorkYear"
                    readonly
                    clickable
                    name="startWorkYear"
                    :value="startWorkYear"
                    label="选择工作时间"
                    placeholder="点击选择时间"
                    @click="onShowPicker('startWorkYear')"/>
                <van-field 
                    v-model="resumeForm.livingCity" 
                    name="livingCity" 
                    label="居住城市" 
                    placeholder="请输入居住城市" />
                <van-field 
                    v-model="resumeForm.userMobile" 
                    name="userMobile" 
                    label="手机号码" 
                    placeholder="请输入手机号码"
                    :rules="phone_rule" />
                <van-field 
                    v-model="resumeForm.userEmail" 
                    name="userEmail" 
                    label="邮箱" 
                    placeholder="请输入邮箱"
                    :rules="email_rule" />
            </van-cell-group>
            <van-cell-group class="base-info-group" v-if="isHopeInfo">
                <van-field 
                    v-model="resumeForm.expectCitys" 
                    name="expectCitys" 
                    label="期望城市" 
                    placeholder="请输入期望的工作城市" />
                <van-field
                    v-model="expectJobNature"
                    readonly
                    clickable
                    label="工作性质" 
                    name="expectJobNature"
                    :value="expectJobNature"
                    placeholder="工作性质"
                    @click="onHopePicker('expectJobNature')"/>
                <van-field 
                    v-model="resumeForm.expectTerritorys" 
                    name="expectTerritorys" 
                    label="期望行业" 
                    placeholder="请输入期望行业" />
                <van-field 
                    v-model="resumeForm.expectPosts" 
                    name="expectPosts" 
                    label="期望职位" 
                    placeholder="请输入期望职位" />
                <van-field
                    v-model="expectSalary"
                    readonly
                    clickable
                    label="期望薪资" 
                    name="expectSalary"
                    :value="expectSalary"
                    placeholder="期望薪资"
                    @click="onHopePicker('expectSalary')"/>
            </van-cell-group>
            <van-cell-group class="self-appraisal-box" v-if="isSelfEvaluation">
                <van-field 
                    v-model="resumeForm.selfEvaluation" 
                    name="selfEvaluation" 
                    rows="5" 
                    autosize 
                    type="textarea" 
                    label="描述" 
                    placeholder="描述一下你自己" />
            </van-cell-group>
            <van-cell-group class="education-box" v-if="isEducation">
                <van-field 
                    v-model="resumeForm.schoolName" 
                    name="schoolName" 
                    label="学校名称" 
                    placeholder="请输入学校名称" />
                <van-field 
                    v-model="resumeForm.proName" 
                    name="proName" 
                    label="专业" 
                    placeholder="请输入专业" />
                <van-field 
                    v-model="resumeForm.education" 
                    name="education" 
                    label="学历" 
                    placeholder="请输入学历" />
                <van-field
                    v-model="startTime"
                    readonly
                    clickable
                    name="startTime"
                    :value="startTime"
                    label="入学时间"
                    placeholder="入学时间"
                    @click="onShowPicker('startTime')"/>
                <van-field
                    v-model="endTime"
                    readonly
                    clickable
                    name="endTime"
                    :value="endTime"
                    label="毕业时间"
                    placeholder="毕业时间"
                    @click="onShowPicker('endTime')"/>
            </van-cell-group>
            <van-cell-group class="work-experience-box" v-if="isWork">
                <van-field 
                    v-model="resumeForm.entpName" 
                    name="entpName" label="公司名称" 
                    placeholder="请输入公司名称" />
                <van-field 
                    v-model="resumeForm.post" 
                    name="post" 
                    label="职位" 
                    placeholder="请输入职位" />
                <van-field
                    v-model="startTime" 
                    readonly
                    clickable
                    name="startTime"
                    :value="startTime"
                    label="工作开始时间"
                    placeholder="工作开始时间"
                    @click="onShowPicker('startTime')"/>
                <van-field
                    v-model="endTime" 
                    readonly
                    clickable
                    name="endTime"
                    :value="endTime"
                    label="工作结束时间"
                    placeholder="工作结束时间"
                    @click="onShowPicker('endTime')"/>
                <van-field 
                    v-model="resumeForm.jobDesc" 
                    name="jobDesc" 
                    rows="5" 
                    autosize 
                    type="textarea" 
                    label="工作描述" 
                    placeholder="工作内容与获得的成绩" />
            </van-cell-group>
            <van-cell-group class="award-box" v-if="isAward">
                <van-field 
                    v-model="resumeForm.adwardsName" 
                    name="adwardsName" 
                    label="证书奖项" 
                    placeholder="请输入证书奖项" />
                <van-field 
                    v-model="resumeForm.orgName" 
                    name="orgName" 
                    label="颁奖单位" 
                    placeholder="请输入颁奖单位" />
                <van-field
                    v-model="adwardTime" 
                    readonly
                    clickable
                    name="adwardTime"
                    :value="adwardTime"
                    label="获奖时间"
                    placeholder="获奖时间"
                    @click="onShowPicker('adwardTime')"/>
                <van-field 
                    v-model="resumeForm.adwardDesc" 
                    name="adwardDesc" 
                    rows="5" 
                    autosize 
                    type="textarea" 
                    label="描述" 
                    placeholder="奖项描述" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="info" color="linear-gradient(to right, #2739c8, #f51e67)" native-type="submit">
                    保存
                </van-button>
            </div>
            <van-popup round v-model="showPicker" position="bottom">
                <van-datetime-picker
                type="year-month"
                v-model="currentDate"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
                :formatter="formatter"/>
            </van-popup>
            <van-popup v-model="showHopePicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="onHopeCancel"
                @confirm="onHopeConfirm"/>
        </van-popup>
        </van-form>
    </div>
</template>
<script>
import * as resumeUtil from 'components/home/services/home'
import * as resumeApi from 'api/resume'
import * as resumeType from 'store/resume/mutations_types'
import { mapState, mapActions } from 'vuex'
import { Toast } from 'vant'
export default {
    inject: ['reload'],
    data () {
        return {
            isUpdate: this.$route.query.isUpdate || false,
            title: this.$route.query.title,
            id: this.$route.query.id || null,
            isBaseInfo: this.$route.query.isBaseInfo || false,
            isHopeInfo: this.$route.query.isHopeInfo || false,
            isSelfEvaluation: this.$route.query.isSelfEvaluation || false,
            isEducation: this.$route.query.isEducation || false,
            isWork: this.$route.query.isWork || false,
            isAward: this.$route.query.isAward || false,
            timeName: '',
            birthValue: '',
            birthYear: '',
            startWorkYear: '',
            startTime: '',
            endTime: '',
            adwardTime: '',
            isLoadingShow: true,
            showPicker: false,
            showHopePicker: false,
            currentDate: new Date(),
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2050, 10, 1),
            className: '',
            phone_rule: [{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }],
            email_rule: [{ pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/, message: '输入正确的邮箱号'}],
            resumeForm: this._.merge({}, resumeUtil.BASE_FORM),
            pickerName: '',
            columns: [],
            expectJobNature: '',
            expectJobNatureVal: '',
            expectSalary: '',
            jobNature: [
                { text: '全职', value: '01' },
                { text: '兼职', value: '02' },
                { text: '实习', value: '03' }
            ],
            hopeSalares: ['2k-5k','6k-10k','11k-15k', '16k-20k','21k-30k','30k-40k','50k-70k']
        }
    },
    computed: {
        ...mapState({
            baseInfo (state) {
                return state.resume.resume.baseInfo
            }
        })
    },
    methods: {
        ...mapActions({
            fetchBaseInfo: resumeType.FETCH_R_BASE_INFO
        }),
        getBaseInfo(){
            this.fetchBaseInfo()
        },
        init(){
            if(this.isUpdate){
                this.updataInitFetch().then( res => { this.updateInit(res)})
            } 
        },
        updataInitFetch(){
            if(this.isBaseInfo){
                return resumeApi.baseMessage().then((res) =>{ return res })
            } else if (this.isHopeInfo) {
                return resumeApi.hopeMessahe().then((res) => {return res})
            } else if(this.isSelfEvaluation) {
                return resumeApi.baseMessage().then((res) =>{ return res })
            } else if (this.isEducation) {
                return resumeApi.getEduexp(this.id).then((res) =>{ return res })
            } else if (this.isWork) {
                return resumeApi.getWorkExp(this.id).then((res) =>{ return res })
            } else if (this.isAward) {
                return resumeApi.getAward(this.id).then((res) =>{ return res })
            }
            
        },
        updateInit(initFetchData){
            if (initFetchData.code === '200') {
                if (initFetchData.content.expectSalary && initFetchData.content.expectJobNature) {
                    let val = initFetchData.content.expectJobNature
                    let valObject = this.jobNature.find( item => item.value === val)
                    this.expectJobNature = valObject.text
                    this.expectJobNatureVal = valObject.value
                    this.expectSalary = initFetchData.content.expectSalary
                }
                if (initFetchData.content.startTime && initFetchData.content.endTime) {
                    this.startTime = initFetchData.content.startTime
                    this.endTime = initFetchData.content.endTime
                }
                if (initFetchData.content.startWork) {
                    this.startWork = initFetchData.content.startWork
                }
                if (initFetchData.content.adwardTime) {
                    this.adwardTime = initFetchData.content.adwardTime
                }
                if (initFetchData.content.startWorkYear) {
                    this.startWorkYear = initFetchData.content.startWorkYear
                }
                if (initFetchData.content.birthYear) {
                    this.birthYear = initFetchData.content.birthYear
                }
            }
            this.resumeForm = this._.merge({}, resumeUtil.BASE_FORM, initFetchData.content, {id: this.id})
        },
        onClickLeft(){
            this.$router.back()
        },
        onSubmit(value){
            this.resumeForm = this._.merge({}, value, {id: this.id})
            if(this.isUpdate){
                if(this.isBaseInfo){
                    resumeApi.editBaseMsg(this.resumeForm).then(() =>{
                            Toast.success('编辑成功')
                            this.$router.back()
                        }).catch(() =>{
                            Toast.fail('编辑失败')
                        })
                } else if (this.isHopeInfo) {
                    this.resumeForm.expectJobNature = this.expectJobNatureVal
                    resumeApi.editHopeMsg(this.resumeForm).then(() =>{
                            Toast.success('编辑成功')
                            this.$router.back()
                        }).catch(() =>{
                            Toast.fail('编辑失败')
                        })
                } else if (this.isSelfEvaluation) {
                    resumeApi.editSelfEvaluation(this.resumeForm).then(() =>{
                            Toast.success('编辑成功')
                            this.$router.back()
                        }).catch(()=>{
                            Toast.fail('编辑失败')
                        })
                } else if (this.isEducation) {
                    resumeApi.editEduexp(this.resumeForm).then(()=>{
                        Toast.success('编辑成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('编辑失败')
                    })
                } else if (this.isWork) {
                    resumeApi.editWorkExp(this.resumeForm).then(()=>{
                        Toast.success('编辑成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('编辑失败')
                    })
                } else if (this.isAward) {
                    resumeApi.editAward(this.resumeForm).then(()=>{
                        Toast.success('编辑成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('编辑失败')
                    })
                }
            } else {
                if (this.isEducation) {
                    resumeApi.addEduexp(this.resumeForm).then(()=>{
                        Toast.success('添加成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('添加失败')
                    })
                } else if (this.isWork) {
                    resumeApi.addWorkExp(this.resumeForm).then(()=>{
                        Toast.success('添加成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('添加失败')
                    })
                } else if (this.isAward) {
                    resumeApi.addAward(this.resumeForm).then(()=>{
                        Toast.success('添加成功')
                        this.$router.back()
                    }).catch(()=>{
                        Toast.fail('添加失败')
                    })
                }
            }
            
        },
        // 显示弹窗
        showPopup () {
            this.show = true
            this.isLoadingShow = true
            setTimeout(() => {
                this.isLoadingShow = false
            }, 500)
        },
        onHopePicker(name) {
            this.showHopePicker = true
            this.pickerName = name
            if (this.pickerName === 'expectJobNature') {
                this.columns = this.jobNature
            }

            if (this.pickerName === 'expectSalary') {
                this.columns = this.hopeSalares
            }

        },
        onHopeCancel () {
            this.showHopePicker = false
            this.columns = []
        },
        onHopeConfirm (val) {
            if(this.pickerName === 'expectJobNature') {
                this[this.pickerName] = val.text
                this.expectJobNatureVal = val.value
                this.showHopePicker = false
            }
            if (this.pickerName === 'expectSalary') {
               this[this.pickerName] = val
               this.showHopePicker = false
            }
            
        },
        onShowPicker(name){
            this.showPicker = true
            this.timeName = name
        },
        onConfirm (val) {
            let year = val.getFullYear()
            let month = val.getMonth() + 1
            let day = val.getDate()
            let hour = val.getHours()
            let minute = val.getMinutes()
            if (month >= 1 && month <= 9) { month = `0${month}` }
            if (day >= 1 && day <= 9) { day = `0${day}` }
            if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
            if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
            this.className = 'timeClass'
            // this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`
            this[this.timeName] = `${year}-${month}`
            this.showPicker = false
        },
        // 选项格式化函数
        formatter (type, value) {
            if (type === 'year') {
                return `${value}年`
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            } else if (type === 'hour') {
                return `${value}时`
            } else if (type === 'minute') {
                return `${value}分`
            } else if (type === 'second') {
                return `${value}秒`
            }
            return value
        }
    },
    created () {
        this.init()
    },
    watch: {
        $route (to) {
            this.reload()
        }
    }
}
</script>
<style lang="stylus" scoped>
.edit-resume
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 199;
.van-form
    margin-top 2.5em
.timeClass
    color: #333;
.van-field
    height auto

</style>