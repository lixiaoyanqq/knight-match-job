<template>
    <div id="tabbar" class="tabbar">
        <van-tabbar 
            active-color="#283ac7" 
            inactive-color="#7b7b7b" 
            safe-area-inset-bottom
            v-model="active">
            <van-tabbar-item
                v-for="(item, index) in tabData"
                :key="index"
                @click="tab(index, item.name)">
                <span :class="currIndex == index ? active : ''">
                    {{item.title}}
                </span>
                <template #icon="props">
                    <img :src="props.active ? item.icon.active_icon_path : item.icon.inactive_icon_path" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
        <!-- 缓存界面选择加载 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
</template>
<script>
import { getLocalStore } from 'utils/global'
import { mapState, mapMutations, mapActions } from 'vuex'
import * as type from 'store/user/mutations_types'
export default {
    name: 'DashBoard',
    data () {
        return {
            currIndex: 0,
            active: 0,
            userBaseInfo: getLocalStore('baseInfo'),
            tabData: [
                {
                    title: '首页',
                    name: 'home',
                    icon: {
                        active_icon_path: require('../../common/image/tabbar/home_2.png'),
                        inactive_icon_path: require('../../common/image/tabbar/home_1.png')
                    }
                },
                {
                    title: '职位收藏',
                    name: 'position',
                    icon: {
                        active_icon_path: require('../../common/image/tabbar/collection_2.png'),
                        inactive_icon_path: require('../../common/image/tabbar/collection_1.png')
                    }
                },
                {
                    title: '简历收藏',
                    name: 'resume',
                    icon: {
                        active_icon_path: require('../../common/image/tabbar/collection_2.png'),
                        inactive_icon_path: require('../../common/image/tabbar/collection_1.png')
                    }
                },
                {
                    title: '消息',
                    name: 'message',
                    icon: {
                        active_icon_path: require('../../common/image/tabbar/message_2.png'),
                        inactive_icon_path: require('../../common/image/tabbar/message_1.png')
                    }
                },
                {
                    title: '个人中心',
                    name: 'personal',
                    icon: {
                        active_icon_path: require('../../common/image/tabbar/personal_2.png'),
                        inactive_icon_path: require('../../common/image/tabbar/personal_1.png')
                    }
                }
            ]
        }
    },
    computed: {
        ...mapState({
            baseInfo(state){
                return state.user.baseInfo
            }
        })
    },
    methods: {
        ...mapMutations({
            fetchBaseInfo: type.INIT_USER_INFO
        }),
        getBaseInfo(){
            this.fetchBaseInfo()
            if(this.baseInfo.userType === '0'){
                this.tabData = this.tabData.filter( item => item.name != 'resume')
            } else if (this.baseInfo.userType === '1') {
                this.tabData = this.tabData.filter( item => item.name != 'position')
            }
        },
        tab(index, val){
            this.currIndex = index
            this.$router.push(val)
        },
        tabbarSelected(item){
            const mapType = {
                home: 0,
                position: 1,
                message: 2,
                personal: 3
            }
            this.active = mapType[item]
        }
    },
    mounted() {
        this.getBaseInfo()
    },
    created(){
        //通过路由跳转绑定Tabbar的选中
        this.tabbarSelected(this.$route.name)
    },
    watch: {
        // 监听路由变化,保证路由跳转Tabbar选中正常
        $route: {
            handler(val, oldval) {
                this.tabbarSelected(val.name)
            }
        },
        deep: true
    }
}
</script>
<style lang="stylus" scoped>

</style>