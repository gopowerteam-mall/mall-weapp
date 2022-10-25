<template lang="pug">
fui-swiper-dot(:items='banners')
  swiper(
    :duration='150'
    :indicator-dots='false'
    :interval='4000'
    autoplay
    circular
  )
    swiper-item(v-for='banner in banners' :key='banner.id')
      ImagePreview(
        :src='banner.image'
        image-style='width: 100%'
        mode='widthFixed'
      )
</template>

<script setup lang="ts">
import { Banner } from '@/http/models/Banner'
import { useRequest } from 'virtual:request'

const bannerService = useRequest((service) => service.HomeService)

let banners = $ref<Banner[]>([])

/**
 * 请求Banner
 */
function requestBanner() {
  bannerService.getBannerList().then((data) => {
    banners = data
  })
}

onPageLoad(() => {
  requestBanner()
})
</script>
