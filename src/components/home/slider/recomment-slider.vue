<template>
    <div id="recomment-slider">
        <div class="posMenuwrapper">
            <div class="hotTit" @click="onAllPost">
                <span v-if="userInfo.userType === '0'">热门职位</span>
                <span v-if="userInfo.userType === '1'">全部职位</span>
            </div>
            <div class="menuList">
                <ul v-if="userInfo.userType === '0'" ref="menuUlContent">
                    <li class="menuItem" 
                        v-for="(item, index) in recomments" 
                        :key="item.id"
                        ref="menuTitle"
                        :class="{selected: currentSubTitle === index}"
                        @click="menuItemClick(index,item)">
                        {{item.name}}
                    </li>
                </ul>
                <ul v-if="userInfo.userType === '1'" ref="menuUlContent">
                    <li class="menuItem" 
                        v-for="(item, index) in recommentPosts" 
                        :key="item.id"
                        ref="menuTitle"
                        :class="{selected: currentSubTitle === index}"
                        @click="menuItemClick(index,item)">
                        {{item.postName}}
                    </li>
                </ul>
            </div>
            <div class="menuAll" @click="clickAll">
                <span v-if="menuDown" class="downMenu">
                    <van-icon size="24" color="#a9aeb2" name="ascending" />
                </span>
                <span v-else class="upMenu">
                    <van-icon size="24" color="#a9aeb2" name="descending" />
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import { setLocalStore, getLocalStore, removeLocalStore } from "utils/global"
import * as homeApi from 'api/home'
import { mapActions } from 'vuex'
import * as type from 'store/user/mutations_types'
export default {
    data () {
        return {
            userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
            menuDown: true,
            recomments : [
                { "id":"5b472224846c2e46158d4521","name":"产品经理" },
                { "id":"5b4721f1846c2e37668d594b","name":"算法工程师" },
                {"id":"5b5eb6c3c3c44276578b93f3","name":"编辑" },
                { "id":"5b8cd49ddc92d0a5468bf95f","name":"老师" },
                { "id":"5b472145846c2e1c498bead6","name":"web前端工程师" },
                { "id":"5b67be95846c2ed9478d3872","name":"Java工程师" },
                { "id":"5b472122846c2e1c498be9bb","name":"技术总监" },
                { "id":"5b4722d7846c2e206b8d660d","name":"HR" },
                { "id":"5b472209846c2e4b6a8d722f","name":"UI设计" },
                { "id":"5b472230846c2eaa758d5d6d","name":"AI设计" },
                { "id":"5b47218e846c2ef7408be742","name":"工程师" },
                { "id":"5b4720fa846c2eb4428ce996","name":"Go工程师" },
                { "id":"5b46f993c3c442a6338d53ce","name":"销售顾问" },
                { "id":"5b5eadccc5702ece0d8ba38a","name":"IOS工程师" }
            ],
            recommentPosts: [],
            currentSubTitle: 0,
            dynamicWidths: [],
            msg: '全部',
        }
    },
    methods: {
        ...mapActions({
            setSearchRKey: type.SET_SEARCH_RESUME_ID,
            delSearchRKey: type.DEL_SEARCH_RESUME_ID,
            setSearchPKey: type.SET_SEARCH_POSITION_NAME,
            delSearchPKey: type.DEL_SEARCH_POSITION_NAME
        }),
        async initData () {
            if (this.userInfo.userType === "0") { 
                // console.log('热门推荐')
                // this.recommentResums = this.recomments
            }
            if (this.userInfo.userType === "1") { 
                let data = await homeApi.postList()
                if (data.code === '200') {
                    this.recommentPosts = data.content.listx
                }
            }
            this.$nextTick(() => {
                this._initMenuTitleScroll()
            })
        },
        clickAll () {
            // 上下菜单图标切换
            this.menuDown = !this.menuDown
        },
        menuItemClick (index, obj) {
            // 让横向滑动到合适位置
            this.setLocalKey(obj)
            this.currentSubTitle = index
            let el = this.$refs.menuTitle[index]
            this.menuTitleScroll.scrollToElement(el, 500)
            // 点击顶部菜单栏,如果下拉菜单存在,那么就隐藏
            if (!this.menuDown) {
                // 直接调点击下拉菜单按钮
                this.clickAll()
            }
        },
        onAllPost() {
            if(this.userInfo.userType === "0") {
                this.delSearchPKey()
            }

            if (this.userInfo.userType === "1") {
                this.delSearchRKey()
            }
        },
        setLocalKey(objval) {
            if (this.userInfo.userType === "0") {
                this.setSearchPKey(objval.name)
            }
            if (this.userInfo.userType === "1") {
                // setLocalStore('postIdKey', objval.id)
                this.setSearchRKey(objval.id)
            }
        },
        _initMenuTitleScroll () {
            //让UL渲染完后
            this.$nextTick(() => {
                if (!this.menuTitleScroll) {
                    let contentWrapperWidth = 100
                    let el = this.$refs.menuTitle
                    for (let i = 0; i < el.length; i++) {
                        contentWrapperWidth += el[i].clientWidth * 1.18
                    }
                    //给ul设置宽度,保证可以横向滚动
                    this.$refs.menuUlContent.style.width = contentWrapperWidth + 'px'
                    this.menuTitleScroll = new BScroll('.menuList', {
                        probeType: 3,
                        startX: 0,
                        click: true,
                        scrollX: true
                    })
                } else {
                    this.menuTitleScroll.refresh()
                }
            })
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
#recomment-slider
    width 100%
    // margin-top 40px
    overflow hidden
    height 40px
    // margin-bottom 3rem
.posMenuwrapper
    width 100%
    height 2.5rem
    display inline-block
    white-space nowrap
    border-bottom solid 0.01rem #e8e9e8
    overflow hidden
    // position fixed
    // z-index 199
    // top 60px
    background $color-background
    // background red
.menuList
    display inline-block
    width 65%
    margin-left 16px
    overflow hidden
    margin-top 10px
.menuItem
    margin-right 0.5rem
    display inline-block
    font-size 16px
    padding 0.3rem
    border-radius 0.6rem
    color $color-text-b
.selected
    color #f61e67
    // background linear-gradient(to right, #2739c8, #f51e67)
.hotTit
    display inline-block
    position relative
    top -7px
    left 20px
    font-size 16px
    line-height 14px
    width 62px
    height 16px
    padding 0.4rem
    border-radius 8rem
    background linear-gradient(to right, #2739c8, #f51e67)
.menuAll
    display inline-block
    position relative
    top 0
    right 1px
    margin-right 0.9rem
.downMenu
    width 1rem
    height 1rem
</style>