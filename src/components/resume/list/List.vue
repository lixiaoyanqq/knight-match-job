<template>
    <div class="position-collect">
        <van-nav-bar title="简历收藏列表"
                 fixed
                 :border='false'
                 style="height:4rem">
        </van-nav-bar>
        <div class="collection-list">
            <div v-if="newResumes !== undefined && newResumes.length > 0">
                <div class="position-card" v-for="(resume, index) in newResumes" :key="resume.id + index">
                    <van-row>
                        <van-col span="10">
                            <div class="list-image">
                                <img :src="resume.userHeadPic ? resume.newPic : defaultAvatar">
                            </div>
                        </van-col>
                        <van-col span="14">
                            <h1 class="pos-card-tit" @click="onDetail(resume)">{{resume.actualName || '-'}}</h1>
                            <div class="pos-card-score">
                                <p>
                                    <span>{{resume.expectPosts || '-'}}</span>
                                </p>
                            </div>
                            <p class="pos-card-desc">
                                <span>{{resume.gender || '-'}}</span>
                                <span>{{resume.expectSalary || '-'}}</span>
                                <span>{{resume.expectCitys || '-'}}</span>                            </p>
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
import { BASE_URL } from 'api/config'
import { Circle } from 'vant'
export default {
    data () {
        return {
            scoreSize: 16,
            overlay: false,
            touchable: true,
            deleteIcon: require('common/image/position/delete.png'),
            deliveryIcon: require('common/image/position/delivery.png'),
            defaultAvatar: require("common/image/home/default-avatar.jpeg"),
            value: 0,
            searchKey: '',
            searchIcon: require('common/image/home/search.png')
        };
    },
    computed: {
        ...mapState({
            resumes (state) {
                return state.resume.resume.resumes
            }
        }),
        newResumes: function () {
            return this.resumes.listx.map(item => {
                return {...item, newPic: `${BASE_URL}${item.userHeadPic}`}
            })
        }
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
    margin-top 5rem
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