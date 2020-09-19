<template>
    <div class="resume-collection">
        <van-nav-bar title="收藏的简历"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        }
    }
}
</script>
<style lang="stylus" scoped>
.resume-collection
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
</style>