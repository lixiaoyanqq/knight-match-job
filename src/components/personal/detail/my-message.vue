<template>
    <div class="my-meaasge">
        <van-nav-bar title="我的消息"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:4rem" >
            <template #left>
                <van-icon :name="leftIcon" size="20" />
            </template>
        </van-nav-bar>
        <section class="msg-tabs">
            <van-tabs v-model="activeName">
                <van-tab title="投递信息" name="sendMsg">
                    <div v-if="sendMsgs.length > 0">

                    </div>
                    <van-empty v-else description="暂时还没投递信息哦" />
                </van-tab>
                <van-tab title="新人推荐" name="newBody">
                    <div v-if="news.length > 0">

                    </div>
                    <van-empty v-else description="暂时还没新人推荐哦" />
                </van-tab>
                <van-tab title="活动提醒" name="activitiesRemind">
                    <div v-if="activities.length > 0">

                    </div>
                    <van-empty v-else description="暂时还没新活动哦" />
                </van-tab>
            </van-tabs>
        </section>
    </div>
</template>
<script>
export default {
    data () {
        return {
            leftIcon: require("common/image/home/lefticon.png"),
            activeName: 'sendMsg',
            sendMsgs: [],
            news: [],
            activities: []
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
.my-meaasge
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.msg-tabs
    margin-top 4rem
</style>