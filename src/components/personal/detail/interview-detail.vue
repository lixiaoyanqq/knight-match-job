<template>
    <div class="interview-detail">
        <van-nav-bar title="面试详情"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:4rem" >
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="interview-info">
            <van-cell-group class="operation-list">
                <van-cell :value="interviewDetail.iviewContacts">
                    <template #title>
                        <span class="custom-title">邀请人</span>
                    </template>
                </van-cell>
                <van-cell :value="interviewDetail.talUserName">
                    <template #title>
                        <span class="custom-title">被邀请人</span>
                    </template>
                </van-cell>
                <van-cell :value="interviewDetail.iviewPlace">
                    <template #title>
                        <span class="custom-title">面试地址</span>
                    </template>
                </van-cell>
                <van-cell :value="interviewDetail.iviewPhone">
                    <template #title>
                        <span class="custom-title">邀请人联系方式</span>
                    </template>
                </van-cell>
                <van-cell :value="interviewDetail.postName">
                    <template #title>
                        <span class="custom-title">面试职位</span>
                    </template>
                </van-cell>
                <van-cell :value="interviewDetail.iviewTime">
                    <template #title>
                        <span class="custom-title">面试时间</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <div class="operation-list">
                <van-row>
                    <van-col span="2"></van-col>
                    <van-col span="9">
                        <van-button v-if="userInfo.userType === '0'" :disabled="interviewDetail.interviewStatus === '1' || interviewDetail.interviewStatus === '2'" round block type="info" @click="onRefuseInterview" color="linear-gradient(to right, #2739c8, #f51e67)">
                            <span v-if="interviewDetail.interviewStatus === '0' || interviewDetail.interviewStatus === '1'">拒绝邀请</span>
                            <span v-if="interviewDetail.interviewStatus === '2'">已拒绝邀请</span>
                        </van-button>
                    </van-col>
                    <van-col span="2"></van-col>
                    <van-col span="9">
                        <van-button v-if="userInfo.userType === '0'" :disabled="interviewDetail.interviewStatus === '1' || interviewDetail.interviewStatus === '2'" round block type="info" @click="onAcceptInterview" color="linear-gradient(to right, #2739c8, #f51e67)">
                            <span v-if="interviewDetail.interviewStatus === '0' || interviewDetail.interviewStatus === '2'">接受邀请</span>
                            <span v-if="interviewDetail.interviewStatus === '1'">已接受邀请</span>
                        </van-button>
                        <van-button v-if="userInfo.userType === '1'" disabled round block type="info" @click="onAcceptInterview" color="linear-gradient(to right, #2739c8, #f51e67)">
                            <span v-if="interviewDetail.interviewStatus === '0'">待处理</span>
                            <span v-if="interviewDetail.interviewStatus === '1'">已接受邀请</span>
                            <span v-if="interviewDetail.interviewStatus === '2'">已拒绝邀请</span>
                        </van-button>
                    </van-col>
                    <van-col span="2"></van-col>
                </van-row>
            </div>
        </section>
    </div>
</template>
<script>
import { getLocalStore } from "utils/global"
import * as userApi from "api/user"
import { Toast } from 'vant'
export default {
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
            recruitId: this.$route.query.recruitId || null,
            interviewDetail: ''
        }
    },
    computed: {

    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        async onAcceptInterview () {
            let data = await userApi.acceptInterview(this.interviewDetail.id)
            if (data.code === '200') {
                Toast.success('操作成功')
                this.initData()
            }
        },
        async onRefuseInterview () {
            let data = await userApi.refuseInterview(this.interviewDetail.id)
            if (data.code === '200') {
                Toast.success('操作成功')
                this.initData()
            }
        },
        async initData() {
            let recruitId = this.recruitId.toString()
            let data = await userApi.getInterViewDetail(recruitId)
            if (data.code === '200') {
                this.interviewDetail = data.content
            }
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
.interview-detail
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.interview-info
    margin-top 4rem
.operation-list .van-cell {
    padding 0 16px
    line-height 80px
    height 80px
    background #f5f5f5
    border-bottom 2px solid #dcdcdc
}
.operation-list .van-cell .van-cell__right-icon 
    font-size 40px
    line-height 80px
.operation-list .van-cell .van-cell__title {
  color $color-text-b
}
.operation-list
    margin-top 20px
</style>