<template>
    <div class="problem-feedback">
        <van-nav-bar title="问题反馈"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="feedback-main">
            <div class="feedback">
            <van-cell-group>
            <h1>反馈内容</h1>
            <van-field
                v-model="backMessage"
                rows="5"
                autosize
                type="textarea"
                placeholder="请输入您的反馈信息" />
            </van-cell-group>
            <van-cell-group>
            <!-- <h1>您的联系方式</h1>
            <van-field v-model="backPhone" placeholder="请输入用户名" /> -->
            </van-cell-group>
            <div class="login-btn">
                <van-button :disabled="backMessage.length <= 0" round block type="info" @click="onCommit" color="linear-gradient(to right, #2739c8, #f51e67)">
                    提交反馈
                </van-button>
            </div>
        </div>
        </section>
        <div id="feedback-content" class="feedback-list">
            <div class="meaasge-list" v-for="item in feedbacks" :key="item.id">
                <div class="user-feedback">
                    <van-row>
                    <van-col span="4">
                        <van-image class="user-avatar" round width="2rem" height="2rem" :src="renPic"/>
                    </van-col>
                    <van-col span="16">
                        <p>{{item.userName || '游客留言'}}</p>
                        <p>{{item.createTime}}</p>
                        <p>{{item.comment}}</p>
                    </van-col>
                    </van-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as userApi from 'api/user'
import { getLocalStore } from 'utils/global'
import { Toast } from 'vant'
export default {
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            userInfo: JSON.parse(getLocalStore('baseInfo')) || { userStatus : '1'},
            backMessage: '',
            userName: '',
            feedbacks: [],
            renPic: require('common/image/home/ren.png'),
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        onCommit(){
            let problem = {
                userName: this.userInfo.nickName,
                comment: this.backMessage,
                resId: '1',
                resType: 3
            }
             userApi.leaveMessage(problem).then(res => {
                if(res.code === '200')
                    Toast.success('操作成功')
                    this.feedbackList()
                    this.backMessage = ''
                })
        },
        async feedbackList() {
            let reqData = {
                resType: '3',
                pageNum: '1',
                pageSize: '100'
            }
            let data = await userApi.leaveMessageList(reqData)
            console.log('data',data)
            if (data.code === '200') {
                this.feedbacks = data.content.listx
            }
        }
    },
    mounted () {
        this.feedbackList()
    }
}
</script>
<style lang="stylus" scoped>
.problem-feedback
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.feedback-main
    margin-top 4rem
.feedback .van-field
  height auto
.login-btn
    width 50%
    margin 20px auto
.feedback-list
    color black
    max-height 300px
    overflow-y scroll
.meaasge-list
  margin-top 15px
.user-feedback p, .feedback-reply p
  padding 5px 0
  font-size 12px
.user-feedback p span ,.feedback-reply p span
  font-size 14px
  position relative
  top -3px
.user-avatar
  position relative
  left 20px
  top 5px
</style>