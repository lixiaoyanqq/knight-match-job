<template>
    <div class="card-footer">
        <div class="card-footer-box">
            <van-image :src="footerLogo" />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            footerLogo: require('common/image/home/comp-logo.png')
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin";
@import "~common/stylus/variable";
.card-footer
    width 90%
    height 140px
    margin 0 auto
    border-radius 10px
</style>