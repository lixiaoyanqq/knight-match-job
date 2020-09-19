<template>
    <div class="upload-resume">
        <van-nav-bar title="简历管理"
                 fixed
                 :border='false'
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
        <section class="resume-attach-list">
            <div class="resume-attach-header">
                <van-row>
                    <van-col span="16">
                        <h1>
                            附件简历列表
                        </h1>
                    </van-col>
                    <van-col span="8">
                        <van-uploader
                            :accept="accept"
                            :after-read="onAfter">
                            <van-button icon="plus" size="small" type="primary">上传附件简历</van-button>
                        </van-uploader>
                    </van-col>
                </van-row>
            </div>
        </section>
    </div>
</template>
<script>
import * as userApi from 'api/user'
export default {
    data () {
        return {
            
        }
    },
    methods: {
        onClickLeft(){
            this.$router.back()
        },
        onBefore (file) {
            // console.log('上传前', file)
        },
        onAfter (file) {
            // let resume = new FormData()
            // resume.append('file', file.file)
            // console.log('resume',resume.get('file'))
            // let data = await userApi.uploadResumeFile(resume)
            // console.log('上传简历+++', data)
        },
        onCancel () {

        }
    }
}
</script>
<style lang="stylus" scoped>
.upload-resume
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
    overflow-y scroll
.resume-attach-list
    margin-top 3.5rem
    width 100%
    height auto
    padding 15px 0
    color #000000
.resume-attach-header h1
    line-height 30px
    font-size 18px
    padding-left 15px
</style>