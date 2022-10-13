<template lang="pug">
PageContainer
  container.space-y-2
    fui-card(title='图片资源')
      image(:src='assets.images.mine_bg' mode='widthFix')
    fui-card(title='图片上传')
      button(@click='onUpload') upload
    fui-card(title='画廊')
      MediaGallery(v-model='photos')
</template>

<script setup lang="ts">
import { MediaType } from '@/config/enum.config'
import { assets } from 'virtual:assets'

const media = useMedia()

const logger = useLogger()

const photos = ref<string[]>([])

/**
 * 上传文件
 */
function onUpload() {
  const uploader = useUploader()

  media.chooseMedia({ type: MediaType.image }).then((data) => {
    const tasks = uploader.upload(data)
    tasks.forEach((x) => {
      x.onComplete((a) => logger.info(a))
    })
  })
}
</script>

<style lang="scss" scoped>
image {
  width: 100rpx;
}
</style>
