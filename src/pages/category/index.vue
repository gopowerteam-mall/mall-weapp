<template lang="pug">
PageContainer(tabbar)
  view.category-header.flex.items-center
    fui-icon(name='list' @click='() => (categoryListVisiable = true)')
    fui-search-bar.flex-auto(placeholder='请输入搜索的商品' @search='onSearch')
  view.product-list
fui-drawer(
  direction='left'
  :show='categoryListVisiable'
  @close='() => (categoryListVisiable = false)'
)
  .h-full: CategoryList(v-model='category')
</template>

<script setup lang="ts">
import { Category } from '@/http/models/Category'
import CategoryList from './components/category-list.vue'

const logger = useLogger()
let categoryListVisiable = $ref(false)
let category = $ref<Category>()

watch(
  () => category,
  () => {
    categoryListVisiable = false
  },
)

/**
 * 搜索商品
 */
function onSearch() {}

onPageLoad(() => {
  logger.info('页面启动')
})
</script>

<style lang="scss" scoped></style>
