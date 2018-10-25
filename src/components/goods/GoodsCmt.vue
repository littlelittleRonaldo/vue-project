<template>
    <cmtbox :id="$route.params.id"></cmtbox>
</template>

<script>
    import Comments from '@/components/subcomponents/Comments'
    export default {
        components:{
            cmtbox:Comments
        }
    }
</script>

<style lang="scss" scoped>

</style>
