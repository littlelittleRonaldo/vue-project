<template>
    <div class="desc-box">
        <h3 v-text="desc.title"></h3>
        <hr>
        <p v-html="desc.content"></p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                desc:{}
            }
        },
        created() {
            this.getDesc();
        },
        methods:{
            getDesc() {
                this.$http.get('api/goods/getdesc/'+this.id).then(res => {
                    if (res.body.status === 0) {
                        this.desc = res.body.message[0]
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .desc-box {
        padding: 5px;
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        /deep/ p {
            margin-bottom: 0;
        }
       /deep/ img {
            width: 100%;
            display: block;
        }
    }
</style>
