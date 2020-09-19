<template>
    <div class="complete-resume">
        <van-nav-bar :title="title"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <van-form v-model="resumeForm" ref="resumeForm" :rules="resumeRules" label-width="100">
            <van-cell-group class="base-info-group" v-if="isBaseInfo">
                <van-field v-model="resumeForm.actualName" name="actualName" label="用户名" placeholder="请输入用户名"></van-field>
                <van-field name="radio" label="性别">
                    <template #input>
                        <van-radio-group v-model="resumeForm.gender" direction="horizontal">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="0">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <!-- 时间选择器可用作弹出层 -->
                <van-field 
                    readonly 
                    clickable 
                    name="datetimePicker" 
                    :value="birthValue" 
                    label="出生年月" 
                    placeholder="请输入出生年月"
                    @click="showPicker = true">
                    <van-popup v-model="showPicker" position="bottom">
                        <van-datetime-picker 
                            type="year-month" 
                            title="选择年月" 
                            @confirm="onConfirm" 
                            @cancel="showPicker = false"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :formatter="formatter">

                        </van-datetime-picker>
                    </van-popup>
                </van-field>
                <van-field v-model="resumeForm.heightEdu" name="heightEdu" label="最高学历" placeholder="请输入最高学历"></van-field>
                <van-field v-model="resumeForm.startWork" name="startWork" label="参加工作时间" placeholder="请输入参加工作时间"></van-field>
                <van-field v-model="resumeForm.liveCity" name="liveCity" label="居住城市" placeholder="请输入居住城市"></van-field>
                <van-field v-model="resumeForm.phoneNumber" name="phoneNumber" label="手机号码" placeholder="请输入手机号码"></van-field>
                <van-field v-model="resumeForm.email" name="email" label="邮箱" placeholder="请输入邮箱"></van-field>
            </van-cell-group>
            <van-cell-group class="self-appraisal-box" v-if="isSelfAppraisal">
                <van-field v-model="resumeForm.selfAppraisal" name="selfAppraisal" rows="10" autosize type="textarea" label="描述" placeholder="描述一下你自己"></van-field>
            </van-cell-group>
            <van-cell-group class="education-box" v-if="isEducation">
                <van-field v-model="resumeForm.schoolName" name="schoolName" label="学校名称" placeholder="请输入学校名称"></van-field>
                <van-field v-model="resumeForm.departments" name="departments" label="专业" placeholder="请输入专业"></van-field>
                <van-field v-model="resumeForm.professional" name="professional" label="学历" placeholder="请输入学历"></van-field>
                <van-field v-model="resumeForm.startTime" name="startTime" label="入学时间" placeholder="请输入入学时间"></van-field>
                <van-field v-model="resumeForm.endTime" name="endTime" label="毕业时间" placeholder="请输入毕业时间"></van-field>
            </van-cell-group>
            <van-cell-group class="work-experience-box" v-if="isWork">
                <van-field v-model="resumeForm.company" name="company" label="公司名称" placeholder="请输入公司名称"></van-field>
                <van-field v-model="resumeForm.position" name="position" label="职位" placeholder="请输入职位"></van-field>
                <van-field v-model="resumeForm.jobStartTime" name="jobStartTime" label="工作开始时间" placeholder="工作开始时间"></van-field>
                <van-field v-model="resumeForm.jobEndTime" name="jobEndTime" label="工作结束时间" placeholder="工作结束时间"></van-field>
                <van-cell-group>
                    <p class="cust-label"><span>工作内容与成果</span></p>
                    <van-field v-model="resumeForm.results" rows="4" autosize type="textarea" name="results" placeholder="工作内容与获得的成绩"></van-field>
                </van-cell-group>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="info" color="linear-gradient(to top, #283ac9, #5875dc)" native-type="submit">
                    保存
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            title: '添加教育经历',
            birthValue: '',
            datetimePicker: false,
            showPicker: false,
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2050, 10, 1),
            currentDate: new Date(),
            resumeForm: {
                //个人基本信息
                actualName: '',         //姓名
                gender: '',             //性别
                userMobile: '',         //手机号
                userEmail: '',          //邮箱
                birthYear: '',          //出生年月
                startWrokYear: '',      //参加工作年月
                livingCity: '',         //所在城市
                resumeStatus: '',       //目前工作状态
                selfEvaluation: '',     //自我评价
                //教育经历
                schoolName: '',         //学校名称
                proName: '',            //专业
                startTime: '',          //入校时间
                endTime: '',            //离校时间
                education: '',          //学历
                unified: '',            //是否统招
                eduDesc: '',            //学习情况描述
                //工作经历
                entpName: '',           //公司名称
                post: '',//职位
                startWorkTime: '',      //开始工作时间
                endWorkTime: '',        //结束工作时间
                jobDesc: '',            //职位描述
                //证书奖项
                adwardsName: '',        //证书奖项信息
                orgName: '',            //颁发证书奖项机构
                adwardTime: '',         //获得奖项时间
                adwardDesc: ''          //描述
            },
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        }
    }
}
</script>
<style lang="stylus" scoped>
.complete-resume
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
</style>