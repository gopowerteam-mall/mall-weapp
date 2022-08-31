<template lang="pug">
PageContainer
    image(:src='assets.images.mine_bg' mode='widthFix')
</template>

<script setup lang="ts">
import { assets } from 'virtual:assets'
const router = useRouter()
</script>

<style lang="scss" scoped>
image {
    width: 100rpx;
}
</style>
