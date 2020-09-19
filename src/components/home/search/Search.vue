<template>
  <div class="search">
    <van-row>
      <van-col span="4" class="city-menu">
        <van-dropdown-menu>
          <van-dropdown-item @change="onChangeCity" v-model="value" :options="option" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="20">
        <form action="/">
          <van-search
            v-model="searchKey"
            background="#e6e9f5"
            shape="round"
            left-icon
            :right-icon="searchIcon"
            @focus="onFocus"
            placeholder="搜索感谢兴趣的职位/公司"
          ></van-search>
        </form>
      </van-col>
    </van-row>
    <!-- 路由出口 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { setLocalStore, getLocalStore, removeLocalStore } from "utils/global";
export default {
  data() {
    return {
      userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
      overlay: false,
      value: 0,
      searchKey: "",
      searchIcon: require("common/image/home/search.png"),
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
      // city(state) {
      //   return state.home.homes.city;
      // }
    })
  },
  methods: {
    ...mapActions({
      // getCity: type.FETCH_CITY
    }),
    async listCity() {
      // this.getCity();
    },
    onFocus() {
      // console.log('获取焦点')
      if (this.userInfo.userType === "0") {
        this.$router.push({ name: "searchPosition" });
      }
      if (this.userInfo.userType === "1") {
        this.$router.push({ name: "searchResume" });
      }
    },
    onChangeCity(value) {
      let cityObj = this.option.find(item => {
        return item.value === this.value;
      });
      setLocalStore("searchCKey", cityObj.text);
    },
    onClose(value) {
      // console.log("value", value);
    }
  },
  mounted() {
    // this.listCity();
  }
};
</script>
<style lang="stylus" scoped></style>