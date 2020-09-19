<template>
    <div class="position-manage">
        <van-nav-bar title="职位管理"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:2.5rem" />
        <section class="pos-manage-list">
            <div class="manage-header">
                <van-row>
                    <van-col span="22">
                        <span>发布的职位</span> 
                    </van-col>
                    <van-col span="2">
                        <van-button class="opr-btn" @click="openPosition" size="mini" icon="plus" type="default" />
                    </van-col>
                </van-row>
            </div>
            <div class="manage-card" v-for="(post, index) in postList.listx" :key="index">
                <h1 @click="onEdit(post)">{{post.postName || '-'}}</h1>
                <ul>
                    <li>{{post.postSalary || '-'}}</li>
                    <li>{{post.postCity || '-'}}</li>
                    <li>{{post.reqJobExp || '-'}}</li>
                </ul>
                <ul>
                    <li>{{post.flashTime || '-'}}</li>
                    <li>{{post.recordStatus === '0' ? '已截止' : '招聘中' || '-'}}</li>
                </ul>
                <van-row type="flex">
                    <van-col offset="16">
                        <van-button type="primary" size="mini" @click="onPushOrDown(post)">下线</van-button>
                        <van-button type="primary" size="mini">刷新</van-button>
                    </van-col>
                </van-row>
            </div>
        </section>
    </div>
</template>
<script>
import * as type from 'store/home/mutations_types'
import * as homeApi from 'api/home'
import { mapState, mapActions } from 'vuex'
import { Toast, Dialog } from 'vant'
export default {
    data () {
        return {}
    },
    computed: {
        ...mapState({
            postList (state) {
                return state.home.postList
            }
        })
    },
    methods: {
        ...mapActions({
            fetchPostList: type.FETCH_POSITION
        }),
        getPostList(){
            this.fetchPostList()
        },
        onClickLeft () {
            this.$router.back()
        },
        onEdit (post) {
            this.$router.push({ name: 'openPosition', query: {id: post.id}})
        },
        onPushOrDown(event){
            let paramObj = {
                id: event.id,
                publishStatus: event.recordStatus
            }
            let message = paramObj.publishStatus === '0' ? '确定要上线该职位么' : '确定下线该职位么'
            Dialog.confirm({
                title: '操作提示',
                message: message,
            }).then(() => {
                console.log('121212')
                homeApi.switchPublish(paramObj)
            }).catch(()=>{

            })
        },
        openPosition () {
            this.$router.push({ name: 'openPosition' })
        }
    },
    mounted () {
        this.fetchPostList()
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.position-manage
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.pos-manage-list
    margin-top 3rem
.manage-header
    height 40px
    line-height 40px
.manage-header span 
    padding-left 20px
    color #000000
    font-size 20px
.manage-card
    width 90%
    padding 20px 0
    margin 20px auto
    background $color-text
    border-radius 20px
    color #000000
.manage-card h1 
    line-height 24px
    font-size 18px
    padding-left 15px
.manage-card ul
    margin-left 15px
.manage-card ul li 
    display inline-block
    line-height 35px
</style>