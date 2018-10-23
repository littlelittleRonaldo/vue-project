<template>
    <div class="cmt">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">确认发表</mt-button>
        <ul class="cmt-list">
            <li v-for="(item,index) in comments" :key="index">
                <div class="head">
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </li>
        </ul>
        <mt-button type="danger" size="large" plain icon="more" @click="loadmore"></mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                pageIndex: 1,
                comments:[],
                msg:''
            }
        },
        created() {
            this.getComments()
        },
        methods:{
            getComments() {
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(res => {
                    if (res.body.status === 0) {
                        this.comments = this.comments.concat(res.body.message)
                    }else {
                        Toast('加载评论失败')
                    }
                })
            },
            loadmore() {
                this.pageIndex++;
                this.getComments();
            },
            postComments() {
                if (!this.msg.trim()) return Toast('评论内容不能为空')
                this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()})
                .then(res => {
                    if (res.body.status === 0) {
                        var cmt = {
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                        }
                        this.comments.unshift(cmt);
                        this.msg = '';
                    }
                })
            }
        },
        props:['id']
    }
</script>

<style lang="scss" scoped>
    .cmt {
        font-size: 18px;
        padding-bottom: 5px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        list-style: none;
        padding: 0;
        margin: 5px 0;
        font-size: 13px;
        .head {
            line-height: 30px;
            background-color: #ccc;
        }
        .body {
            line-height: 30px;
            text-indent: 2em;
        }
    }
</style>
