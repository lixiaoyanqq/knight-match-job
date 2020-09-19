<template>
    <div class="m-header" v-show="isLogin">
        <van-nav-bar 
        :title="title"
        left-text="返回"
        right-text="个人中心"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"></van-nav-bar>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data () {
        return {
          isLogin: true,
          title: this.$route.name
        }
    },
    methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  },
}
</script>
<style lang="stylus" scoped>

</style>