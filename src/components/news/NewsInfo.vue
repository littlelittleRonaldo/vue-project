<template>
    <div class="newsInfo">
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
            <span>点击次数：{{ newsInfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>
        <comments :id="id"></comments>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import Comments from '@/components/subcomponents/Comments'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsInfo:{}
            }
        },
        created() {
            this.getNewsinfo()
        },
        methods:{
            getNewsinfo() {
                this.$http.get('api/getnew/'+this.id).then(res => {
                    if(res.body.status === 0) {
                        this.newsInfo = res.body.message[0]
                    }else {
                        Toast('获取数据失败')
                    }
                })
            }
        },
        components:{
            comments:Comments
        }
    }
</script>

<style lang="scss">
    .newsInfo {
        padding: 0 5px;
        .title {
            font-size: 18px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>
