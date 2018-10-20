<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in swipperList" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/newslist">
                    <img src="../../assets/images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="#">
                    <img src="../../assets/images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="#">
                    <img src="../../assets/images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="#">
                    <img src="../../assets/images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="#">
                    <img src="../../assets/images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="#">
                    <img src="../../assets/images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      swipperList: []
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getlunbo").then(res => {
        // console.log(res.body.message);
        if (res.body.status === 0) {
          this.swipperList = res.body.message;
          Toast({
            message: "操作成功",
            iconClass: "mui-icon mui-icon-checkmarkempty"
          });
        } else {
          Toast({
            message: "操作失败",
            iconClass: "mui-icon mui-icon-closeempty"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            img {
            width: 100%;
            height: 100%;
            }
        }
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        .mui-table-view-cell {
            border: 0;
        }
        img {
            width: 60px;
            height: 60px;
        }
        .mui-media-body {
            font-size: 13px;
        }
    }
</style>
