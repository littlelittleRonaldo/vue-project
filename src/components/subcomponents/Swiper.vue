<template>
    <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in swiperList" :key="index">
                <img :src="item.img">
            </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props:['swiperList']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        text-align: center;
        .mint-swipe-item {
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
</style>
