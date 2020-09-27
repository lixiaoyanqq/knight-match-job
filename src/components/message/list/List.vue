<template>
    <div class="all-message">
        <van-tabs v-model="activeName">
            <van-tab title="投递信息" name="sendMsg">
                <div class="message-list" v-if="messages.length > 0">
                    <van-list>
                        <p v-for="msg in messages" :key="msg.id">
                            <van-row>
                                <van-col span="12">{{msg.mesTitle}}</van-col>
                                <van-col span="12">{{msg.createTime}}</van-col>
                            </van-row>
                            <van-row>
                                <span>{{msg.mesContent}}</span>
                            </van-row>
                        </p>
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
                console.log('this.messages',this.messages)
            }
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style lang="stylus" scoped>
.message-list
    width 90%
    margin 15px auto
    color #000000
.message-list p 
    line-height 24px
    font-size 14px
.message-list span 
    font-size 12px
    color #969799
</style>