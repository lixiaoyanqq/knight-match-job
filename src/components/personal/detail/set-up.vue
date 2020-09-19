<template>
    <div class="set-up">
        <van-nav-bar title="设置"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <div class="set-item">
            <van-cell-group>
                <van-cell @click="onEditPassword" title="修改密码" is-link />
            </van-cell-group>
        </div>
        <div class="logout">
            <van-button @click="doLogout" type="default">退出登录</van-button>
        </div>
        <van-popup class="edit-nike-name" v-model="isShow" position="right">
            <div class="form-header">
                <van-row>
                    <van-col span="2">
                        <van-icon @click="onCancelPassword" size="24" name="close" />
                    </van-col>
                    <van-col span="20">
                        <span>修改密码</span>
                    </van-col>
                    <van-col span="2">
                        <van-icon @click="onSavePassword" size="24" name="passed" />
                    </van-col>
                </van-row>
            </div>
            <div class="form-body">
                <van-cell-group>
                    <van-field disabled v-model="userBaseInfo.mobile" label="手机号" placeholder="请输入用户名" />
                    <van-field v-model="password" label="原始密码" placeholder="原始密码" />
                    <van-field v-model="newPassword" label="新密码" placeholder="新密码" />
                </van-cell-group>
            </div>
        </van-popup>
    </div>
</template>
<script>
import * as type from 'store/user/mutations_types'
import * as userApi from 'api/user'
import { mapActions } from 'vuex'
import { Dialog, Toast } from 'vant'
export default {
    data () {
        return {
            userBaseInfo: '',
            isShow: false,
            mobile: '',
            password: '',
            newPassword: ''
        }
    },
    methods: {
        ...mapActions({
            logout: type.LOGOUT
        }),
        onClickLeft(){
            this.$router.back()
        },
        onEditPassword () {
            this.isShow = true
        },
        onCancelPassword () {
            this.isShow = false
        },
        async onSavePassword () {
            let params = {
                mobile: this.userBaseInfo.mobile,
                password: this.password,
                newPassword: this.newPassword
            }
            let data = await userApi.updataPassword(params)
            if( data.code === '200') {
                Toast.success(data.content)
                this.isShow = false
            }
            // console.log('改密码', data)
        },
        doLogout(){
            Dialog.confirm({
                title: '退出提示',
                message: '确定要退出登录？',
                beforeClose: this.beforeClose
            })
        },
        beforeClose(action, done){
            if(action === 'confirm'){
                this.logout()
                this.$router.push({ name: 'login'})
                done()
            } else {
                done()
            }
        },
        async initData () {
            let data = await userApi.fetchUserBaseInfo()
            if (data.code === '200') {
                this.userBaseInfo = data.content
            }
        }
     },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
.set-up
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.set-item
    margin-top 2.5rem
.set-item .van-cell
    padding 0 16px
    line-height 80px
    height 80px
    background #f5f5f5
    border-bottom 1px solid #dcdcdc
.set-item .van-cell .van-cell__right-icon 
    font-size 26px
    line-height 80px
.set-item .van-cell .van-cell__title
    font-size 18px
    color $color-text-b
.logout
    width 80%
    margin 20px auto
.van-button
    width 100%
    background #eeeeee
    border-radius 10px
.van-dialog__header
    color #000000
.edit-nike-name
    width 100%
    height 100% 
    color #000000
    background #e6e9f5
.form-header
    height 2.5rem
    background #ffffff
    text-align center
    font-size 18px
    line-height 2.5rem
.form-header span
    margin-top 15px
.form-header .van-icon
    margin-top 8px
.form-body .van-field
    height auto
    background #e6e9f5
.form-body .van-hairline--top-bottom::after, 
.form-body .van-hairline-unset--top-bottom::after
    border-color #cccccc
    border-top-width 0
.form-body .van-cell::after
    border-bottom-color black
</style>