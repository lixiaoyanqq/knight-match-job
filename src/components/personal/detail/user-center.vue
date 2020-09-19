<template>
    <div class="user-center">
        <van-nav-bar title="用户中心"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="user-baseinfo">
            <van-form v-model="userForm" enctype="multipart/form-data">
                <van-cell-group class="operation-list">
                    <van-cell value="头像" label="真实头像能增加别人的关注率哦">
                        <template #right-icon>
                            <!-- <van-icon :name="userHead" class="search=icon" /> -->
                            <van-uploader 
                                v-model="userForm.userHead" 
                                :max-count="1"
                                :before-read="beforeRead"
                                :after-read="afterRead" />
                        </template>
                    </van-cell>
                    <van-cell @click="editNikeName" :value="userBaseInfo.nickName || '我的名字'" is-link>
                        <template #title>
                            <span class="custom-title">昵称</span>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-form>
        </section>
        <van-popup class="edit-nike-name" v-model="isShow" position="right">
            <div class="form-header">
                <van-row>
                    <van-col span="2">
                        <van-icon @click="onCancelEdit" size="20" :name="leftIcon" />
                    </van-col>
                    <van-col span="20">
                        <span>修改用户名</span>
                    </van-col>
                </van-row>
            </div>
            <div class="form-body">
                <van-cell-group>
                    <van-field v-model="nickName" placeholder="请输入用户名" />
                </van-cell-group>
            </div>
            <div class="login-btn">
                <van-button round @click="onSaveEdit" block type="info" color="linear-gradient(to right, #2739c8, #f51e67)">
                    保存
                </van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Toast } from 'vant'
import * as userApi from 'api/user'
import { BASE_URL } from 'api/config'
import axios from 'axios'
export default {
    data () {
        return {
            nickName: '',
            isShow: false,
            leftIcon: require("common/image/home/lefticon.png"),
            userForm:{
                userHead: []
            },
            userBaseInfo: ''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        beforeRead(file, detail){
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                Toast('请上传正确的图片格式')
                return false
            }
            return true
        },
        afterRead(file){
            this.uploadImg(file)
        },
        async uploadImg(file){
            let params = new FormData()
            params.append('file', file.file)
            let data = await userApi.uploadHeadPic(params)
            if (data.code === '200') {
                console.log('data',data)
                Toast.success('上传成功')
                this.initData()
            }
        },
        editNikeName () {
            this.isShow = true
            this.nickName = this.userBaseInfo.nickName
        },
        onCancelEdit () {
           this.isShow = false 
        },
        async onSaveEdit () {
            let params = {
                nickName: this.nickName
            }
            let data = await userApi.updateUserInfo(params)
            if (data.code === '200') {
                Toast.success('修改成功')
                this.isShow = false
                this.initData()
            }

        },
        async initData () {
            let data = await userApi.fetchUserBaseInfo()
            if (data.code === '200') {
                this.userBaseInfo = data.content
                this.userForm.userHead = []
                if (this.userBaseInfo.profilePicture) {
                    let headerpic = {
                        url: `${BASE_URL}${this.userBaseInfo.profilePicture}`
                    }
                    this.userForm.userHead.push(headerpic)
                } else {
                   let headerpic = {
                        url: require("common/image/personal/user-head.png")
                    } 
                    this.userForm.userHead.push(headerpic)
                }
                
            }
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
.user-center
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.user-baseinfo
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
.edit-nike-name
    width 100%
    height 100% 
    color #000000
    background #e6e9f5
.form-header
    height 4rem
    background #ffffff
    text-align center
    font-size 18px
    line-height 4rem
.form-header span
    margin-top 15px
.form-header .van-icon
    position relative
    top 5px
.form-body .van-field
    height auto
    background #e6e9f5
.form-body .van-hairline--top-bottom::after, 
.form-body .van-hairline-unset--top-bottom::after
    border-color #cccccc
    border-top-width 0
.login-btn
    width 50%
    margin 20px auto
</style>