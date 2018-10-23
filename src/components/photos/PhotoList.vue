<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" 
                    v-for="(item,index) in cates" :key="index"
                    @click="getList(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>
        <ul class="photolist">
            <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="desc">
                    <h5 class="desc-title">{{ item.title }}</h5>
                    <p class="desc-body">{{ item.zhaiyao }}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    import mui from '../../assets/mui/js/mui.min.js'
    export default {
        data() {
            return {
                cates: [],
                list:[]
            }
        },
        mounted() {
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            // mui('body').on('tap','a',function(){document.location.href=this.href;});
        },
        created() {
            this.getCates();
            this.getList(0);
        },
        methods:{
            getCates() {
                this.$http.get('api/getimgcategory').then(res => {
                    if (res.body.status === 0) {
                        res.body.message.unshift({ title:'全部', id:0 });
                        this.cates = res.body.message;
                    }else {
                        Toast('获取分类失败')
                    }
                })
            },
            getList(cateId) {
                this.$http.get('api/getimages/'+cateId).then(res => {
                    if (res.body.status === 0) {
                        this.list = res.body.message;
                    }else {
                        Toast('加载失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    * { 
        touch-action: pan-y; 
    }
    .photolist {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
            img {
            width: 100%;
            display: block;
            }
            /*图片懒加载样式 mint-ui提供*/
            img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
            .desc {
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                // max-height: 84px;
                .desc-title {
                    font-size: 14px;
                    color: burlywood;
                }
                .desc-body {
                    font-size: 13px;
                    color: palegoldenrod;
                }
            }
        }
    }
    
</style>
