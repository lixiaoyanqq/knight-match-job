<template>
    <div class="pos-detail">
        <van-nav-bar 
            :title="title"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:2.5rem" />
        <section class="desc-swipe">
            <van-swipe class="my-swipe" :width="'100%'" :height="200" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <div class="pos-pic">
                        <van-image :src="image" />
                    </div>
                </van-swipe-item>
            </van-swipe>
        </section>
        <section class="pos-name">
            <van-row>
                <van-col span="20">
                    <h1>{{allData.postDept}}（{{allData.postName}}）</h1>
                    <p class="">
                        <span>{{allData.postCity}}</span>
                        <span>{{allData.reqJobExp}}</span>
                        <span>{{allData.reqAcademic}}</span>
                        <span>{{allData.postSalary}}</span>
                    </p>
                </van-col>
                <van-col span="4">
                    <van-icon @click="onFover(allData)" :name="allData.isFavorites === '1' ? 'star' : 'star-o'" />
                </van-col>
            </van-row>
        </section>
        <!-- <section class="pos-tags">
            <van-tag round v-for="(tag, index) in tags" :key="index" :color="tag.color">{{tag.name}}</van-tag>
        </section> -->
        <section class="pos-spot">
            <h1>职位要求</h1>
            <ul>
                <li v-for="(postRequirement, index) in postRequirements" :key="index">
                    <!-- <span>{{(index + 1)}}：</span> -->
                    <span>{{postRequirement}}</span>
                </li>
            </ul>
        </section>
        <section class="welfare">
            <h1>公司福利</h1>
            <van-tag v-for="(postAllure, index) in postAllures" :key="index" :color="postAllure.color" type="danger" size="large">{{postAllure.name}}</van-tag>
        </section>
        <section class="pos-desc">
            <h1>职位介绍</h1>
            <ul>
                <li v-for="(postDemand, index) in postDemands" :key="index">
                    <!-- <span>{{index + 1}}、</span> -->
                    <span>{{postDemand}}</span>
                </li>
            </ul>
        </section>
        <section class="opera-btns">
            <van-row>
                <!-- <van-col span="0">
                    <van-button round block type="info" color="linear-gradient(to top, #283ac9, #5875dc)" @click.native.prevent="contactCompany">
                        联系公司
                    </van-button>
                </van-col> -->
                <van-col span="24">
                    <van-button round block type="info" color="linear-gradient(to right, #2739c8, #f51e67)" @click.native.prevent="nowDelivery">
                        立即投递
                    </van-button>
                </van-col>
            </van-row>
        </section>
        <section class="pos-comments">
            <h1 class="all-rate">
                <span>4.5</span>
                <van-rate v-model="allRateValue" allow-half color="#ff5a8c" :size="18" void-icon="star" />
            </h1>
            <div class="my-comments">
                <van-row>
                    <van-col span="6">
                        <div class="my-pic">
                            <van-image :src="myPic" /> 
                        </div>
                    </van-col>
                    <van-col span="18">
                        <h2>{{baseInfo.nickName}}</h2>
                        <p class="my-rate">
                            <span>星级</span>
                            <van-rate v-model="myRateValue" :size="16" color="#ff5a8c" allow-half void-icon="star" />
                        </p>
                        <div class="my-opera">
                            <van-row>
                            <van-col span="18">
                                <van-field v-model="comment" name="comment"  placeholder="发表你的意见"/>
                            </van-col>
                            <van-col span="6">
                                <van-button type="primary" :disabled="comment.length <= 0" @click.native.prevent="onComment" size="mini">发表</van-button>
                            </van-col>
                            </van-row>
                        </div>
                    </van-col>
                </van-row>
                <div class="my-divider"></div>
            </div>
            <div class="comments-list" v-for="(comment, index) in comments" :key="index">
                <van-row>
                    <van-col span="6">
                        <div class="comment-pic">
                            <van-image :src="comment.otherPic" /> 
                        </div>
                    </van-col>
                    <van-col span="18">
                        <h2>{{comment.userName}}</h2>
                        <p class="comment-rate">
                            <span>星级</span>
                            <van-rate v-model="comment.startsNum" allow-half :size="16" color="#ff5a8c" void-icon="star" />
                        </p>
                        <p class="comment-cont">
                            {{comment.comment}}
                        </p>
                    </van-col>
                </van-row>
                <div class="list-divider"></div>
            </div>
        </section>
        <section class="other-recommend">
            <h1>其他推荐</h1>
            <div class="recommend-card" v-for="(recommment, index) in otherRecommends" :key="index">
                <van-row>
                    <van-col span="10">
                        <van-image :src="recommment.recommentImg" />
                    </van-col>
                    <van-col span="14">
                        <h2>
                            <span>{{recommment.pos}}</span><span>|</span><span>{{recommment.comm}}</span>
                        </h2>
                        <p>
                            <span>{{recommment.address}}</span><span>|</span><span>{{recommment.area}}</span><span>|</span><span>{{recommment.requir}}</span><span>|</span><span>{{recommment.othen}}</span>
                        </p>
                        <h3>
                            <van-rate v-model="recommment.rate" :size="16" color="#ff5a8c" allow-half void-icon="star" />
                        </h3>
                    </van-col>
                </van-row>
            </div>
        </section>
    </div>
</template>
<script>
import * as posApi from 'api/position'
import * as userApi from 'api/user'
import * as posType from 'store/position/mutations_types'
import * as postUtil from 'components/pos-desc/services/service'
import { Toast } from 'vant'
import { getLocalStore } from 'utils/global'
import { BASE_URL } from 'api/config'
export default {
    data () {
        return {
            baseInfo: JSON.parse(getLocalStore('baseInfo')),
            loading: false,
            title: '职位详情',
            id: this.$route.query.id,
            allData: {},
            postRequirements: [],
            postAllures: [],
            colors: ['#8da3ef', '#f993b3', '#f2c34e', '#b2bff3', '#f86e99', '#f9e6c2'],
            postDemands: [],
            allRateValue: 4.5,
            myRateValue: 1,
            recommendRate: 5,
            comment: '',
            myPic: '',
            images:[],
            tags: [
                { name: '北京', color: '#8da3ef'},
                { name:'1-3年', color: '#f993b3'},
                { name:'本科', color: '#f2c34e'},
                { name:'10k-15k', color: '#b2bff3'},
                { name:'软件', color: '#f86e99'},
                { name:'互联网', color: '#f9e6c2'}
            ],
            comments: [],
            otherRecommends: [
                {
                    recommentImg: require('common/image/position/pos-list-1.png'),
                    pos: '前端',
                    comm: '椅子网',
                    address: '上海',
                    area: '莆田区',
                    requir: '三年',
                    other: '五',
                    rate: 5
                },
                {
                    recommentImg: require('common/image/position/pos-list-2.png'),
                    pos: '前端',
                    comm: '椅子网',
                    address: '上海',
                    area: '莆田区',
                    requir: '三年',
                    other: '五',
                    rate: 4
                },
                {
                    recommentImg: require('common/image/position/pos-list-3.png'),
                    pos: '前端',
                    comm: '椅子网',
                    address: '上海',
                    area: '莆田区',
                    requir: '三年',
                    other: '五',
                    rate: 3
                }
            ]
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        init(){
            if(this.id){
                this.getPosDetail()
                this.getCommList()
                this.getMyPic()
            }
        },
        getMyPic () {
            this.myPic = `${BASE_URL}${this.baseInfo.profilePicture}`
        },
        getPosDetail(){
            posApi.posDetail(this.id)
                .then( res => {
                    this.formatFetchDetail(res)
                })
        },
        getCommList(){
            let commParams = {
                resId: this.id,
                resType: '1',
                pageNum: '1',
                pageSize: '5'
            }
            posApi.commList(commParams)
                .then( data =>{
                    if(data.code === '200'){
                        // console.log('data',data)
                        this.comments = data.content.listx
                    }
                })
        },
        formatFetchDetail(fetchDate){
            this.allData = fetchDate.content
            this.postRequirements = this.transformArray(fetchDate.content.postRequirements)
            this.postAllures = this.transformArrayObj(fetchDate.content.postAllure)
            this.postDemands = this.transformArray(fetchDate.content.postDemand)
            this.images = this.allData.entpLogo ? this.allData.entpLogo.split(',') : null
            // console.log('this.postDemands',this.postDemands)
        },
        transformArray(string){
            if(string){
                return string.split('；')
            }
        },
        transformArrayObj(string){
            if (string){
                let alluresArry = string.split(',')
                return postUtil.zip(alluresArry, this.colors).map(([name, color]) => ({name, color}));
            }
        },
        contactCompany(){

        },
        async onFover(val){
            // console.log('val',val)
            let params = {
                resId: val.id,
                resType: '1',
                resName: val.postName,
                
            }
            let data = await userApi.isCollect(params)
            if (data.code === '200') {
                // console.log('data',data)
                Toast.success('操作成功')
                this.getPosDetail()
            }
        },
        nowDelivery(){
            posApi.onDelivery(this.id).then(data =>{
                console.log('data',data)
                if(data.code === '200'){
                    Toast.success('投递成功')
                }
            })
        },
        onComment(){
            let param = {
                startsNum: this.myRateValue.toString(),
                comment: this.comment,
                resId: this.id,
                resType: '1'
            }
            userApi.leaveMessage(param).then(res => {
                // console.log('res',res)
                if(res.code === '200') {
                    Toast.success('评论成功')
                    this.comment = ''
                    this.getCommList()
                }
                
            })
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.pos-detail
    padding-bottom 80px
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 999
    background $color-background
    overflow-y scroll
.desc-swipe
    margin-top 2.5rem
.pos-pic
    width 80%
    height 90%
    margin 10px auto
.pos-pic .van-image
    width 100%
    height 100%
    overflow hidden
    border-top-right-radius 70px
.pos-name 
    height 72px
.pos-name h1 
    color #000000
    font-size 20px 
    padding-left 15px 
    padding-top 10px
.pos-name p 
    height 28px
    line-height 28px
    padding 5px 0 0 15px
    color #999999
.pos-name p span
    padding-right 10px
.pos-name .van-icon
    font-size 24px
    padding-top 15px
    color #ff5a8c
.pos-tags .van-tag
    margin 3px 3px
.pos-spot, .pos-desc
    width 90%
    margin 15px auto
    // padding 10px
    background #ffffff
    border-radius 10px
.pos-spot h1 ,.pos-desc h1
    color #000000
    line-height 24px
    padding 10px 0 0 10px
.pos-spot ul,.pos-desc ul
    padding 10px
.pos-spot ul li ,.pos-desc ul li
    line-height 20px
    color #666666
.welfare 
    padding 15px 15px
.welfare h1 
    line-height 24px
    color #000000
.welfare .van-tag
    margin 5px
.opera-btns
    width 90%
    margin 10px auto
.opera-btns .van-button
    width 80%
    margin 0 auto
.pos-comments
    width 90% 
    margin 10px auto
    background #ffffff
    border-radius 10px
.all-rate ,.my-comments, .comments-list
    padding 10px
.all-rate span 
    color #ff5a8c
    font-size 24px
.my-comments .my-pic, .comments-list .comment-pic
    width 80%
    height 60px
    margin 3px auto
    border-radius 25px
    overflow hidden
.my-comments h2, .comments-list h2
    line-height 24px
    color #000000
.my-comments .my-rate span ,.comments-list .comment-rate span
    color #000000
    font-size 14px
.my-opera .van-field
    padding 0
.my-opera .van-button
    border none 
    border-radius 8px
.my-divider
    width 90%
    height 2px
    margin 10px auto
    background #dcdcdc
.comments-list .comment-cont
    line-height 28px
    font-size 14px
    color #a9aeb2
    overflow hidden
    no-wrap()
.list-divider
    width 90%
    height 1px
    margin 10px auto
    background #dcdcdc
.other-recommend
    width 90% 
    margin 10px auto
.other-recommend h1 
    font-size 18px
    line-height 36px
    color #4e6a75
.recommend-card
    width 100% 
    height 100px
    background #ffffff
    border-radius 10px
    margin 10px auto
.recommend-card .van-image
    width 120px 
    height 80px
    border-radius 10px
    overflow hidden
    margin 10px
.recommend-card h2 
    padding-top 15px
    color #000000
.recommend-card h2 span 
    padding-right 5px
.recommend-card p 
    color #000000
    padding-top 10px
    font-size 14px
.recommend-card p span 
    padding-right 4px
.recommend-card h3 
    padding-top 10px
</style>