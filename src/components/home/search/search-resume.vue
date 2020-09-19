<template>
  <div class="search-resume">
    <van-sticky :offset-top="0" class="sticky">
      <section class="search-header">
        <van-row>
          <van-col span="2">
            <div class="search-icon">
              <van-icon @click="onLeft" :name="leftIcon" />
            </div>
          </van-col>
          <van-col span="4" class="city-menu">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value" :options="option" />
            </van-dropdown-menu>
          </van-col>
          <van-col span="18">
            <form action="/">
              <van-search
                v-model="searchKey"
                background="#e6e9f5"
                shape="round"
                left-icon
                show-action
                placeholder="搜索感谢兴趣的职位/公司"
              >
                <template #action>
                  <!-- <div @click="onSearch">搜索</div> -->
                  <van-icon @click="onSearch" size="22" :name="searchIcon" />
                </template>
              </van-search>
            </form>
          </van-col>
        </van-row>
      </section>
    </van-sticky>
    <van-pull-refresh v-model="resumRefreshing" @refresh="onRefresh">
      <van-list
        v-model="resumLoading"
        :immediate-check="false"
        :finished="resumFinished"
        finished-text="没有更多了"
        @load="onResumLoad"
      >
        <div id="resume-content">
          <div class="card-box" v-for="item in resumes" :key="item.cvId">
            <div class="card-content">
              <h1 class="objective-tit">
                <van-row>
                  <van-col span="24">
                    <span class="objective-label">求职意向：</span>
                    <span class="objective-text">{{item.expectPosts || '-'}}</span>
                  </van-col>
                  <!-- <van-col span="4">
                                        <van-button icon="clear" color="#ffffff" type="primary" size="mini"/>
                  </van-col>-->
                </van-row>
              </h1>
              <van-row>
                <!-- <van-col span="8">
                                    <van-image width="100" height="100" :src="renPic"/>
                </van-col>-->
                <van-col span="24">
                  <p class="applicant">
                    <span
                      class="applicant-name"
                      @click="onLikeResumeDetail(item)"
                    >{{item.name || '-'}}</span>
                    <span class="applicant-icon">
                      <van-icon :name="sexIcon" color="#07c160" />
                      {{item.gender || '-'}}
                    </span>
                    <span class="applicant-icon">
                      <van-icon :name="exopIcon" color="#07c160" />
                      {{item.degree || '-'}}
                    </span>
                    <span class="applicant-icon">
                      <van-icon :name="posiIcon" color="#07c160" />
                      {{item.expectCitys || '-'}}
                    </span>
                  </p>
                  <!-- <p class="applicant">
                                        <van-rate readonly v-model.trim="item.matchLevel" allow-half color="#ff5a8c" void-color="#ff5a8c" />
                                        <span class="applicant-rate">（推荐指数）</span>
                  </p>-->
                  <p class="applicant">
                    <van-tag color="#eff1fb" size="large">{{item.schoolName || '-'}}</van-tag>
                    <van-tag color="#eff1fb" size="large">{{item.major || '-'}}</van-tag>
                    <van-tag color="#eff1fb" size="large">{{item.expectSalary || '-'}}</van-tag>
                  </p>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import * as homeApi from "api/home";
import { Toast } from "vant";
import { setLocalStore, getLocalStore, removeLocalStore } from "utils/global";
export default {
  inject: ["reload"],
  data() {
    return {
      resumRefreshing: false,
      resumLoading: false,
      resumFinished: false,
      value: 0,
      searchKey: "",
      leftIcon: require("common/image/home/lefticon.png"),
      searchIcon: require("common/image/home/search.png"),
      exopIcon: require("common/image/home/exop.png"),
      posiIcon: require("common/image/home/position.png"),
      sexIcon: require("common/image/home/sex.png"),
      pageNum: "1",
      pageSize: "5",
      total: "1",
      resumes: [],
      resume: '',
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
  methods: {
    onLeft() {
      this.$router.back();
      removeLocalStore("searchRKey");
      removeLocalStore("searchCKey");
      this.resumes.length = 0;
    },
    async onSearch() {
      // let that = this
      if (this.searchKey === "") {
        Toast.fail("请输入关键字");
      } else {
        let cityObj = this.option.find(item => {
          return item.value === this.value;
        });
        setLocalStore("searchRKey", this.searchKey);
        setLocalStore("searchCKey", cityObj.text);
        this.getSearchList();
      }
    },
    onLikeResumeDetail(resume){
      this.$router.push({name: 'likeResumeDetail', query: {cvId: resume.cvId}})
    },
    onRefresh() {
      this.pageNum = "1";
      this.resumFinished = false;
      this.getSearchList();
    },
    async onResumLoad() {
        this.pageNum++
        let that = this
        let params = {
            'pageNum': this.pageNum.toString(),
            'pageSize': this.pageSize,
            'queryInfo': getLocalStore("searchRKey"),
            'city': getLocalStore("searchCKey")
        };
        let data = await homeApi.keySearchResume(params);
        if (data.code === "200" && data.content.listx.length) {
            that.resume = data.content.listx
            that.total = data.content.total
            that.resume.forEach( item => that.resumes.push(item) )
            this.resumLoading = false
            if (this.resumes.length >= this.total) {
                this.resumFinished = true;
            }
        }
    },
    async getSearchList() {
        let that = this
        let params = {
            'pageNum': this.pageNum.toString(),
            'pageSize': this.pageSize,
            'queryInfo': getLocalStore("searchRKey"),
            'city': getLocalStore("searchCKey")
        };
        let data = await homeApi.keySearchResume(params);
        if (data.code === "200") {
          if (data.content.listx.length === 0) {
            Toast.fail('搜索数据为空')
          } else {
            that.resumes = data.content.listx
            that.total = data.content.total
            that.resumRefreshing = false
            if (that.resumes.length >= that.total) {
                that.resumFinished = true;
            }
          }
          
        }
    },
    init() {
      if (getLocalStore("searchRKey")) {
        this.getSearchList();
      }
    },
    loadHeight() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById("resume-content").style.minHeight =
        winHeight - 80 + "px";
    }
  },
  mounted() {
    this.init();
    this.loadHeight();
  },
  watch: {
    $route(to) {
      this.reload();
    }
  }
};
</script>
<style lang="stylus" scoped>
.search-resume {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(230, 233, 245);
  z-index: 999;
  overflow-y: scroll;
}

.search-header {
  background: rgb(230, 233, 245);
}

.search-icon .van-icon {
  position: relative;
  top: 18px;
  left: 18px;
  font-size: 18px;
}

.van-search--show-action .van-icon {
  top: 5px;
}

.card-box {
  width: 90%;
  padding: 20px 0;
  background: #ffffff;
  margin: 10px auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card-content {
  width: 90%;
  margin: 0 auto;
}

// .card-content .card-left-up {
//   font-size: 16px;
//   color: $color-text-b;
//   line-height: 40px;
// }

// .card-content .card-left-up .van-icon {
//   padding-left: 5px;
//   font-size: 18px;
// }

// .card-content .card-left-down {
//   color: #283ac8;
//   font-size: 30px;
//   font-weight: bolder;
// }

// .card-content .card-left-down span {
//   font-size: 20px;
//   padding-left: 5px;
// }

// .card-content .card-right-up {
//   padding-top: 15px;
//   color: #a2b0b6;
// }

// .card-content .card-right-up .van-icon {
//   padding-right: 5px;
// }

// .card-content .card-right-up span {
//   font-size: 16px;
//   display: inline-block;
// }

// .card-content .card-right-down {
//   color: #fe5a8c;
//   line-height: 30px;
//   padding-top 18px
// }

// .card-content .divider {
//   width: 100%;
//   height: 3px;
//   background: #f0f3f8;
//   margin: 10px auto;
// }

// .card-content .card-down {
//   width: 80px;
//   height: 24px;
//   border-radius: 15px;
//   text-align: center;
//   line-height: 24px;
//   margin: 0 auto;
//   color: $color-text;
//   font-size: 14px;
// }

// .card-content .card-p {
//   color: #a9aeb2;
//   text-align: center;
//   line-height: 20px;
//   font-size: 14px;
//   margin-top: 10px;
// }

// .card-content .card-down-left {
//   background: -webkit-gradient(linear, 0 0, 100% 100%, from(#87a0ef), to(#b3bef3));
// }

// .card-content .card-down-center {
//   background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f8729c), to(#fbccdd));
// }

// .card-content .card-down-right {
//   width: 60px;
//   background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f0bc32), to(#fae7c2));
// }

.objective-tit {
  height: 44px;
  line-height: 44px;
  font-size: 18px;
  // margin-top 10px
}

.objective-label {
  color: #a9aeb2;
}

.objective-text {
  color: #000000;
}

.applicant {
  color: #a9aeb2;
  height: 34px;
  line-height: 34px;
}

.applicant-name {
  color: #000000;
  font-size: 18px;
}

.applicant-icon .van-icon {
  padding-right: 3px;
}

.applicant-rate {
  color: #000000;
}

.applicant .van-tag {
  color: #a9aeb2;
}

.objective-tit .van-button {
  paddingh-top: 30px;
}

.objective-tit .van-icon {
  color: #cbced1;
  font-size: 30px;
}

.view-value {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>