<template>
    <div class="position-manage">
        <van-nav-bar title="职位管理"
            fixed
            :border='false'
            @click-left="onClickLeft"
            left-arrow
            style="height:4rem" >
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="pos-manage-list">
            <div class="manage-header">
                <van-row>
                    <van-col span="20">
                        <span>发布的职位</span> 
                    </van-col>
                    <van-col span="4">
                        <van-button class="opr-btn" @click="replayPosition" size="mini" icon="replay" type="default" />
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
                    <li>
                        <van-tag round color="#ffe1e1" text-color="#ad0000">{{post.publishStatus === '0' ? '已截止' : '招聘中' || '-'}}</van-tag>
                    </li>
                </ul>
                <van-row type="flex">
                    <van-col offset="16" span="4">
                        <van-button round type="primary" style="padding:0 10px" color="linear-gradient(to right, #2739c8, #f51e67)" size="mini" @click="onDeletePos(post)">
                            删除
                        </van-button>
                    </van-col>
                    <van-col span="4">
                        <van-button round type="primary" style="padding:0 10px" color="linear-gradient(to right, #2739c8, #f51e67)" size="mini" @click="onPushOrDown(post)">
                            {{post.publishStatus === '0' ? '上线' : '下线'}}
                        </van-button>
                    </van-col>
                </van-row>
            </div>
        </section>
    </div>
</template>
<script>
import store from 'store'
import * as type from 'store/home/mutations_types'
import * as homeApi from 'api/home'
import { mapState, mapActions } from 'vuex'
import { Toast, Dialog, Notify } from 'vant'
export default {
    data () {
        return {
            loading: false,
            leftIcon: require("common/image/home/lefticon.png"),
        }
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
        async onDeletePos (event) {
            console.log('删除',event)
            let data = await homeApi.delRecruit(event.id)
            if(data.code === '200') {
                Toast.success('删除成功')
                this.getPostList()
            } else {
                Toast.fail('删除失败')
            }
        },
        onPushOrDown(event){
            let paramObj = {
                id: event.id,
                publishStatus: event.publishStatus
            }
            let message = paramObj.publishStatus === '0' ? '确定要上线该职位么' : '确定下线该职位么'
            Dialog.confirm({
                title: '操作提示',
                message: message,
            }).then(() => {
                homeApi.switchPublish(paramObj)
                store.dispatch(type.FETCH_POSITION)
            }).catch(()=>{

            })
        },
        openPosition () {
            this.$router.push({ name: 'openPosition' })
        },
        replayPosition() {
            store.dispatch(type.FETCH_POSITION)
        }
    },
    mounted () {
        this.getPostList()
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
    margin-top 4rem
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