<template>
    <div class="position-collect">
        <van-nav-bar title="职位收藏列表"
                 fixed
                 :border='false'
                 style="height:4rem">
        </van-nav-bar>
        <div class="collection-list">
            <div v-if="collects !== undefined && collects.length > 0">
                <div class="position-card" v-for="collect in collects" :key="collect.id">
                    <van-row>
                        <van-col span="10">
                            <div class="list-image">
                                <img :src="collect.entpLogo ? collect.newLogo : defaultAvatar">
                            </div>
                        </van-col>
                        <van-col span="14">
                            <h1 class="pos-card-tit" @click="onDetail(collect)">{{collect.postName || '-'}}</h1>
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
                                    {{collect.entpName || '-'}}
                                </p>
                            </div>
                            <p class="pos-card-desc">
                                
                                <span>{{collect.postSalary || '-'}}</span>
                                <span>{{collect.reqAcademic || '-'}}</span>
                                <span>{{collect.reqJobExp || '-'}}</span>
                            </p>
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
            <van-empty v-else description="您还没收藏喜欢的职位哦，赶快去看看吧" />
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as posType from 'store/position/mutations_types'
import { BASE_URL } from 'api/config'
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
            searchIcon: require('common/image/home/search.png'),
            collects: [],
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
            positions (state) {
                return state.position.positions
            }
        }),
        newPositions: function () {
            this.positions.listx.map(item => {
                return {...item, newLogo: `${BASE_URL}${item.entpLogo}`}
            })
        }
    },
    methods: {
        ...mapActions({
            fetchPosList: posType.FETCH_POSITIONS
        }),
        onChange(value){
            this.scoreValue = value
        },
        onDetail(pos){
            this.$router.push({name: 'posDetail', query: {id: pos.id}})
        },
        async getPostList(){
            let data = await this.fetchPosList()
            if(data.code === '200'){
                this.collects = data.content.listx.map(item => {
                    return {...item, newLogo: `${BASE_URL}${item.entpLogo}`}
                })
            }
            console.log('data1111',this.collects)
        }
    },
    mounted(){
        this.getPostList()
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
    height 80px
    height auto
.pos-card-tit
    margin-top 20px
    color #000
.pos-card-score
    margin-top 15px
.pos-card-score p 
    color #000000
    font-size 12px
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