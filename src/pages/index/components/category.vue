<template lang="pug">
fui-grid(:columns='4')
  fui-grid-item(v-for='category in categorys' :key='category.id')
    ImagePreview.text-center(
      mode='widthFix'
      :src='category.image'
      width='100rpx'
      rounded
      @click='() => onSelectCategory(category)'
    )
    view.text-center {{ category.title }}
</template>

<script lang="ts" setup>
import { events } from '@/config/event.config'
import { Category } from '@/http/models/Category'
import { useRequest } from 'virtual:request'

let categorys = $ref<Category[]>([])
const homeService = useRequest((service) => service.HomeService)

/**
 * 请求分类列表
 */
function requestCatagoryList() {
  homeService.getCategoryList().then((data) => {
    categorys = data
  })
}

/**
 * 选择分类项目
 */
function onSelectCategory(category: Category) {
  uni.switchTab({
    url: `/pages/category/index`,
  })

  // 切换选择分类
  uni.$emit(events.category.switch, { id: category.id })
}

onPageLoad(() => {
  requestCatagoryList()
})
</script>
