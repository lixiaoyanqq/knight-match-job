<template>
    <div class="my-company">
        <van-nav-bar title="我的公司"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem">
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="company-logo">
            <div class="upload-box">
                <van-uploader
                    v-model="uploader"
                    max-count="1"
                    :before-read="beforeRead"
                    :after-read="afterRead" >
                </van-uploader>
            </div>
            <h1>{{this.compForm.entpSimpleName}}</h1>
        </section>
        <section class="company-detail">
            <van-form @submit="onCommit" v-model="compForm" ref="compForm">
                <van-cell-group>
                    <label class="form-label" for="">公司名称</label>
                    <van-field v-model="compForm.entpName" name="entpName" placeholder="请输入公司名称" />
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司简称</label>
                    <van-field v-model="compForm.entpSimpleName" name="entpSimpleName" placeholder="请输入公司简称" />
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司公司所在地</label>
                    <van-field v-model="compForm.city" name="city" placeholder="请输入公司所在地" />
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">详细地址</label>
                    <van-field v-model="compForm.address" name="address" placeholder="请输入公司详细地址" />
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司类型</label>
                    <!-- <van-dropdown-menu>
                        <van-dropdown-item v-model="compForm.entpType" name="entpType" :options="entpTypes" />
                    </van-dropdown-menu> -->
                    <van-field
                        v-model="entpType" 
                        readonly
                        clickable
                        name="entpType"
                        :value="entpType"
                        placeholder="公司类型"
                        @click="showEntpType = true"/>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司规模</label>
                    <!-- <van-dropdown-menu>
                        <van-dropdown-item v-model="compForm.personScope" name="personScope" :options="personScopes" />
                    </van-dropdown-menu> -->
                    <van-field
                        v-model="personScope" 
                        readonly
                        clickable
                        name="personScope"
                        :value="personScope"
                        placeholder="公司规模"
                        @click="showPersonScope = true"/>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司性质</label>
                    <van-field v-model="compForm.industry" name="industry" placeholder="公司性质" />
                </van-cell-group>
                <van-cell-group class="company-intro">
                    <label class="form-label" for="">公司介绍</label>
                    <van-field 
                        class="comp-text"
                        v-model="compForm.entpInfo"
                        name="entpInfo"
                        rows="3"
                        type="textarea"/>
                </van-cell-group>
                <div class="comp-btn">
                    <van-button round block type="info" color="linear-gradient(to right, #2739c8, #db5595)">
                        保存
                    </van-button>
                </div>
            </van-form>
        </section>
        <van-popup round v-model="showEntpType" position="bottom">
            <van-picker
                show-toolbar
                :columns="entpTypes"
                @confirm="onEntpType"
                @cancel="showEntpType = false"/>
        </van-popup>
        <van-popup round v-model="showPersonScope" position="bottom">
            <van-picker
                show-toolbar
                :columns="personScopes"
                @confirm="onPersonScopes"
                @cancel="showPersonScope = false"/>
        </van-popup>
    </div>
</template>
<script>
import * as compApi from 'api/company'
import * as type from 'store/company/mutations_types'
import { mapState, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'
import { Toast } from 'vant'
import { BASE_URL } from 'api/config'
export default {
    data () {
        return {
            deletable: false,
            showEntpType: false,
            showPersonScope: false,
            select: '',
            entpType: '',
            personScope: '',
            leftIcon: require("common/image/home/lefticon.png"),
            uploader: [], 
            uploadEmptLogoUrl: '',
            compForm: {
                entpName: '',
                entpSimpleName: '',
                city: '',
                address: '',
                personScope: '',
                industry: '',
                entpInfo: ''
            },
            entpTypes: ['国企','外企','民营','合资','股份制公司','创业公司','上市公司','国家机关','事业单位','其他'],
            personScopes: ['20人以下','20-99人','100-499人','500-999人','1000-9999人','10000人以上']
        }
    },
    computed: {
        ...mapState({
            compDesc (state) {
                return state.company.company
            }
        })
    },
    methods: {
        ...mapActions({
            fetchCompDesc: type.FETCH_COMP_DETAIL
        }),
        getCompDesc(){
            this.uploader.length = 0
            this.fetchCompDesc().then(res => {
            //    console.log('res111',res.content)
               this.compForm = this._.merge({}, res.content)
               if (this.compForm.id) {
                    this.entpType = this.entpTypes[Number(this.compForm.entpType) -1]
                    this.personScope = this.personScopes[Number((this.compForm.personScope).substring(1)) -1]
                    console.log('this.compForm',this.compForm)
                    if (this.compForm.entpLogo) {
                        let logUrl ={
                            url: `${BASE_URL}${this.compForm.entpLogo}`
                        }
                        this.uploader.push(logUrl)
                    } else {
                        let logUrl ={
                            url: require("common/image/personal/user-head.png")
                        }
                        this.uploader.push(logUrl)
                    }
               } else {
                //    console.log('初始化头像')
                //    let difaultPic = {
                //         // url: require("common/image/home/default-avatar.jpeg")
                //         url: require("common/image/personal/user-head.png")
                //    }
                //    this.uploader.push(difaultPic)
               }
               
            //    console.log('this.entpType',this.entpType)
            //    console.log('this.personScope',this.personScope)
            })
            console.log('this.uploader',this.uploader)
        },
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
        async afterRead(file){
            let params = new FormData()
            params.append('file', file.file)
            let data = await compApi.uploadEnptLogo(params)
            if (data.code === '200') {
                Toast.success('上传成功')
                this.uploadEmptLogoUrl = data.content.filePath
            }
        },
        onCommit(values){
            // console.log('this.compForm',this.compForm)
            // console.log('values',values)
            values.entpType = this.entpTypes.indexOf(this.entpType) + 1 + ''
            values.personScope = '0' + (this.personScopes.indexOf(this.personScope) +1)
            values.entpLogo = this.uploadEmptLogoUrl
            if(this.compForm.id){
                //编辑
                values.id = this.compForm.id
                // console.log('编辑',values)
                compApi.editCompany(values).then(res => {
                    Toast.success(res.content)
                    this.$router.back()
                })
            } else {
                //添加
                // console.log('添加',values)
                compApi.addCompany(values).then(res => {
                    Toast.success(res.content)
                    this.$router.back()
                })
            }
        },
        onEntpCancel(picker, value, index){
           Toast(`当前值：${value}, 当前索引：${index}`); 
        },
        onEntpChange(){
            Toast('取消');
        },
        onEntpType(value, index){
            this.showEntpType = false
            this.entpType = value
        },
        onPersonScopes(value, index){
           this.showPersonScope = false
            this.personScope = value
        }
    },
    mounted () {
        this.getCompDesc()
    }
}
</script>
<style lang="stylus" scoped>
.my-company
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    color #000000
    overflow-y scroll
.company-logo
    text-align center
    margin-top 4rem
    width 100%
    padding 30px 0
.company-logo h1 
    height 30px
    line-height 30px
.van-cell-group
    background none
.van-cell-group label
    padding 15px
    color #939395
.company-detail .van-field
    height auto
    background none
.comp-btn
    width 60%
    margin 10px auto
.form-label
    display inline-block
</style>