<template>
    <div class="problem-feedback">
        <van-nav-bar title="问题反馈"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
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
                <van-button round block type="info" @click="onCommit" color="linear-gradient(to right, #2739c8, #f51e67)">
                    提交反馈
                </van-button>
            </div>
        </div>
        </section>
    </div>
</template>
<script>
import * as userApi from 'api/user'
import { getLocalStore } from 'utils/global'
import { Toast } from 'vant'
export default {
    data () {
        return {
            userInfo: JSON.parse(getLocalStore('baseInfo')) || { userStatus : '1'},
            backMessage: '',
            userName: ''
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
                })
                this.$router.back()
        }
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
    margin-top 3rem
.feedback .van-field
  height auto
</style>