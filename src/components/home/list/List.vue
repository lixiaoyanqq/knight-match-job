<template>
  <div class="home">
    <van-sticky :offset-top="0" class="sticky">
      <search/>
      <recomment-slider/>
    </van-sticky>

    <!-- <van-sticky class="sider-sticky" :offset-top="350"> -->
      <section class="sider-nav">
         <van-icon :name="likeIcon" :badge="likeNum"  @click="onLike" />
         <van-icon :name="remarkIcon" :badge="commentsNum" @click="onLiveMsg" />
         <van-icon :name="shareIcon" @click="onTransmit" />
         <van-icon :name="starIcon" :badge="connectionNum" @click="onCollect" />
      </section>
    <!-- </van-sticky> -->
    <dashboard/>
    <top-recomment/>
    <card-list/>
    <card-footer />
    <!-- 反馈建议 -->
    <van-action-sheet id="all-message" @cancel="onCancel" v-model="feedback" title="留言列表">
      <div class="feedback">
        <van-cell-group>
          <h1 class="feedback-title" v-if="feedbacks.length > 0">反馈列表</h1>
          <van-pull-refresh v-model="msgRefreshing" @refresh="onMsgRefresh">
            <!-- <van-list v-model="msgLoading" :immediate-check="false" :finished="msgFinished" finished-text="没有更多了" @load="onMsgLoad"> -->
              <div ref="feedbackContent" id="feedback-content" class="feedback-list">
                <div class="meaasge-list" v-for="item in feedbacks" :key="item.id">
                    <div class="user-feedback">
                      <van-row>
                        <van-col span="4">
                          <van-image class="user-avatar" round width="2rem" height="2rem" :src="renPic"/>
                        </van-col>
                        <van-col span="16">
                          <p>{{item.userName || '游客留言'}}</p>
                          <p>{{item.createTime}}</p>
                          <p>{{item.comment}}</p>
                        </van-col>
                        <van-col span="4">
                          <p>
                            <van-icon @click="onPraiseUser(item)" size="18" :name="item.isAwesome === '1' ? msgPraiseIcon : msgNoPraiseIcon " /> <span>{{item.awesomeNum}}</span>
                          </p>
                        </van-col>
                      </van-row>
                    </div>
                    <div class="feedback-reply" v-if="item.listReplays.length > 0">
                      <van-row v-for="reply in item.listReplays" :key="reply.id">
                        <van-col span="3" offset="4">
                          <van-image class="our-avatar" round width="2rem" height="2rem" :src="renPic"/>
                        </van-col>
                        <van-col span="17">
                          <p>{{reply.userName}}</p>
                          <p>{{reply.createTime}}</p>
                          <p>{{reply.comment}}</p>
                        </van-col>
                        <!-- <van-col span="4">
                          <p>
                            <van-icon size="18" @click="onPraiseOur(reply)" :name="reply.isAwesome === '1' ? msgPraiseIcon : msgNoPraiseIcon "  /> <span>{{reply.awesomeNum}}</span>
                          </p>
                        </van-col> -->
                      </van-row>
                    </div>
                </div>
              </div>
            <!-- </van-list> -->
          </van-pull-refresh>
          <h1 class="feedback-title">反馈内容</h1>
          <van-field
            v-model="backMessage"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入您的反馈信息" /> 
        </van-cell-group>
        <van-cell-group>
          <h1 class="feedback-title">您的联系方式</h1>
          <van-field v-model="backPhone" placeholder="请输入联系方式" />
        </van-cell-group>
        <div class="login-btn">
            <van-button round block type="info" @click="onCommit" color="linear-gradient(to right, #2739c8, #f51e67)">
                提交反馈
            </van-button>
        </div>
      </div>
    </van-action-sheet>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
      cancel-text="取消"
      @cancel="onCancelShare"
    />
    <!-- 路由出口 -->
    <transition name="van-slide-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import * as userApi from 'api/user'
import Search from '../search/Search'
import RecommentSlider from '../slider/recomment-slider'
import Dashboard from '../dashboard/Dashboard'
import TopRecomment from '../slider/Top-recomment-slider'
import CardList from '../card/Card-list'
import CardFooter from '../card/Card-footer'
import { mapState, mapActions, mapGetters } from "vuex";
import * as type from "store/home/mutations_types";
import { Dialog, Toast } from 'vant'
import * as userType from 'store/user/mutations_types'
import * as homeApi from 'api/home'
export default {
  components:{
    Search,
    RecommentSlider,
    Dashboard,
    TopRecomment,
    CardList,
    CardFooter
  },
  data() {
    return {
      msgRefreshing: false,
      feedback: false,
      showShare: false,
      isLisk: false,
      isUserPraise: false,
      isCollection: false,
      msgLoading: false,
      msgFinished: false,
      likeNum: '',
      connectionNum: '',
      commentsNum: '',
      starIcon: require('common/image/home/hollow-collection.png'),
      likeIcon: require('common/image/home/hollow-heart.png'),
      msgPraiseIcon: require('common/image/home/solid-like.png'),
      msgNoPraiseIcon: require('common/image/home/hollow-like.png'),
      backMessage: '',
      backPhone: '',
      remarkIcon: require('common/image/home/hollow-message.png'),
      shareIcon : require('common/image/home/hollow-share.png'),
      renPic: require('common/image/home/ren.png'),
      shareOptions: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      prms: {
        resId: '1',
        resType: 3,
        resName: '应用'
      },
      feedbacks: [],
      msgbacks:'',
      pageNum: '1',
      pageSize: '500',
      total: '1',
    };
  },
  methods: {
    ...mapActions({
      logout: userType.LOGOUT
    }),
    async onLike(){
      let data = await userApi.isLike(this.prms)
      if(data && data.content && data.content.recordStatus){
        if(data.content.recordStatus === '0'){
          this.isLisk = false
          this.likeIcon = require('common/image/home/hollow-heart.png')
        } else if (data.content.recordStatus === '1') {
          this.isLisk = true
          this.likeIcon = require('common/image/home/solid-heart.png')
        }
      } else if (data.code === '0004') {
        console.log('未登录喜欢',data)
        Dialog.confirm({
          title: '退出提示',
          message: '登录过期，请先登录',
          beforeClose: this.beforeClose
        })
      }
      this.getLikeNumber()
    },
    beforeClose(action, done){
      if(action === 'confirm'){
          this.logout()
          this.$router.push({ name: 'login'})
          done()
      } else {
          done()
      }
    },
    onLiveMsg(){
      this.feedback = true
      this.remarkIcon = require('common/image/home/solid-message.png')
      // this.loadHeight()
    },
    async onCommit(){
      let params = {
        userMobile: this.backPhone,
        comment: this.backMessage,
        resId: '1',
        resType: 3
      }
      let data = await userApi.leaveMessage(params)
      if(data.code === '200') {
        Toast.success('评论成功')
        
        this.backPhone = '',
        this.backMessage = ''
        this.getCommentsNumber()
        this.getFeedbackList()
      } else if (data.code === '0004') {
        Dialog.confirm({
            title: '退出提示',
            message: '登录过期，请先登录',
            beforeClose: this.beforeClose
        })
      }
      this.remarkIcon = require('common/image/home/hollow-message.png')
    },
    onCancel(){
      this.feedback = false
      this.remarkIcon = require('common/image/home/hollow-message.png')
    },
    onSelect(option){
      Toast(option.name)
      this.showShare = false
      this.shareIcon = require('common/image/home/hollow-share.png')
    },
    onTransmit(){
      this.showShare = true
      this.shareIcon = require('common/image/home/solid-share.png')
    },
    onCancelShare(){
      this.shareIcon = require('common/image/home/hollow-share.png')
    },
    async onCollect(){
      let obj = {
        resId: '1',
        resType: '3',
      }
      let data = await userApi.isCollect(obj)
      if(data && data.content && data.content.recordStatus){
        if(data.content.recordStatus === '0'){
          this.isCollection = false
          this.starIcon = require('common/image/home/hollow-collection.png')
        }else if (data.content.recordStatus === '1') {
          this.isCollection = true
          this.starIcon = require('common/image/home/solid-collection.png')
        }
      } else if (data.code === '0004') {
        Dialog.confirm({
            title: '退出提示',
            message: '登录过期，请先登录',
            beforeClose: this.beforeClose
        })
      }
      this.getCollectionNumber()
    },
    async getLikeNumber() {
      let params = {resId: '1', resType: '3'}
      let data = await userApi.likeNumber(params)
      if (data && data.code === '200' && data.content) {
        this.likeNum = data.content.allnum
        if(data.content.recordStatus === '0'){
            this.isLisk = false
            this.likeIcon = require('common/image/home/hollow-heart.png')
          } else if (data.content.recordStatus === '1') {
            this.isLisk = true
            this.likeIcon = require('common/image/home/solid-heart.png')
          }
      }
    },
    async getCollectionNumber () {
      let params = {resId: '1', resType: '3'}
      let data = await userApi.collectionNumber(params)
      if(data && data.code === '200' && data.content) {
        this.connectionNum = data.content.allnum
        if(data.content.recordStatus === '0'){
          this.isCollection = true
          this.starIcon = require('common/image/home/hollow-collection.png')
        }else if (data.content.recordStatus === '1') {
          this.isCollection = false
          this.starIcon = require('common/image/home/solid-collection.png')
        }
      }

    },
    async getCommentsNumber () {
      let params = {resId: '1', resType: '3'}
      let data = await userApi.commentsNumber(params)
      if (data && data.code === '200' && data.content) {
        this.commentsNum = data.content.allnum
      }

    },
    async getFeedbackList () {
      let that = this
      let pageData = { pageNum: this.pageNum.toString(), pageSize: this.pageSize.toString() }
      let data = await homeApi.feedbackList(pageData)
      if(data.code === '200') {
        this.feedbacks = data.content.listx
        console.log('this.feedbacks',this.feedbacks)
        that.total = data.content.total
        that.msgRefreshing = false
        if (that.feedbacks.length >= that.total) {
          that.msgFinished = true
        }
      }
    },
    onMsgRefresh () {
      this.pageNum = '1'
      this.msgRefreshing = false
      this.getFeedbackList ()
    },
    //上拉加载
    async onMsgLoad () {
      console.log('上拉粗发')
      this.pageNum++
      let that = this
      let pageData = { pageSize: this.pageSize.toString(), pageNum: this.pageNum.toString() }
      let data = await homeApi.feedbackList(pageData)
      if (data.code === '200' && data.content.listx.length > 0) {
        that.msgbacks = data.content.listx
        that.total = data.content.total
        that.msgbacks.forEach( v => { that.feedbacks.push(v) })
        this.msgLoading = false
        if (this.feedbacks.length >= this.total) {
          this.msgFinished = true
        }
      }
    },
    loadHeight () {
      console.log('666')
      // let winHeight = document.documentElement.clientHeigh  
      let winHeight = this.$refs.feedbackContent.offsetHeight
      console.log('winHeight',winHeight)
      console.log('sd',document.getElementById('feedback-content'))
      document.getElementById('feedback-content').style.minHeight = (winHeight - 80) +'px'
    },
    async onPraiseUser (item) {
      console.log('给用户点赞',item)
      let msgObj = {
        resId: item.id,
        resType: '4'
      }
      let data = await userApi.isLike(msgObj)
      console.log('data',data)
      if(data.code === '200') {
        Toast.success('点赞成功')
        if (data.content && data.content.recordStatus && data.content.recordStatus === '1') {
          this.isUserPraise = true
          this.getFeedbackList()
        } else {
          this.isUserPraise = false
          this.getFeedbackList()
        }
      } else {
        Toast.fail('操作失败')
      }
    },
    onPraiseOur (reply) {
      console.log('给我们点赞', reply)
      let msgObj = {
        
      }
    }
  },
  mounted() {
    this.getLikeNumber()
    this.getCollectionNumber()
    this.getCommentsNumber()
    this.getFeedbackList()
  }
};
</script>
<style lang="stylus" scoped>
// @import "~common/stylus/variable";
// .sticky
//   background $color-background
.home
  margin-bottom 90px
.sider-nav
  width 60px
  height 175px
  // background red
  position fixed
  right 0
  top 300px
  z-index 1
.sider-nav .van-icon
  color #ff5a8c
  font-size 28px
  padding 5px 5px
.sider-nav .van-button
  background none
  border none
  padding 0 5px
.feedback
  padding: 16px 16px 16px;
.feedback .van-field
  height auto
.feedback .van-hairline--top-bottom::after, 
.feedback .van-hairline-unset--top-bottom::after
  border-width 0
.feedback-title
  padding-left 15px
.meaasge-list
  margin-top 15px
.feedback-list
  // background red
  max-height 300px
  overflow-y scroll
.user-avatar
  position relative
  left 20px
  top 5px
.our-avatar
  position relative
  top 5px
.user-feedback
  // background blue
.feedback-reply
  // background yellow
.user-feedback p, .feedback-reply p
  padding 5px 0
  font-size 12px
.user-feedback p span ,.feedback-reply p span
  font-size 14px
  position relative
  top -3px
</style>