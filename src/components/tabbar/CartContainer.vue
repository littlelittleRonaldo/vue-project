<template>
    <div class="cart">
        <div class="mui-card" v-for="(item, index) in cartList" :key="index">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="selected[item.id]"
                    @change="selectedChanged(item.id,selected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="r-box">
                        <h3 v-text="item.title"></h3>
                        <div class="info">
                            <span class="price">￥{{ item.sell_price }}</span>
                           <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
                                <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                                <input class="mui-numbox-input" type="number" id="numbox"
                                @change="numChanged(quantity[item.id],item.id,index)" ref="numbox" 
                                :value="selfCount[item.id]" />
                                <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                            </div>
                            <mt-button type="danger" size="small" @click="remove(item.id,index)">删除</mt-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner calculate">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="selected">{{ totalPrice.count }}</span> 件， 总价 <span class="red">￥{{ totalPrice.total }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import mui from '../../assets/mui/js/mui.min.js'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                cartList: [],
                flag:false
            }
        },
        created() {
                this.getList()
        },
        updated() {
            mui('.mui-numbox').numbox()
        },
        methods:{
            numChanged(max,id,i) {
                if (this.$refs.numbox[i].value > max) {
                    this.$refs.numbox[i].value = max;
                }
                // mui('.mui-numbox:nth-of-type('+i+')').numbox().setOption('max',max)
                this.$store.commit('updateCount',{id:id,count:parseInt(this.$refs.numbox[i].value)})
            },
            getList() {
                var idArr = [];
                this.$store.state.cart.forEach(item => {
                    idArr.push(item.id)
                });
                if (idArr.length <= 0) return;
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(res => {
                    if (res.body.status === 0) {
                        this.cartList = res.body.message;
                    }else {
                        alert('获取购物车数据失败');
                    }
                })
            },
            remove(id,i) {
                this.cartList.splice(i,1);
                this.$store.commit('removeCart',id)
            },
            selectedChanged(id,val) {
                this.$store.commit('selectedChanged',{id,selected:val})
            }
        },
        computed:{
            ...mapGetters([
                'amount',
                'selfCount',
                'quantity',
                'selected',
                'totalPrice'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            align-items: center;
            img {
                width: 60px;
            }
            h3 {
                font-size: 14px;
            }
            .r-box {
                width: 100%;
                .info {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .price {
                        color: red;
                        font-weight: bold;
                    }
                    .mui-numbox {
                        height: 30px;
                    }
                }
            }
        }
        .calculate {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .selected {
            color: red;
            font-weight: bold;
            font-size: 16px;
            }
        }
    }
</style>
