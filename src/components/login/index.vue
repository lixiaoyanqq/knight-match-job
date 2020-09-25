<template>
    <div class="login-conrainer">
        <section class="login-top">
            <!-- <h1>AI Precision recruitment</h1>
            <p>AI 精 准 招 聘</p>
            <h2>
                <van-icon size="30" :name="icon" />
            </h2> -->
            <van-image :src="logo" />
        </section>
        <van-tabs class="login-tabs" @click="onTabs" v-model="active" animated>
            <van-tab title="登录">
                <section class="login-form-main">
                    <van-form @failed="onLoginFailed" @submit="onLoginSubmit" v-model="loginForm" :rules="loginRules" ref="loginForm" validate-trigger="onChange">
                        <van-cell-group>
                            <van-field 
                                required
                                clearable
                                v-model="loginForm.mobile" 
                                name="mobile"
                                type="number"
                                placeholder="手机号"
                                :rules="mobile_Rule">
                            </van-field>
                            <van-field 
                                required
                                clearable
                                v-model="loginForm.password" 
                                name="password" 
                                type="password"
                                autocomplete=“off”
                                placeholder="密码"
                                :rules="password_Rule">
                            </van-field>
                        </van-cell-group>
                        <van-row type="flex" justify="end">
                            <van-col span="8">
                                <span @click="onForgetPassword" class="forgot-password">忘记密码？</span>
                            </van-col>
                        </van-row>
                            
                        <div class="login-btn">
                            <van-button round block :loading="loading" loading-text="登录中..." type="info" color="linear-gradient(to right, #2739c8, #f51e67)">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </section>
            </van-tab>
            <van-tab :title="isForget ? '找回密码' : '注册'">
                <section class="login-form-main">
                    <!-- @failed="onRegisterFailed" @submit="onRegisterSubmit" -->
                    <van-form  v-model="registerForm" :rules="registerRules" ref="registerForm" validate-trigger="onChange">
                        <van-cell-group>
                            <van-field 
                                v-if="isForget || isRegister"
                                required
                                clearable
                                v-model="registerForm.mobile" 
                                name="mobile" 
                                placeholder="手机号"
                                type="number"
                                :rules="mobileRule"
                                @blur="onBlue">
                            </van-field>
                            <van-field
                                v-show="isForget" 
                                required
                                clearable
                                v-model="registerForm.newPassword" 
                                name="newPassword" 
                                placeholder="新密码"
                                type="password"
                                :rules="newPasswordRule">
                            </van-field>
                            <van-field 
                                v-show="isRegister"
                                required
                                clearable
                                v-model="registerForm.password" 
                                name="password" 
                                placeholder="密码"
                                type="password"
                                :rules="passwordRule">
                            </van-field>
                            <van-field
                                v-show="isForget || isRegister"
                                required
                                class="valid-code"
                                v-model="registerForm.validCode"
                                center
                                clearable
                                name="validCode"
                                placeholder="请输入验证码"
                                :rules="validCodeRule">
                                <template #button>
                                    <img ref="imgCaptcha" @click.prevent="onValidPic" :src="validCodeUrl" />
                                </template>
                            </van-field>
                            <van-field
                                class="userCode"
                                v-show="isForget || isRegister"
                                required
                                rule="userCode"
                                v-model="registerForm.userCode"
                                name="userCode"
                                placeholder="请输入短信验证码"
                                :rules="userCodeRule">
                                <template #button>
                                    <van-button size="mini" v-if="!countDown" @click="sentMessage" type="primary">发送验证码</van-button>
                                    <van-button size="mini" v-else disabled type="primary">已发送{{countDown}}s</van-button>
                                </template>
                            </van-field>
                            <van-field v-show="isRegister" required class="userType" rule="userType" name="userType">
                                <template #input>
                                    <van-radio-group v-model="registerForm.userType" direction="horizontal">
                                    <van-radio name="0">个人</van-radio>
                                    <van-radio name="1">企业</van-radio>
                                    </van-radio-group>
                                </template>
                            </van-field>
                        </van-cell-group>
                        <div class="login-btn">
                            <van-button round block :loading="loading" @click="onRegisterSubmit" type="info" color="linear-gradient(to right, #2739c8, #f51e67)">
                                {{isForget ? '找回密码' : '注册'}}
                            </van-button>
                        </div>
                    </van-form>
                    
                </section>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Toast, Dialog } from 'vant'
import { mapActions } from 'vuex'
import * as type from 'store/user/mutations_types'
import * as userApi from 'api/user'
import { BASE_URL } from 'api/config'
export default {
    data () {
        return {
            countDown: 0, 
            active: 0,
            isForget: false,
            isRegister: false,
            loading: false,
            logo: require('common/image/login/login-logo.png'),
            validCodeUrl: `${BASE_URL}/amj/user/getVerify?mobile=`,
            
            loginForm: {
                mobile: '',
                password: ''
            },
            loginRules:{},
            registerRules: {},
            mobile_Rule:[
                { required: true, message: '手机号是必填项'},
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }
            ],
            password_Rule:[
                { required: true, message: '请设置密码'}
            ],
            mobileRule:[
                { required: true, message: '手机号是必填项'},
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }
            ],
            passwordRule:[
                { required: true, message: '请设置密码'}
            ],
            newPasswordRule:[
                { required: true, message: '请设置密码'}
            ],
            userCodeRule:[
                { required: true, message: '请输入短信验证码'}
            ],
            validCodeRule:[
                { required: true, message: '请输入验证码'}
            ],
            userTypeRule:[
                { required: true, message: '请选择注册类型'}
            ],
            registerForm: {

                mobile: '',
                password: '',
                newPassword: '',
                userCode: '',
                userType: '0',
                validCode: '',
                codeType: 0
            }
            
        }
    },
    methods: {
        ...mapActions({
            login: type.LOGIN,
            register: type.REGISTER
        }),
        onLoginFailed(errorInfo){
            console.log('校验失败哎',errorInfo)
        },
        async onLoginSubmit(values){
            try {
                let data = await this.login(values)
                this.$router.push({ path: '/' })
            } catch (error) {
                Toast({
                    message: '用户名密码错误，或者未注册',
                    duration: 1000
                });
            }
            
            
        },
        onRegisterFailed(errorInfo){
            console.log('注册校验失败哎',errorInfo)
        },
        async onRegisterSubmit(){
            this.$refs.registerForm.resetValidation()
            if (this.isForget) {
                console.log('忘记密码')
                let data = await userApi.forgetPassword(this.registerForm)
                console.log('data',data)
                if (data.code === '200') {
                    Toast.success('重置密码成功，请直接登录')
                    this.active = 0
                    this.isForget = false
                    this.isRegister = false
                    this.loginForm.mobile = this.registerForm.mobile
                    this.loginForm.password = this.registerForm.newPassword
                    this.$refs.registerForm.resetValidation()
                    this.resetForm()
                } else if (data.code === '0005') {
                    Toast.fail('验证码过期或无效验证码')
                }
            }
            
            if (this.isRegister) {
                let data = await this.register(this.registerForm)
                console.log('data',data)
                if (data && data.code === '200') {
                    Toast.success('注册成功，请直接登录')
                    this.$refs.registerForm.resetValidation()
                    this.resetForm()
                    this.active = 0
                } else if (data && data.code ==='0002') {
                    Toast('该账号已注册，请直接登录')
                    this.$refs.registerForm.resetValidation()
                    this.resetForm()
                    this.active = 0
                } else if (data && data.code === '0005') {
                    Toast('验证码过期或无效验证码')
                    this.active = 1
                    this.isRegister = true
                    this.$refs.registerForm.resetValidation()
                    // this.resetForm()
                }
                // try {
                    // let data = await this.register(this.registerForm)
                    // console.log('data',data)
                    // if(data.code === '200') {
                    //     Toast.success('注册成功，请直接登录')
                    //     this.active = 0
                    //     this.loginForm.mobile = this.registerForm.mobile
                    //     this.loginForm.password = this.registerForm.password
                    //     this.$refs.registerForm.resetValidation()
                    // } else if (data.code === '0002') {
                    //     Toast('该账号已注册，请直接登录')
                    //     this.active = 0
                    //     this.$refs.registerForm.resetValidation()
                    //     this.resetForm()
                    // } else {
                    //     Toast.fail('注册失败，请重新注册')
                    //     this.$refs.registerForm.resetValidation()
                    //     this.resetForm()
                    // }
                
                // } catch (error) {
                    // console.log('error',error)
                    // Toast({
                    //     message: '注册失败，或该手机号已经注册，请直接登录',
                    //     duration: 3000
                    // })
                    // this.active = 0
                    // this.$refs.registerForm.resetValidation()
                    // this.resetForm()
                // }
            }
        },
        onBlue(){
            this.validCodeUrl = `${BASE_URL}/amj/user/getVerify?mobile=${this.registerForm.mobile}`
        },
        onValidPic(){
            let captchaEle = this.$refs.imgCaptcha;
            // console.log('this.validCodeUrl',this.validCodeUrl)
            this.$set(captchaEle, 'src', `${this.validCodeUrl}&time=` + new Date());
        },
        async sentMessage(){
            const obj = {
                mobile: this.registerForm.mobile,
                validCode: this.registerForm.validCode,
                codeType: this.getCode()
            }
            let data = await userApi.sentMsg(obj)
            if (data.code === '200') {
                Toast.success('验证码发送成功')
                this.countDown = 60;
                this.timeIntervalID = setInterval(() => {
                    this.countDown--;
                    // 4.1 如果减到0 则清除定时器
                    if (this.countDown == 0) {
                    clearInterval(this.timeIntervalID);
                    }
                }, 1000)
            } else if (data.code === '0006') {
                Toast.fail('图形验证码错误')
            }
            
        },
        getCode () {
            return this.isForget ? '1' : '0'
        },
        onTabs () {
            if (this.active === 0) {
                this.$refs.registerForm.resetValidation()
                this.resetForm()
            } else if (this.active === 1 && this.isForget === false) {
                this.isRegister = true
                this.registerForm.mobile = this.loginForm.mobile
            }
        },
        onForgetPassword () {
            this.isForget = true
            this.active = 1
            this.registerForm.mobile = this.loginForm.mobile
        },
        resetForm () {
            this.isForget = false
            this.isRegister = false
            this.registerForm = {
                mobile: '',
                password: '',
                newPassword: '',
                userCode: '',
                userType: '0',
                validCode: '',
                codeType: 0
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.login-conrainer  
    color $color-text
    // width 100%
    // height 100%
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background $color-text
    overflow-y scroll
.login-form-main 
    width 65%
    margin 50px auto
.login-form-main  .van-field
    background none
    border 1px solid #bfbfbf
    padding 2px 16px
    margin-top 20px
    border-radius 30px
    background #e5e8f7
.login-btn 
    margin 20px 0
.van-radio-group
    // padding 9px
.van-field__control
    padding-left 14px
.van-field--error .van-field__body
    margin-top 35px
    height 28px
.forgot-password
    color red
    padding-top 28px
    display inline-block
    font-size 12px
    z-index 9
</style>