<template>
    <div class="position-collect">
        <van-sticky :offset-top="0" class="sticky">
            <div class="collection-search">
                <van-row>
                    <!-- <van-col span="4" class="city-menu">
                        <van-dropdown-menu>
                        <van-dropdown-item v-model="value" :options="option" />
                        </van-dropdown-menu>
                    </van-col> -->
                    <van-col span="24">
                        <form action="/">
                            <van-search 
                                v-model="searchKey"
                                background="#e6e9f5"
                                shape="round"
                                left-icon=""
                                :right-icon="searchIcon"
                                placeholder="搜索感谢兴趣的职位/公司"></van-search>
                        </form>
                    </van-col>
                </van-row>
            </div>
        </van-sticky>
        <div class="collection-list">
            <div class="position-tit">
                <h1>简历收藏列表</h1>
            </div>
            <div v-if="resumes.listx !== undefined && resumes.listx.length > 0">
                <div class="position-card" v-for="(resume, index) in resumes.listx" :key="resume.id + index">
                    <van-row>
                        <van-col span="10">
                            <div class="list-image">
                                <img :src="resume.userHeadPic">
                            </div>
                        </van-col>
                        <van-col span="14">
                            <h1 class="pos-card-tit" @click="onDetail(resume)">{{resume.actualName || '-'}}</h1>
                            <div class="pos-card-score">
                                <!-- <van-rate 
                                    :value="collect.scoreValue"
                                    :size="scoreSize"
                                    allow-half
                                    color="#ff5a8c"
                                    void-color="#ff5a8c"
                                    void-icon="star-o"
                                    @change="onChange">
                                </van-rate>
                                <span>(推荐指数)</span> -->
                                <p>
                                    <span>{{resume.expectPosts || '-'}}</span>
                                </p>
                            </div>
                            <p class="pos-card-desc">
                                <span>{{resume.gender || '-'}}</span>
                                <span>{{resume.expectSalary || '-'}}</span>
                                <span>{{resume.expectCitys || '-'}}</span>                            </p>
                            <!-- <div class="pos-card-btns">
                                <van-row>
                                    <van-col span="8"></van-col>
                                    <van-col span="8">
                                        <van-button class="delete-pos" :icon="deleteIcon" type="primary" size="mini">删除</van-button>
                                    </van-col>
                                    <van-col span="8">
                                        <van-button class="delivery-pos" :icon="deliveryIcon" type="primary" size="mini">投递</van-button>
                                    </van-col>
                                </van-row>
                            </div> -->
                        </van-col>
                    </van-row>
                </div>
            </div>
            <van-empty v-else description="您还没有收藏简历哦，赶快去浏览一下吧" />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as resumeType from 'store/resume/mutations_types'
export default {
    data () {
        return {
            scoreSize: 16,
            overlay: false,
            touchable: true,
            deleteIcon: require('common/image/position/delete.png'),
            deliveryIcon: require('common/image/position/delivery.png'),
            value: 0,
            searchKey: '',
            searchIcon: require('common/image/home/search.png'),
            option: [
                { text: "北京", value: 0 },
                { text: "上海", value: 1 },
                { text: "深圳", value: 2 },
                { text: "广州", value: 3 },
                { text: "天津", value: 4 },
                { text: "香港", value: 5 }
            ]
        };
    },
    computed: {
        ...mapState({
            resumes (state) {
                return state.resume.resume.resumes
            }
        })
    },
    methods: {
        ...mapActions({
            fetchResumes: resumeType.FETCH_RESUMES
        }),
        getResumes () {
            this.fetchResumes()
        },
        onChange(value){
            this.scoreValue = value
        },
        onDetail(resume){
            console.log('resume---',resume)
            this.$router.push({name: 'likeResumeDetail', query: {id: resume.userId}})
        }
    },
    mounted(){
        this.getResumes()
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.collection-list
    margin-bottom 80px
.position-tit
    width 100%
    height 50px
    color #000
    font-size 24px
    line-height 48px
.position-tit h1 
    padding-left 15px
.position-card
    width 90%
    margin 10px auto
    height 135px
    border-radius 20px
    background $color-text
    // card-shadow()
.list-image
    width 80%
    height 80%
    margin 20px auto
    border-radius 10px
    overflow hidden
.list-image img 
    width 100px
    height 90px
.pos-card-tit
    margin-top 20px
    color #000
.pos-card-score
    margin-top 15px
.pos-card-score p
    color #000000
.pos-card-score span 
    color #000
    font-size 14px
.pos-card-desc
    margin-top 15px
    font-size 12px
    color #a9aeb2
    line-height 14px
.pos-card-btns .van-button
    border-radius 13px
    border none
.pos-card-btns .delete-pos
    background -webkit-gradient(linear, 0 0, 100% 100%, from(#fdccda), to(#ffcddc));
.pos-card-btns .delivery-pos
    background -webkit-gradient(linear, 0 0, 100% 100%, from(#c1c6f0), to(#c2c7f1));
</style>