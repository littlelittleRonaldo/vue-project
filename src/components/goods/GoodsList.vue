<template>
        <mt-loadmore :autoFill='false' :top-method="loadTop" :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="加载更多">
            <ul class="goods-list">
                <li class="goods-item" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
                    <img :src="item.img_url" alt="">
                    <h3 class="title" v-text="item.title"></h3>
                    <div class="info">
                        <p class="price">
                            <span class="now">￥{{item.sell_price}}</span>
                            <span class="old">￥{{item.market_price}}</span>
                        </p>
                        <p class="sell">
                            <span>热卖中</span>
                            <span>剩{{item.stock_quantity}}件</span>
                        </p>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
</template>

<script>
    export default {
        data() {
            return {
                pageindex:1,
                list: [],
                allLoaded:false
            }
        },
        created() {
            this.getGoodslist()
        },
        methods:{
            getGoodslist() {
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(res => {
                    if (res.body.status !== 0) {
                        alert('获取商品列表失败');
                        return;
                    }
                    if (this.pageindex === 1) {
                        this.list = res.body.message;
                    } else {
                        if (res.body.message.length == 0) {
                            this.allLoaded = true;
                        }
                        this.list = this.list.concat(res.body.message);
                    }
                })
            },
            loadTop() {
                console.log('下拉');
                this.pageindex = 1;
                this.allLoaded = false;
                this.getGoodslist();
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom() {
                console.log('上拉');
                this.pageindex++;
                this.getGoodslist();
                this.$refs.loadmore.onBottomLoaded();
            },
            goDetail(id) {
                this.$router.push({name:'GoodsInfo',params:{id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
        .goods-list {
            list-style: none;
            margin: 0;
            padding: 7px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .goods-item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 49%;
                border: 1px solid #ccc;
                box-shadow: 0 0 7px #ccc;
                padding: 2px;
                margin: 4px 0;
                min-height: 293px;
                img {
                    width: 100%;
                }
                .title {
                    font-size: 14px;
                }
                .info {
                    background-color: #eee;
                    p {
                        margin: 0;
                        padding: 5px;
                    }
                    .price {
                        .now {
                            color: red;
                            font-weight: bold;
                            font-size: 16px;
                        }
                        .old {
                            color: #ccc;
                            text-decoration: line-through;
                            font-style: 13px;
                            margin-left: 7px;
                        }
                    }
                    .sell {
                        font-style: 15px;
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    
</style>
