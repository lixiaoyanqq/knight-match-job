<template>
  <div class="dashboard">
    <section class="dashboard-main">
      <van-row>
        <van-col span="10">
          <div class="list-header">
            <van-row>
              <van-col span="14">
                <span class="list-header-tit">{{baseInfo.userType === '0' ? '我的简历' : '我的公司'}}
                </span>
              </van-col>
              <van-col span="10">
                <van-button v-show="baseInfo.userType === '0'" type="primary" round size="mini" @click="onClickResume">完善简历</van-button>
                <van-button v-show="baseInfo.userType === '1'" type="primary" round size="mini" @click="onClickCompany">职位管理</van-button>
              </van-col>
            </van-row>
          </div>
          <div class="list-content">
            <van-cell-group>
              <van-cell :title="baseInfo.userType === '0' ? dashboard.seeNum || '0' : dashboard.postNum || '0'" :value="baseInfo.userType === '0' ? '被看' : '个职位'" :icon="lookIcon"/>
              <van-cell :title="baseInfo.userType === '0' ? dashboard.over || '0' : dashboard.deliverNum || '0'" :value="baseInfo.userType === '0' ? '超过' : '个投递'" :icon="moreIcon"/>
              <van-cell :title="baseInfo.userType === '0' ? typeNames.length || '0' : dashboard.favoriteNum || '0'" :value="baseInfo.userType === '0' ? '方面' : '想加入'" :icon="typeIcon"/>
            </van-cell-group>
          </div>
        </van-col>
        <van-col span="14">
          <van-row>
            <van-col :span="baseInfo.userType === '0' ? 24 : 12">
              <div class="ring-echart ring-echart-resume" v-show="baseInfo.userType === '0'">
                <van-circle
                  ref="ringEchartCompPerfection"
                  v-model="perfection"
                  size="50"
                  :speed="5000"
                  :color="gradientColor"
                  layer-color="#d1d2f3"
                  :stroke-width="130">
                  <template #default>
                    <div class="circle-default" style="margin-top:40px">
                      <p class="circle-number">{{dashboard.perfection}}%</p>
                      <p class="circle-text">简历完善度</p>
                    </div>
                  </template>
                </van-circle>
              </div>
              <div class="ring-echart ring-echart-comp" v-show="baseInfo.userType === '1'">
                <van-circle
                  ref="ringEchartCompEntry"
                  v-model="entryRate"
                  :speed="5000" 
                  :color="gradientColor"
                  layer-color="#d1d2f3"
                  :stroke-width="50">
                  <template #default>
                    <div class="circle-default">
                      <p class="circle-number">{{dashboard.entryRate}}%</p>
                      <p class="circle-text">入职率</p>
                    </div>
                  </template>
                </van-circle>
              </div>
            </van-col>
            <van-col :span="baseInfo.userType === '0' ? 0 : 12">
              <div class="ring-echart ring-echart-comp" v-show="baseInfo.userType === '1'">
                <van-circle
                  ref="ringEchartCompEnterView"
                  v-model="enterviewRate"
                  :speed="5000"
                  :color="gradientColor"
                  layer-color="#d1d2f3"
                  :stroke-width="50">
                  <template #default>
                    <div class="circle-default">
                      <p class="circle-number">{{dashboard.enterviewRate}}%</p>
                      <p class="circle-text">面试成功率</p>
                    </div>
                  </template>
                </van-circle>
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row>
        <!-- <van-col :span="baseInfo.userType === '0' ? 10 : 0">
          <div class>
            <div class="list-header" style="margin-top:20px">
              <van-row v-show="baseInfo.userType === '0'">
                <van-col span="12"><span class="list-header-tit">{{tit1}}</span></van-col>
              </van-row>
            </div>
            <div class="list-content" v-show="baseInfo.userType === '0'">
              <van-cell-group>
                <van-cell :title="dashboard && dashboard.reccompany || '0'" value="公司" :icon="companyIcon" />
              </van-cell-group>
            </div>
          </div>
        </van-col> -->
        <van-col span="24">
          <div class="bar-echart">
            <div v-if="baseInfo.userType === '0'">
              <bar-echart id="resume" width="100%" :tooltip="resumeTooltip" title="简历图谱" :typeValue="typeValue" :typeNames="typeNames"></bar-echart>
            </div>
            <div v-if="baseInfo.userType === '1'">
              <bar-echart id="company" width="100%" :tooltip="compTooltip" title="公司图谱" :typeValue="compTypeValues" :typeNames="compTypeName"></bar-echart>
            </div>
          </div>
        </van-col>
      </van-row>
    </section>
    <div class="divider"></div>
    <van-row>
        <van-col span="8">
            <div class="view-main">
                <h1>{{baseInfo.userType === '0' ? '薪酬范围' : '高度匹配'}}</h1>
                <van-slider disabled v-model="sliderBtn" bar-height="8px" class="slider-box0" active-color="-webkit-gradient(linear, 0 0, 100% 100%, from(#87a0ef), to(#b2bff3))">
                    <template #button>
                        <div class="custom-button">
                        {{ dashboard.focus }}
                        </div>
                    </template>
                </van-slider>
                <p class="view-value">{{baseInfo.userType === '0' ? myExpect.expectSalary || '-' : dashboard.salarys || '-'}}</p>
            </div>
        </van-col>
        <van-col span="8">
            <div class="view-main">
                <h1>{{baseInfo.userType === '0' ? '重点推荐' : '学历匹配'}}</h1>
                <van-slider disabled v-model="sliderBtn" bar-height="8px" class="slider-box1" active-color="-webkit-gradient(linear, 0 0, 100% 100%, from(#f86e98), to(#fbcadb))">
                    <template #button>
                        <div class="custom-button">
                        {{ dashboard.focus }}
                        </div>
                    </template>
                </van-slider>
                <p class="view-value">{{baseInfo.userType === '0' ? '5' : dashboard.edus || '-'}}</p>
            </div>
        </van-col>
        <van-col span="8">
            <div class="view-main">
                <h1>{{baseInfo.userType === '0' ? '喜爱城市' : '聚集城市'}}</h1>
                <van-slider disabled v-model="sliderBtn" bar-height="8px" class="slider-box2" active-color="-webkit-gradient(linear, 0 0, 100% 100%, from(#fae6c2), to(#ffefd6))">
                    <template #button>
                        <div class="custom-button">
                          {{dashboard.focus}}
                        </div>
                    </template>
                </van-slider>
                <p class="view-value">{{baseInfo.userType === '0' ? myExpect.expectCitys || '-' : dashboard.citys || '-'}}</p>
            </div>
        </van-col>
    </van-row>
    <transition name="van-slide-right">
        <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import * as dashboardApi from "api/home"
import BarEchart from "../echarts/Bar"
import * as homeUtil from "components/home/services/home"
import * as type from 'store/user/mutations_types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { getLocalStore } from 'utils/global'

export default {
  components: {
    BarEchart
  },
  data() {
    return {
      baseInfo: JSON.parse(getLocalStore('baseInfo')),
      tit1: "我的简历",
      tit2: "匹配公司",
      buttonTit: "完善简历",
      companyIcon: require("common/image/home/company.png"),
      lookIcon: require("common/image/home/looked.png"),
      moreIcon: require("common/image/home/more.png"),
      typeIcon: require("common/image/home/types.png"),
      myExpect: {},
      cartLoading: false,
      rate: 50,
      perfection: null,
      entryRate: null,
      enterviewRate: null,
      dashboard: {},
      resumeTooltip : ['数量', '占比'],
      compTooltip : ['投递', '预约面试'],
      typeNamesItem: [],
      sliderBtn: 50,
      typeNames: ["项目经历", "潜力", "求职目标", "教育", "工作经历", "基本信息"],
      compTypeName: ['技术岗','科研岗','市场岗','设计岗','销售岗','培训岗','运营岗'],
      typeValue: {
        'number': [10, 7, 8, 4, 9],
        'rate': [6, 5, 8, 7, 4, 5]
      },
      compTypeValues: {
        'number': [10, 7, 8, 4, 5, 4, 7],
        'rate': [6, 5, 8, 7, 4, 4, 6]
      },
      currentRate: 40,
      gradientColor: {
        "0%": "#2739c8",
        "100%": "#7c86e6"
      },
      postArray: []
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    }
  },
  methods: {
    async dashboardData(){
      // console.log('baseInfo',this.baseInfo)
      if(this.baseInfo.userType && this.baseInfo.userType === '0'){
        let data = await dashboardApi.getDashboard()
        // console.log('data',data)
        if(data && data.content){
          this.dashboard = data.content
          this.perfection = Number(data.content.perfection)
          this.extractResumeTerms()
          this.extractResume()
        }
        let expectData = await dashboardApi.getCity()
        if(expectData.code === '200'){
          this.myExpect = expectData.content
        }
          // console.log('expectData---',expectData)
        //个人接口数据
      } else if (this.baseInfo.userType && this.baseInfo.userType === '1'){
        //公司接口数据
        // console.log('企业的')
        let data =  await dashboardApi.getCompDashboard()
        if(data && data.content){
          // console.log('data',data)
          this.dashboard = data.content
          this.enterviewRate = Number(data.content.enterviewRate)
          this.entryRate = Number(data.content.entryRate)
          this.postArray = data.content.postArray
        }
        
        // console.log('企业的data', this.dashboard)
      }
    },
    extractResumeTerms(){
      if(this.dashboard && this.dashboard.myscores){
        this.typeNamesItem = homeUtil.transformTermtoArray(this.dashboard.myscores)
        this.typeNames = homeUtil.extractKey(this.typeNamesItem)
        // console.log('this.typeNames',this.typeNames)
      }
    },
    extractResume(){
      if(this.typeNames.length){
        this.typeValue.number = homeUtil.extractKeyArry(this.typeNames).val
        // console.log('this.typeValue',this.typeValue)
      }
    },
    onClickResume(){
      this.$router.push({
        name: 'resumeDetail'
      })
    },
    onClickCompany(){
      this.$router.push({
        name: 'positionManage'
      })
    },
    init(){
      this.$refs.ringEchartCompPerfection.$el.childNodes[0].setAttribute('viewBox', '-50, 0 1250 1150')
      this.$refs.ringEchartCompEntry.$el.childNodes[0].setAttribute('viewBox', '-50, 0 1150 1150')
      this.$refs.ringEchartCompEnterView.$el.childNodes[0].setAttribute('viewBox', '-50, 0 1150 1150')
    }
  },
  mounted(){
    this.init()
  },
  created(){
    this.dashboardData()
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.dashboard
  width 90%;
  height auto;
  background #ffffff
  margin 10px auto
  border-radius 30px
  border-top-right-radius 100px
  // card-shadow()
  padding-bottom 25px
.dashboard-main
  padding 30px 10px
.list-header
  line-height 24px;
  padding-left 15px;
  color $color-text-b
.list-header .list-header-tit
  font-size 16px
  color #9ba8ae
  font-weight bolder
.list-content
  padding-top 10px
.list-content .van-cell__value
  font-size 12px
.list-content .van-cell__title
  font-size 16px
.list-content
  border-left: 2px solid #c6cef2
.divider
    width 90%
    height 3px
    background #f0f3f8
    margin 0 auto
.custom-button
    width 26px
    color #fff
    font-size 10px
    line-height 18px
    text-align center
    background-color #6976e0
    border-radius: 100px
    display none
.view-main
    margin 10px auto
    width 80%
    text-align center
.view-main h1
    color #476674
    line-height 34px
    font-size 18px
    font-weight bolder
.view-main p
    color $color-text-b
    line-height 16px
    font-size 15px
    margin-top 16px
.ring-echart-resume
  margin-left 30px
  margin-top 10px
.ring-echart-comp
  margin-top 20px
.circle-default
  margin-top 28px
.circle-default .circle-number
  color #283ac8
  font-size 20px
  font-weight bolder
.circle-default .circle-text
  color #c3cbce
  font-size 14px
.view-value
  display -webkit-box
  overflow hidden
  -webkit-line-clamp 2
  text-overflow ellipsis
  -webkit-box-orient vertical
.van-cell
  padding 6px 6px 6px 16px
.van-cell::after
  border none
.list-content .van-cell .van-cell__title
// .list-content .van-cell .van-cell__value
  font-size 20px
</style>