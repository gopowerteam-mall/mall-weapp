<template lang="pug">
PageContainer
    container.space-y-2
        fui-card(title='图片资源')
            image(:src='assets.images.mine_bg' mode='widthFix')
        fui-card(title='图片上传')
            button(@click='onUpload') upload
</template>

<script setup lang="ts">
import { assets } from 'virtual:assets'

const media = useMedia()
const uploader = useUploader()
const logger = useLogger()

/**
 * 上传文件
 */
function onUpload() {
    media.chooseMedia({ type: 'image' }).then(data => {
        const tasks = uploader.upload(data)
        tasks.forEach(x => {
            x.onComplete(a => logger.info(a))
        })
    })
}
</script>

<style lang="scss" scoped>
image {
    width: 100rpx;
}
</style>
