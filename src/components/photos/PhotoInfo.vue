<template>
    <div class="photo-container">
        <h3 v-text="photoinfo.title"></h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击次数：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <div class="thumbs">
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" 
            @click="$preview.open(index, list)" :key="index"> -->
            <vue-preview :slides="list"></vue-preview>
        </div>
        <div class="content" v-html="photoinfo.content"></div>

        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import Comments from "@/components/subcomponents/Comments";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list:[]
    };
  },
  components: {
    "comment-box": Comments
  },
  created() {
    this.getphotoInfo();
    this.getThumbs();
  },
  methods: {
    getphotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getThumbs() {
        this.$http.get('api/getthumimages/'+this.id).then(res => {
            if (res.body.status === 0) {
                res.body.message.forEach(item => {
                    item.w = 400;
                    item.h = 400;
                    item.msrc = item.src
                });
                this.list = res.body.message;
                console.log(this.list);
            } else {
                Toast("获取缩略图失败");
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
    .photo-container {
        padding: 3px;
        h3 {
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content {
        font-size: 13px;
        line-height: 30px;
        text-indent: 2em;
    }
    
    .thumbs {
        img {

        }
    }
}
</style>
