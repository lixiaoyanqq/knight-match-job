<template>
    <div class="open-position">
        <van-nav-bar :title="this.id ? '编辑职位' : '发布职位'"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:2.5rem" />
        <section class="open-form">
            <van-form @submit="onOpen" v-model="openForm" ref="openForm">
                <van-cell-group>
                    <label>职位名称</label>
                    <van-field v-model="openForm.postName" name="postName" placeholder="职位名称" />
                </van-cell-group>
                <van-cell-group>
                    <label>职位性质</label>
                    <van-field
                        v-model="postWorktype"
                        readonly
                        clickable
                        name="postWorktype"
                        :value="postWorktype"
                        placeholder="职位性质"
                        @click="onShowPicker('postWorktype')"/>
                </van-cell-group>
                <van-cell-group>
                    <label>经验要求</label>
                    <van-field
                        v-model="reqJobExp"
                        readonly
                        clickable
                        name="reqJobExp"
                        :value="reqJobExp"
                        placeholder="经验要求"
                        @click="onShowPicker('reqJobExp')"/>
                </van-cell-group>
                <van-cell-group>
                    <label>学历要求</label>
                    <van-field
                        v-model="reqAcademic"
                        readonly
                        clickable
                        name="reqAcademic"
                        :value="reqAcademic"
                        placeholder="学历要求"
                        @click="onShowPicker('reqAcademic')"/>
                </van-cell-group>
                <van-cell-group>
                    <label>职位薪水</label>
                    <van-field
                        v-model="postSalary"
                        readonly
                        clickable
                        name="postSalary"
                        :value="postSalary"
                        placeholder="职位薪水"
                        @click="onShowPicker('postSalary')"/>
                </van-cell-group>
                <van-cell-group class="open-text">
                    <label>职位描述</label>
                    <van-field
                        v-model="openForm.postRequirements"
                        name="postRequirements"
                        rows="3"
                        autosize
                        type="textarea"
                        placeholder="职位描述"
                        show-word-limit/>
                </van-cell-group>
                <van-cell-group>
                    <label>位置</label>
                    <van-field v-model="openForm.postCity" name="postCity" placeholder="位置" />
                </van-cell-group>
                <van-cell-group>
                    <!-- <label for="">招聘人数</label> -->
                    <van-field name="recruitNum" label="招聘人数">
                        <template #input>
                            <van-stepper v-model="openForm.recruitNum" />
                        </template>
                    </van-field>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label">职位亮点</label>
                    <van-field v-model="openForm.postAllure" name="postAllure" placeholder="职位亮点" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="info" color="linear-gradient(to right, #2739c8, #f51e67)" native-type="submit">
                        保存
                    </van-button>
                </div>
            </van-form>
        </section>
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>
<script>
import * as homeApi from 'api/home'
import * as homeUtils from 'components/home/services/home'
import _ from 'lodash'
import { Notify, Toast } from 'vant'
export default {
    data () {
        return {
            showPicker: false,
            openForm: this._.merge({}, homeUtils.BASE_OPEN_FORM),
            id: this.$route.query.id || null,
            pickerName: '',
            postWorktype: '',
            reqJobExp: '',
            reqAcademic: '',
            postSalary: '',
            columns: [],
            postWorktypes: ['全职', '兼职', '实习'],
            reqJobExps: ['应届生', '1-3年', '3-5年', '5-10年', '10-15年', '15-20年', '20年以上'],
            reqAcademics: ['博士','硕士','本科','大专'],
            postSalares: ['2k-5k','6k-10k','11k-15k', '16k-20k','21k-30k','30k-40k','50k-70k']
        }
    },
    methods: {
        onClickLeft () {
            this.$router.back()
        },
        onShowPicker (name) {
            this.showPicker = true
            this.pickerName = name
            switch (this.pickerName) {
                case 'postWorktype':
                    this.columns = this.postWorktypes
                    break;
                case 'reqJobExp':
                    this.columns = this.reqJobExps
                    break;
                case 'reqAcademic':
                    this.columns = this.reqAcademics
                    break;
                case 'postSalary':
                    this.columns = this.postSalares
                    break;
            }
        },
        onConfirm(value){
            // console.log('value',value)
            // console.log('this[this.pickerName]',thisthis.pickerName)
            this[this.pickerName] = value
            this.showPicker = false;
            this.columns = []
        },
        onCancel () {
            this.showPicker = false
            this.columns = []
        },
        onOpen (value) {
            if(this.id){
                //编辑保存
                console.log('编辑保存',value)
                value.id = this.id
                homeApi.editPost(value).then(res => {
                    if(res.msg === 'OK'){
                        Toast.success('操作成功')
                        this.$router.back()
                    } else{
                        Toast.fail('操作失败')
                    } 
                })
            } else {
                //发布保存
                console.log('发布保存',value)
                homeApi.addPost(value).then(res => {
                    if(res.msg === 'OK'){
                        Toast.success('操作成功')
                        this.$router.back()
                    } else{
                        Toast.fail('操作失败')
                    } 
                })
            }
        },
        async init () {
            if(this.id){
                //编辑操作
                console.log('编辑初始化')
                let data = await homeApi.onePost(this.id)
                this.openForm = this._.merge({}, data.content)
                this.postWorktype = data.content.postWorktype
                this.reqJobExp = data.content.reqJobExp
                this.reqAcademic = data.content.reqAcademic
                this.postSalary = data.content.postSalary
            } else {
                //发布操作
                console.log('发布初始化')
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="stylus" scoped>
.open-position
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
    padding-bottom 20px
.open-form
    margin-top 4rem
.van-cell-group
    background none
.van-cell-group label
    display inline-block
    padding 15px 0 5px 15px
    color #939395
.open-form .van-field
    height auto
    background none
</style>