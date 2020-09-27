<template>
    <div class="guide-page">
        <div class="guide-logo-box">
            <div class="logo-box1">
                <van-image class="circle1Icon" width="200px" height="200px" :src="circle1Icon"/>
                <van-image class="logoIcon" width="48px" height="48px" :src="logoIcon"/>
            </div>
        </div>
        <div class="guide-tit">
            <h1>选择一个领域</h1>
            <h2>我们为您匹配整个宇宙ヽ(´o｀；</h2>
        </div>
        <div class="guide-form">
            <van-form @submit="onSubmit" v-model="guideForm">
                <van-cell-group v-if="userInfo.userType === '0'">
                    <van-field
                        v-model="expectTerritorys"
                        readonly
                        clickable
                        name="expectTerritorys"
                        :value="expectTerritorys"
                        :right-icon="rightIcon"
                        placeholder="选择期望行业"
                        @click="onPicker('expectTerritorys')"/>
                    <van-field :right-icon="rightIcon" v-model="guideForm.expectPosts" name="expectPosts" placeholder="期望职位" />
                </van-cell-group>
                <van-cell-group v-if="userInfo.userType === '1'">
                    <van-field :right-icon="rightIcon" v-model="guideForm.entpName" name="entpName" placeholder="公司名称" />
                    <van-field
                        v-model="industry"
                        readonly
                        clickable
                        name="industry"
                        :value="industry"
                        :right-icon="rightIcon"
                        placeholder="选择所属行业"
                        @click="onPicker('industry')"/>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="info" color="linear-gradient(to right, #2739c8, #f51e67)" native-type="submit">
                        保存
                    </van-button>
                </div>
            </van-form>
        </div>
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>
<script>
import { getLocalStore } from "utils/global"
import * as resumeApi from "api/resume"
import * as compApi from 'api/company'
import { Toast } from 'vant'
export default {
    data () {
        return {
            showPicker: false,
            logoIcon: require('common/image/guide/guide-logo.png'),
            circle1Icon: require('common/image/guide/circle-1.png'),
            rightIcon: require("common/image/personal/right-r.png"),
            userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
            expectTerritorys: '',
            pickerName: '',
            industry: '',
            guideForm: {
                expectTerritorys: '',
                expectPosts: '',
                entpName: '',
                industry: ''
            },
            columns: ['互联网/IT/电子/通讯','房地产','金融业','建筑业','制造业','农林牧渔','批发/零售/贸易','专业服务','文化/体育/娱乐','交通运输/仓储/物流','能源/环保/矿产','教育培训/科研','卫生及社会工作','公共管理/社会保障','生活服务'],
            territories: [],
            industries: []
        }
    },
    methods: {
        async onSubmit(val) {
            if(this.userInfo.userType === '0') {
                if(val.expectTerritorys === '') {
                    Toast.fail('请选择期望行业')
                } else if (val.expectPosts === '') {
                    Toast.fail('请选择期望职位')
                } else {
                    let data = await resumeApi.talentGuide(val)
                    if(data.code === '200'){
                        this.$router.push({ path: '/' })
                    }
                }
            }

            if (this.userInfo.userType === '1') {
                if (val.entpName === '') {
                    Toast.fail('先给公司起一个响亮的名字吧')
                } else if (val.industry === '') {
                    Toast.fail('选择一下公司所属的领域吧')
                } else {
                    let data = await compApi.addCompany(val)
                    if(data.code === '200'){
                        this.$router.push({ path: '/' })
                    }
                }
                
            }
        },
        onPicker(name) {
            this.showPicker = true
            this.pickerName = name
        },
        onConfirm (val) {
            this[this.pickerName] = val
            this.showPicker = false
        }
    }
}
</script>
<style lang="stylus" scoped>
.guide-page
    position fixed 
    left 0
    top 0
    right 0
    bottom 0
    background url("../../common/image/guide/guide-bg.jpg")
    z-index 999
    overflow-y scroll
.guide-logo-box
    width 100%
    height 260px
.logo-box1
    width 200px
    height 200px
    position relative
    left 50%
    margin-left -100px
    top 50px
.circle1Icon
    position absolute
    animation: turnAround 3s infinite linear
.logoIcon
    position absolute
    left 50%
    margin-left -24px
    top 50%
    margin-top -24px
.guide-tit
    width 100%
    text-align center
.guide-tit h1 ,.guide-tit h2
    line-height 34px
    font-size 24px
.guide-form
    width 80%
    margin 30px auto
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border none
.van-cell-group
    background none
.van-cell
    background none
    border-bottom 1px solid #b5b5b5
.van-cell::after
    border none
.van-field
    height 58px
@keyframes turnAround
    from 
        transform: rotate(0deg);
        opacity: 1
    50%
        transform: rotate(-180deg);
        opacity: 1
    to
        transform: rotate(-360deg);
        opacity: 1
</style>