<template>
    <div>
        {{msg}}
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name:'Test',
        data() {
            return {
                msg: '黑马程序员'
            }
        }
    }
    export var a = '测试';
</script>
<style scoped>
    div {
        font-style: italic;
    }
</style>
