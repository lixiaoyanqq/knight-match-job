<template>
  <div class="personal">
    <div class="personal-header">
      <div
        v-show="userInfo.userType === '0'" class="personal-account" @click="goPage('userCenter')">
        <van-row>
          <van-col span="8">
            <div class="head-portrait">
              <img :src="userHead" />
            </div>
          </van-col>
          <van-col span="14">
            <p class="user-name">{{userBaseInfo.nickName || randomNickname}}</p>
          </van-col>
          <van-col span="2">
            <span class="right-icon">
              <van-icon :name="rightIconW" />
            </span>
          </van-col>
        </van-row>
      </div>
      <div
        v-show="userInfo.userType === '1'"
        class="personal-account"
        @click="goPage('userCenter')"
      >
        <van-row>
          <van-col span="8">
            <div class="head-portrait">
              <img :src="userHead" />
            </div>
          </van-col>
          <van-col span="14">
            <p class="company-name">{{userBaseInfo.nickName || '我的名字'}}</p>
            <!-- <p class="postion-name">我的职位</p> -->
          </van-col>
          <van-col span="2">
            <span class="right-icon">
              <van-icon :name="rightIconW" />
            </span>
          </van-col>
        </van-row>
      </div>
      <div class="personal-message">
        <van-row>
          <van-col offset="1" span="5">
            <div class="notice-box">
              <p class="number" @click="onDelivery">
                <van-icon size="20" name="cluster-o" :badge="delivery.icount" />
              </p>
              <p class="type">{{userInfo.userType === '0' ? '已投递' : '投递'}}</p>
            </div>
          </van-col>
          <van-col span="1">
            <div class="divider"></div>
          </van-col>
          <van-col span="5">
            <div class="notice-box">
              <p class="number" @click="onView">
                <van-icon size="20" :badge="view.icount" name="browsing-history-o" />
              </p>
              <p class="type">{{userInfo.userType === '0' ? '被查看' : '查看'}}</p>
            </div>
          </van-col>
          <van-col span="1">
            <div class="divider"></div>
          </van-col>
          <van-col span="5">
            <div class="notice-box">
              <p class="number" @click="onInterview">
                <van-icon size="20" :badge="interview.icount" name="smile-comment-o" />
              </p>
              <p class="type">{{userInfo.userType === '0' ? '被邀约' : '邀约面试'}}</p>
            </div>
          </van-col>
          <van-col span="1">
            <div class="divider"></div>
          </van-col>
          <van-col span="5">
            <div class="notice-box">
              <p class="number" @click="onNotfit">
                <van-icon size="20" :badge="notfit.icount" name="closed-eye" />
              </p>
              <p class="type">不合适</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="personal-operation">
      <div v-show="userInfo.userType === '0'" class="operation-list">
        <van-cell title="我的职位收藏" @click="positionCollect()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="附件简历" @click="uploadResume()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="在线简历" @click="onLineResume()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="问题反馈" @click="problemFeedback()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="系统设置" @click="setUp()">
          <van-icon :name="rightIconR" />
        </van-cell>
      </div>
      <div v-show="userInfo.userType === '1'" class="operation-list">
        <van-cell title="我的公司" @click="myConpany()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="职位发布" @click="releaseJob()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="我的消息" @click="myMessage()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="简历收藏" @click="resumeCollect()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="建议反馈" @click="problemFeedback()">
          <van-icon :name="rightIconR" />
        </van-cell>
        <van-cell title="设置" @click="setUp()">
          <van-icon :name="rightIconR" />
        </van-cell>
      </div>
    </div>
    <!-- 路由出口 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- 上传简历 -->
    <van-action-sheet @cancel="onCancel" v-model="feedback" title="上传简历">
      <div class="upResume">
        <van-notice-bar
          wrapable
          :scrollable="false"
          text="您上传的附件简历，成功解析后会与您的在线简历合并并展现在在您的在线简历中"
        />
        <div class="login-btn">
            <van-uploader
                :accept="accept"
                :after-read="onAfter">
                <van-button round block type="info" size="small" color="linear-gradient(to right, #2739c8, #f51e67)">上传附件简历</van-button>
            </van-uploader>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import * as userApi from 'api/user'
import * as compApi from "api/company"
import { getLocalStore } from "utils/global"
import { Toast } from 'vant'
import { BASE_URL } from 'api/config'
export default {
  inject: ['reload'],
  data() {
    return {
      feedback: false,
      accept:'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      randomNickname: "我的名字",
      deliveryIcon: require("common/image/position/delivery.png"),
      userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
      userBaseInfo: '',
      userHead: '',
      rightIconW: require("common/image/personal/right-w.png"),
      rightIconR: require("common/image/personal/right-r.png"),
      myPanel: [],
      delivery: "",
      view: "",
      interview: "",
      notfit: "",
      nameLength: 5
    };
  },
  computed: {},
  methods: {
    goPage(name) {
      this.$router.push({ name });
    },
    releaseJob() {
      this.$router.push({ name: "openPosition" });
    },
    myMessage() {
      this.$router.push({ name: "myMessage" });
    },
    resumeCollect() {
      this.$router.push({ name: "resume" });
    },
    myConpany() {
      this.$router.push({ name: "myCompany" });
    },
    problemFeedback() {
      this.$router.push({ name: "problemFeedback" });
    },
    setUp() {
      this.$router.push({ name: "setUp" });
    },
    positionCollect() {
      this.$router.push({ name: "position" });
    },
    uploadResume() {
      // this.$router.push({ name: "uploadResume" });
      this.feedback = true
    },
    onBefore (file) {
        console.log('上传前', file)
    },
    async onAfter (file) {
        let resume = new FormData()
        resume.append('file', file.file)
        // console.log('resume',resume.get('file'))
        let data = await userApi.uploadResumeFile(resume)
        if (data.code === '200') {
          Toast.success(data.content)
          this.feedback = false
        }
    },
    onCancel () {
      this.feedback = false
    },
    onDelivery() {
      this.$router.push({
        name: "delivery",
        query: { recruitStatus: this.delivery.recruitStatus }
      });
    },
    onView() {
      this.$router.push({
        name: "view",
        query: { recruitStatus: this.view.recruitStatus }
      });
    },
    onInterview() {
      this.$router.push({
        name: "interview",
        query: { recruitStatus: this.interview.recruitStatus }
      });
    },
    onNotfit() {
      this.$router.push({
        name: "notfit",
        query: { recruitStatus: this.notfit.recruitStatus }
      });
    },
    onLineResume() {
      this.$router.push({ name: "resumeDetail" });
    },
    async init() {
      if (this.userInfo.userType === "0") {
        //个人初始化
        // console.log("个人初始化");
        let data = await compApi.countRecruitStatus();
        if (data.msg === "OK") {
          data.content.map((item, index) => {
            if (item.recruitStatus === "0") {
              this.delivery = item;
              this.delivery = Object.assign({}, this.delivery);
            } else if (item.recruitStatus === "1") {
              this.view = item;
            } else if (item.recruitStatus === "2") {
              this.interview = item;
            } else if (item.recruitStatus === "4") {
              this.notfit = item;
            }
          });
        }
      } else if (this.userInfo.userType === "1") {
        //公司初始化
        // console.log("公司初始化");
        let data = await compApi.countRecruitStatus();
        if (data.msg === "OK") {
          data.content.map((item, index) => {
            if (item.recruitStatus === "0") {
              this.delivery = item;
              this.delivery = Object.assign({}, this.delivery);
            } else if (item.recruitStatus === "1") {
              this.view = item;
            } else if (item.recruitStatus === "2") {
              this.interview = item;
            } else if (item.recruitStatus === "4") {
              this.notfit = item;
            }
          });
        }
      }
    },
    // 获取指定范围内的随机数
    // randomAccess(min, max) {
    //   return Math.floor(Math.random() * (min - max) + max)
    // },
    // 解码
    // decodeUnicode (str) {
    //     //Unicode显示方式是\u4e00
    //     str = "\\u"+str
    //     str = str.replace(/\\/g, "%")
    //     // 转换中文
    //     str = unescape(str)
    //     //将其他受影响的转换回原来
    //     str = str.replace(/%/g, "\\")
    //     return str
    // },
    //要获取的名字长度
    // getRandomName (NameLength) {
    //     for(let i = 0;i<NameLength;i++){
    //         let unicodeNum  = ""
    //         unicodeNum = this.randomAccess(0x4e00,0x9fa5).toString(16)
    //         this.randomNickname += this.decodeUnicode(unicodeNum)
    //     }
    // },
    async getUserBaseInfo () {
      let data = await userApi.fetchUserBaseInfo()
      if (data.code === '200') {
        this.userBaseInfo = data.content
        this.userBaseInfo.profilePicture ? this.userHead = `${BASE_URL}${this.userBaseInfo.profilePicture}` : 
        this.userHead = require("common/image/home/default-avatar.jpeg")
      }
    }
  },
  mounted() {
    this.init();
    this.getUserBaseInfo()
    // this.getRandomName(this.nameLength)
    // console.log('this.userInfo',this.userInfo)
  },
  watch: {
    $route (to) {
        this.reload()
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.personal {
  width: 100%;
  height: 100%;
  color: #fff;
}

.personal-header
  width 100%
  height auto
  background url('~common/image/personal/personal-logo.png') 100% 100% no-repeat
  background-size cover
  border-bottom-right-radius 30px
  border-bottom-left-radius 30px
  border-top 1px solid darkblue
.personal-account {
  width: 80%;
  height: 60px;
  margin: 0 auto;
  margin-top: 10px;
}

.head-portrait {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
}

.head-portrait img {
  width: 100%;
  height: 100%;
}

.user-name, .right-icon {
  line-height: 60px;
}

.personal-message {
  width: 90%;
  height 60px
  padding 10px 0 40px 0
  margin: 10px auto;
}

.notice-box {
  text-align: center;
}

.notice-box p {
  line-height: 30px;
  font-size: 14px;
}

.notice-box .number {
  font-size: 20px;
}

.divider {
  width: 2px;
  height: 50px;
  margin: 5px auto;
  background: #e9e7e7;
}

.operation-list {
  width: 90%;
  margin: 30px auto;
}

.operation-list .van-cell
  background: none;
  // border-bottom: 1px solid #dcdcdc;
  margin-bottom 3px
.operation-list .van-cell::after
  border-bottom 2px solid #dcdcdc
.operation-list .van-cell .van-cell__value .van-icon
  font-size 18px
.operation-list .van-cell .van-cell__title
  color $color-text-b

/* 转场动画 */
.router-slider-enter-active, .router-slider-leave-active
  transition all 0.3s

.router-slider-enter, .router-slider-leave-active
  transform translate3d(2rem, 0, 0)
  opacity 0

.company-name, .postion-name
  padding-top 20px
</style>