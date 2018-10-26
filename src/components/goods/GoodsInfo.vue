<template>
    <div class="goodsinfo">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swiperList="swiperList"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header" v-text="goodsInfo.title"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        市场价：<del class="old">￥{{goodsInfo.market_price}}</del>
                        销售价：<span class="new">￥{{goodsInfo.sell_price}}</span>
                    </div>
                    <div class="num">
                        购买数量：
                        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
                            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                            <input class="mui-numbox-input" type="number" @change="numChanged(goodsInfo.stock_quantity)" ref="numbox" />
                            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                        </div>
                    </div>
                    <div class="buy">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button class="btn" type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getCmt(id)">商品评论</mt-button>
            </div>
        </div>
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="flag" ref="ball"></div>
        </transition>
    </div>
</template>

<script>
    import Swiper from '@/components/subcomponents/Swiper'
    import mui from '../../assets/mui/js/mui.min.js'
    
    export default {
        data() {
            return {
                id: this.$route.params.id,
                swiperList:[],
                goodsInfo:{},
                flag:false
            }
        },
        created() {
            this.getLunbo();
            this.getGoodsInfo();
        },
        methods:{
            getLunbo() {
                this.$http.get('api/getthumimages/'+this.id).then(res => {
                    if (res.body.status === 0) {
                        res.body.message.forEach(item => {
                            item.img = item.src
                        });
                        this.swiperList = res.body.message
                    }else {
                        alert('获取轮播图数据失败')
                    }
                })
            },
            getGoodsInfo() {
                this.$http.get('api/goods/getinfo/'+this.id).then(res => {
                    if (res.body.status === 0) {
                        this.goodsInfo = res.body.message[0];
                        mui('.mui-numbox').numbox().setOption('max',this.goodsInfo.stock_quantity)
                    }else {
                        alert('获取商品信息失败')
                    }
                })
            },
            getDesc(id) {
                this.$router.push({name:'GoodsDesc',params:{id}})
            },
            getCmt(id) {
                this.$router.push({name:'GoodsCmt',params:{id}})
            },
            beforeEnter(el) {
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done) {
                el.offsetWidth;
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const cartPosition = document.getElementById('cart').getBoundingClientRect();
                const distX = cartPosition.left - ballPosition.left;
                const distY = cartPosition.top - ballPosition.top;
                el.style.transform = `translate(${distX}px,${distY}px)`
                el.style.transition = 'all .7s cubic-bezier(.4,-0.3,1,.68)'
                done()
            },
            afterEnter() {
                this.flag=!this.flag
            },
            numChanged(max) {
                if (this.$refs.numbox.value > max) {
                    this.$refs.numbox.value = max
                }
                console.log(this.$refs.numbox.value);
            },
            addCart() {
                this.flag=!this.flag;
                var cartInfo = {
                    id:parseInt(this.id),
                    count:parseInt(this.$refs.numbox.value),
                    price:this.goodsInfo.sell_price,
                    max:parseInt(this.goodsInfo.stock_quantity),
                    selected:true
                }
                this.$store.commit('addCart',cartInfo)
            }
        },
        components:{
            swiper:Swiper
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo {
        background-color: #eee;
        overflow: hidden;
        position: relative;
        .price,p {
            color: #8f8f94;
            font-size: 14px;
            .old {
                font-size: 13px;
            }
            .new {
                color: red;
                font-size: 15px;
            }
        }
        .num {
            margin: 10px 0;
            z-index: 55;
        }
        .mui-card-footer {
            display: block;
            .btn {
                margin-bottom: 15px;
            }
        }
        .ball {
            position: absolute;
            top: 352px;
            left: 152px;
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            z-index: 999;
        }
    }
</style>
