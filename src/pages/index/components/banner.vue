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
        @click='() => onSelectBanner(banner)'
      )
</template>

<script setup lang="ts">
import { BannerType } from '@/config/enum.config'
import { Banner } from '@/http/models/Banner'
import { useRequest } from 'virtual:request'

const router = useRouter()
const bannerService = useRequest((service) => service.HomeService)

let banners = $ref<Banner[]>([])

/**
 * 选择Banner
 * @param {Banner} banner Banner
 */
function onSelectBanner(banner: Banner) {
  switch (banner.type) {
    // 跳转H5页面
    case BannerType.url:
      router.navigateTo('/pages/browser/index', {
        query: { url: banner.target },
      })
      break
    // 跳转指定页面
    case BannerType.page:
      router.navigateTo(banner.target as any)
      break
    // 跳转产品页面
    case BannerType.project:
      router.navigateTo('/pages/project/index', {
        query: { id: banner.id },
      })
      break
  }
}
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
