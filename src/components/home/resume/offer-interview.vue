<template>
    <div class="offer-interview">
        <van-nav-bar title="邀请面试"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <van-form @submit="onSubmit" v-model="invitForm" ref="invitForm" label-width="100">
            <van-cell-group class="base-info-group">
                <label>邀请人</label>
                <van-field 
                    required
                    v-model="invitForm.iviewContacts" 
                    name="iviewContacts" 
                    label="邀请人"
                    placeholder="请输入邀请人"
                    :rules="[{ required: true, message: '请填写邀请人' }]" />
            </van-cell-group>
            <van-cell-group class="base-info-group">
                <van-field 
                    required
                    v-model="invitForm.iviewPhone" 
                    name="iviewPhone" 
                    label="手机号"
                    type="number"
                    placeholder="请输入邀请人手机号"
                    :rules="phone_rule" />
            </van-cell-group>
            <van-cell-group class="base-info-group">
                <van-field 
                    required
                    v-model="invitForm.iviewPlace" 
                    name="iviewPlace" 
                    label="面试地址"
                    placeholder="请输入面试地址" 
                    :rules="[{ required: true, message: '请填写面试地址' }]"/>
            </van-cell-group>
            <van-cell-group class="base-info-group">
                <van-field
                    required
                    v-model="iviewTime"
                    readonly
                    clickable
                    name="iviewTime"
                    :value="iviewTime"
                    label="选择面试时间"
                    placeholder="点击选择时间"
                    :rules="[{ required: true, message: '请选择面试时间' }]"
                    @click="showPicker = true"/>
            </van-cell-group>
            <van-cell-group class="base-info-group">
                <van-field
                    required
                    v-model="invitePost"
                    readonly
                    clickable
                    label="面试职位"
                    name="invitePost"
                    :value="invitePost"
                    placeholder="选择面试职位"
                    @click="showPost = true"
                    :rules="[{ required: true, message: '请选择招聘职位' }]"/>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="info" color="linear-gradient(to right, #2739c8, #f51e67)" native-type="submit">
                    发送邀请
                </van-button>
            </div>
            <van-popup round v-model="showPicker" position="bottom">
                <van-datetime-picker
                type="datetime"
                v-model="currentDate"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmTime"
                @cancel="showPicker = false"
                :formatter="formatter"/>
            </van-popup>
            <van-popup v-model="showPost" round position="bottom">
            <van-picker
                show-toolbar
                :columns="postLists"
                @cancel="onCancelPost"
                @confirm="onConfirmPost"/>
        </van-popup>
        </van-form>
    </div>
</template>
<script>
import * as postApi from 'api/position'
import * as homeaApi from 'api/home'
import { Toast } from 'vant'
export default {
    inject: ['reload'],
    data () {
        return {
            id: this.$route.query.id,
            recruitId: this.$route.query.recruitId,
            iviewTime: '',
            invitePost: '',
            invitePostId: '',
            showPicker: false,
            showPost: false,
            currentDate: new Date(),
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2050, 10, 1),
            phone_rule: [{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }],
            email_rule: [{ pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/, message: '输入正确的邮箱号'}],
            postLists: [],
            invitForm: {
                talUserId: '',
                postId: '',
                iviewTime: '',
                iviewPlace: '',
                iviewContacts: '',
                iviewPhone: ''
            }
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        async onSubmit(){
            // this.invitForm.talUserId = this.id
            if (this.recruitId) {
                this.invitForm.recruitId = this.recruitId
            } else {
                this.invitForm.postId = this.invitePostId.toString()
            }
            this.invitForm.iviewTime = this.iviewTime
            console.log('form', this.invitForm)
            let data = await this.recruitId ? postApi.offerInterView(this.invitForm) : postApi.sentInterView(this.invitForm)
            if (data.code === '200') {
                Toast.success('发送成功')
                this.$router.back()
                this.resetForm()
            } else {
                Toast.fail('邀请失败，请重新操作')
                this.resetForm()
            }
            // console.log('data',data)
            
        },
        // 显示弹窗
        showPopup () {
            this.show = true
            this.isLoadingShow = true
            setTimeout(() => {
                this.isLoadingShow = false
            }, 500)
        },
        onCancelPost () {
            this.showPost = false
        },
        onConfirmPost (value) {
            console.log(value)
            this.invitePost = value.text
            if (this.recruitId) {
                
            } else {
                this.invitePostId = value.id
            }
            
            console.log('this.invitePostId',this.invitePostId)
            this.showPost = false
            
        },
        onConfirmTime (val) {
            let year = val.getFullYear()
            let month = val.getMonth() + 1
            let day = val.getDate()
            let hour = val.getHours()
            let minute = val.getMinutes()
            if (month >= 1 && month <= 9) { month = `0${month}` }
            if (day >= 1 && day <= 9) { day = `0${day}` }
            if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
            if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
            this.iviewTime = `${year}-${month}-${day} ${hour}:${minute}`
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
        },
        initData () {
            this.getPostList()
        },
        async getPostList() {
            let data = await homeaApi.postList()
            if (data.code === '200') {
                this.postLists = data.content.listx.map( item => {
                    return {...item, text: item.postName}
                })
            }
        },
        resetForm () {
            this.$refs.invitForm.resetValidation()
            this.invitForm = {
                talUserId: '',
                postId: '',
                iviewTime: '',
                iviewPlace: '',
                iviewContacts: '',
                iviewPhone: ''
            },
            this.talUserId = ''
            this.invitePostId = ''
            this.iviewTime = ''
            this.invitePost = ''
        }
    },
    mounted () {
        this.initData()
    },
    watch: {
        $route (to) {
            this.reload()
        }
    }
}
</script>
<style lang="stylus" scoped>
.offer-interview
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