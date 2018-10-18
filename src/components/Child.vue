<template>
    <div>
        <h1> {{ msg }} </h1>
        <button type="button" class="mui-btn mui-btn-success">绿色</button>
        <mt-popup v-model="popupVisible" position="right">右侧弹出</mt-popup>
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <mt-button icon="more" type="default" @click="popupVisible = true">更多</mt-button>
            </mt-swipe-item>
            <mt-swipe-item>
                <mt-button type="primary" @click="toast">primary</mt-button>
            </mt-swipe-item>
            <mt-swipe-item>
                <mt-button type="danger" @click="indicator">danger</mt-button>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  name: "Child",
  data() {
    return {
      msg: "web前端19期",
      popupVisible:false
    };
  },
  methods: {
    toast() {
      Toast({
        message: "提示",
        position: "bottom",
        duration: 5000
      });
    },
    indicator() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(function(){
          Indicator.close();
      },700)
    }
  }
};
</script>

<style scoped>
div {
  color: chartreuse;
  background-color: slateblue;
  height: 200px;
}
</style>
