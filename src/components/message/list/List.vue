<template>
    <div>
        <van-tabs v-model="activeName">
            <van-tab title="投递信息" name="sendMsg">
                <div class="message-list" v-if="messages.length > 0">
                    <van-list>
                        <van-cell 
                            v-for="msg in messages" 
                            :key="msg.id" 
                            :title="msg.mesTitle" 
                            :value="msg.mesContent" />
                    </van-list>
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
    </div>
</template>
<script>
import { getLocalStore } from "utils/global"
import * as msgApi from 'api/message'
export default {
    data () {
        return {
            userInfo: JSON.parse(getLocalStore("baseInfo")) || { userStatus: "0" },
            loading: false,
            activeName: 'sendMsg',
            messages: [],
            sendMsgs: [],
            news: [],
            activities: []
        }
    },
    methods: {
        async initData(){
            let data = await msgApi.getMessages(this.userInfo.userType)
            if (data.code === '200') {
                this.messages = data.content.listx
            }
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
.message-list .van-list .van-cell
    background rgba(0,0,0,0)
    padding 10px 35px
</style>