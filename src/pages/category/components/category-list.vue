<template lang="pug">
.category-list.flex.h-full
  .category-item-list.space-y-4
    .category-item.p-2(
      :class='{ active: !currentSubItem && !currentItem }'
      @click='() => onSelectSubItem()'
    ) 全部
    .category-item.p-2(
      v-for='item in itemList'
      :key='item.id'
      :class='{ active: currentItem?.id == item.id }'
      @click='() => onSelectItem(item)'
    )
      .title {{ item.title }}
  .category-subitem-list.space-y-4(v-if='subItemList')
    .category-sub-item.p-2(@click='() => onSelectSubItem(currentItem)') 全部
    .category-sub-item.p-2(
      v-for='subItem in subItemList'
      :key='subItem.id'
      :class='{ active: currentSubItem?.id == subItem.id }'
      @click='() => onSelectSubItem(subItem)'
    )
      .title {{ subItem.title }}
</template>

<script setup lang="ts">
import { useRequest } from 'virtual:request'
import type { Category } from '@/http/models/Category'
import { useVModel } from '@vueuse/core'
const categoryService = useRequest((service) => service.CategoryService)

const props = defineProps<{
  modelValue?: Category
}>()

const emit = defineEmits(['update:modelValue'])

const currentSubItem = useVModel(props, 'modelValue', emit)

let categorys = $ref<Category[]>([])
let itemList = computed(() => categorys.filter((x) => !x.parent))

let currentItem = $ref<Category | undefined>()
let subItemList = computed(() =>
  categorys.filter((x) => currentItem && x.parent?.id === currentItem?.id),
)

/**
 * 获取分类列表
 */
function requestCatagoryList() {
  categoryService.getCategoryList().then((data) => {
    categorys = data
  })
}

onMounted(() => {
  requestCatagoryList()
})

function onSelectItem(category) {
  currentItem = category
}

function onSelectSubItem(category?) {
  currentSubItem.value = category

  if (!category) {
    currentItem = undefined
  }
}
</script>

<style lang="scss" scoped>
.category-item-list {
  background-color: #f3f3f3;
  height: 100%;

  .category-item {
    width: 150rpx;

    &.active {
      color: #3adbe2;
      background-color: #fff;
    }
  }
}

.category-subitem-list {
  background-color: #fff;
  height: 100%;

  .category-sub-item {
    min-width: 200rpx;

    &.active {
      color: #3adbe2;
    }
  }
}
</style>
