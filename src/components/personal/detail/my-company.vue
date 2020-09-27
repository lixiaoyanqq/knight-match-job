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
                    <label class="form-label" for="">公司所在地</label>
                    <van-field
                        v-model="city"
                        readonly
                        clickable
                        name="city"
                        :value="city"
                        placeholder="公司所在地"
                        @click="onCityPicker('city')"/>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">详细地址</label>
                    <van-field v-model="compForm.address" name="address" placeholder="请输入公司详细地址" />
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司类型</label>
                    <van-field
                        v-model="entpType" 
                        readonly
                        clickable
                        name="entpType"
                        :value="entpType"
                        placeholder="公司类型"
                        @click="onShowPicker('entpType')"/>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">公司规模</label>
                    <van-field
                        v-model="personScope" 
                        readonly
                        clickable
                        name="personScope"
                        :value="personScope"
                        placeholder="公司规模"
                        @click="onShowPicker('personScope')"/>
                </van-cell-group>
                <van-cell-group>
                    <label class="form-label" for="">所属领域</label>
                    <!-- <van-field v-model="compForm.industry" name="industry" placeholder="公司性质" /> -->
                    <van-field
                        v-model="industry" 
                        readonly
                        clickable
                        name="industry"
                        :value="industry"
                        placeholder="所属领域"
                        @click="onShowPicker('industry')"/>
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
        <van-popup round v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"/>
        </van-popup>
        <van-popup v-model="showCityPicker" round position="bottom">
            <van-area 
                title="选择期望城市" 
                :area-list="areaList" 
                :columns-num="3" 
                @cancel="showCityPicker = false"
                @confirm="onCityConfirm"/>
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
import areaData from "utils/area"
export default {
    data () {
        return {
            deletable: false,
            showEntpType: false,
            showPersonScope: false,
            showCityPicker: false,
            showPicker: false,
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
            personScopes: ['20人以下','20-99人','100-499人','500-999人','1000-9999人','10000人以上'],
            areaList: '',
            pickerName: '',
            city: '',
            columns: [],
            industry: '',
            industries: ['互联网/IT/电子/通讯','房地产','金融业','建筑业','制造业','农林牧渔','批发/零售/贸易','专业服务','文化/体育/娱乐','交通运输/仓储/物流','能源/环保/矿产','教育培训/科研','卫生及社会工作','公共管理/社会保障','生活服务'],
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
                   this.city = this.compForm.city
                   this.industry = this.compForm.industry
                    this.entpType = this.entpTypes[Number(this.compForm.entpType) -1]
                    if (this.compForm.personScope) {
                        this.personScope = this.personScopes[Number((this.compForm.personScope).substring(1)) -1]
                    }
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
               }
            })
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
        onShowPicker(name) {
            this.pickerName = name
            this.showPicker = true
            if (this.pickerName === 'industry') {
                this.columns = this.industries
            } else if (this.pickerName === 'entpType') {
                this.columns = this.entpTypes
            } else if (this.pickerName === 'personScope') {
                this.columns = this.personScopes
            }
        },
        onConfirm(val) {
            this[this.pickerName] = val
            this.showPicker = false
        },
        onCityConfirm (val) {
            let cityAddress = val[0].name + val[1].name + val[2].name
            this[this.cityPickerName] = cityAddress
            this.showCityPicker = false
        },
        getAllCity () {
            this.areaList = areaData
        }
    },
    mounted () {
        this.getCompDesc()
        this.getAllCity()
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