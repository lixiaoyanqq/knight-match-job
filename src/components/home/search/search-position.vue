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
    <van-pull-refresh v-model="postRepreshing" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        v-model="postLoading"
        :immediate-check="false"
        :finished="postFinished"
        finished-text="没有更多了"
        @load="onPostLoad"
      >
        <div id="search-position">
          <div class="card-box" v-for="(cont, index) in positions" :key="index">
            <div class="card-content">
              <van-row>
                <van-col span="12">
                  <h1 class="card-left-up">
                    <span
                      @click="selectPos(cont.id)"
                    >{{cont.postName.length > 6 ? cont.postName.substring(0,6)+'...' : cont.postName}}</span>
                    <!-- <van-icon
                      @click="onLikePos(cont)"
                      color="#ff5a8c"
                      size="22"
                      :name="cont.isLike === '1' ? 'like' : 'like-o'"
                    /> -->
                  </h1>
                  <h2 class="card-left-down">
                    {{cont.postSalary}}
                    <span>k/月</span>
                  </h2>
                </van-col>
                <van-col span="12">
                  <h1 class="card-right-up">
                    <van-icon color="#a2b0b6" size="16" name="clock-o" />
                    <span>{{cont.reflushFmtTime}}</span>
                  </h1>
                  <h2 class="card-right-down">
                    HR
                    <span>{{cont.hrId || '-'}}</span>
                  </h2>
                </van-col>
              </van-row>
              <div class="divider"></div>
              <van-row>
                <van-col span="8">
                  <h1 class="card-down card-down-left">公司名称</h1>
                  <p class="card-p view-value">{{cont.entpName}}</p>
                </van-col>
                <van-col span="8">
                  <h1 class="card-down card-down-center">公司地址</h1>
                  <p class="card-p view-value">{{cont.city}}</p>
                </van-col>
                <van-col span="8">
                  <h1 class="card-down card-down-right">热度</h1>
                  <p class="card-p">{{cont.entpId}}</p>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
        <!-- <van-empty v-else description="描述文字" /> -->
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
      postRepreshing: false,
      postLoading: false,
      postFinished: false,
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
      positions: [],
      position: "",
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
      removeLocalStore("searchPKey");
      removeLocalStore("searchCKey");
      this.positions.length = 0;
    },
    async onSearch() {
      // let that = this
      if (this.searchKey === "") {
        Toast.fail("请输入关键字");
      } else {
        let cityObj = this.option.find(item => {
          return item.value === this.value;
        });
        setLocalStore("searchPKey", this.searchKey);
        setLocalStore("searchCKey", cityObj.text);
        this.positions = []
        this.getSearchList();
      }
    },
    selectPos(id) {
      this.$router.push({name: 'posDetail', query: {id: id}})
    },
    onRefresh() {
      this.pageNum = "1";
      this.postFinished = false;
      this.getSearchList();
    },
    async onPostLoad() {
      this.pageNum++;
      let that = this;
      let params = {
        pageNum: this.pageNum.toString(),
        pageSize: this.pageSize,
        queryInfo: getLocalStore("searchPKey"),
        city: getLocalStore("searchCKey")
      };
      let data = await homeApi.keySearchPosition(params);
      if (data.code === "200" && data.content.listx.length) {
        that.position = data.content.listx
        that.total = data.content.total
        that.position.forEach(item => that.positions.push(item));
        this.postLoading = false
        if (this.positions.length >= this.total) {
          this.postFinished = true
        }
      }
    },
    async getSearchList() {
      let that = this
      let params = {
        pageNum: this.pageNum.toString(),
        pageSize: this.pageSize,
        queryInfo: getLocalStore("searchPKey"),
        city: getLocalStore("searchCKey")
      };
      let data = await homeApi.keySearchPosition(params);
      if (data.code === "200") {
        if (data.content.listx.length === 0) {
          Toast.fail('搜索结果不理想哦，赶快完善一下简历，获取更多推荐！！！')
        } else {
          that.positions = data.content.listx;
          that.total = data.content.total;
          that.postRepreshing = false;
          if (that.positions.length >= that.total) {
            that.postFinished = true;
          }
        }
      }
    },
    init() {
      if (getLocalStore("searchPKey")) {
        this.getSearchList()
      }
      if (getLocalStore("searchCKey")) {
        let cityObj = this.option.find(item => {
          return item.text === getLocalStore("searchCKey")
        });
        this.value = cityObj.value
      }
    },
    loadHeight() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById("search-position").style.minHeight =
        winHeight - 800 + "px";
    }
  },
  mounted() {
    this.init()
    this.loadHeight()
  },
  watch: {
    $route(to) {
      this.reload();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"

.search-resume {
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background rgb(230, 233, 245)
  // background red
  z-index 999
  overflow-y scroll
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

.card-content .card-left-up {
  font-size: 16px;
  color: $color-text-b;
  line-height: 40px;
}

.card-content .card-left-up .van-icon {
  padding-left: 5px;
  font-size: 18px;
}

.card-content .card-left-down {
  color: #283ac8;
  font-size: 30px;
  font-weight: bolder;
}

.card-content .card-left-down span {
  font-size: 20px;
  padding-left: 5px;
}

.card-content .card-right-up {
  padding-top: 15px;
  color: #a2b0b6;
}

.card-content .card-right-up .van-icon {
  padding-right: 5px;
}

.card-content .card-right-up span {
  font-size: 16px;
  display: inline-block;
}

.card-content .card-right-down {
  color: #fe5a8c;
  padding-top 18px
}

.card-content .divider {
  width: 100%;
  height: 3px;
  background: #f0f3f8;
  margin: 10px auto;
}

.card-content .card-down {
  width: 80px;
  height: 24px;
  border-radius: 15px;
  text-align: center;
  line-height: 24px;
  margin: 0 auto;
  color: $color-text;
  font-size: 14px;
}

.card-content .card-p {
  color: #a9aeb2;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-top: 10px;
}

.card-content .card-down-left {
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#87a0ef), to(#b3bef3));
}

.card-content .card-down-center {
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f8729c), to(#fbccdd));
}

.card-content .card-down-right {
  width: 60px;
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#f0bc32), to(#fae7c2));
}

.view-value {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>