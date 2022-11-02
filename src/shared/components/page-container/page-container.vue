<template lang="pug">
.page-container
  .page-background(:style='backgroundStyle')
  .page-body(v-if='store.ready && loading !== false')
    .page-body-content(:class='containerClass' :style='containerStyle')
      slot
      .page-bottom-space(
        v-if='pageBottomSpace'
        :style='{ paddingBottom: `${pageBottomSpace}px` }'
      )
    PageTabbar(v-if='tabbar')
  PageLoading(v-else)
  PageToast
  PageDialog
  PageLogin
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'

import PageLoading from './page-loading.vue'
import PageTabbar from './page-tabbar.vue'
import PageToast from './page-toast.vue'
import PageDialog from './page-dialog.vue'
import PageLogin from './page-login.vue'
import { provides } from '@/config/provide.config'
import { onShow } from '@dcloudio/uni-app'

const store = useStore((store) => store.app)

const defaultPadding = 20
const defaultSpace = 4
const pageBottomSpace = ref(0)

provide(provides.pageContainer.spaceBottom, pageBottomSpace)

const props = withDefaults(
  defineProps<{
    title?: string
    fullscreen?: boolean
    tabbar?: boolean
    loading?: boolean | undefined
    padding?: number | boolean
    space?: number | boolean
    backgroundImage?: string
    backgroundColor?: string
    showContact?: boolean
  }>(),
  {
    loading: undefined,
    padding: 0,
    space: 0,
    backgroundColor: '#f8f8f8',
  },
)

watch(
  () => props.title,
  () => {
    props.title && uni.setNavigationBarTitle({ title: props.title })
  },
)

onShow(() => {
  if (props.tabbar) {
    uni.hideTabBar()
  }
})

const backgroundStyle = computed(() => {
  const backgroundImageStyle: StyleValue = props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
      }
    : {}

  const backgroundColorStyle: StyleValue = props.backgroundColor
    ? {
        backgroundColor: props.backgroundColor,
      }
    : {}

  return Object.assign({}, backgroundImageStyle, backgroundColorStyle)
})

const containerStyle = computed(() => {
  const fullscreenStyle: StyleValue = props.fullscreen
    ? {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: `${pageBottomSpace.value + (props.tabbar ? 46 : 0)}rpx`,
      }
    : {}

  const tabbarStyle: StyleValue = props.tabbar
    ? {
        // #ifndef H5
        //   marginBottom: '50px'
        // #endif
      }
    : {}

  const paddingStyle: StyleValue = props.padding
    ? {
        padding: `${
          typeof props.padding === 'number' ? props.padding : defaultPadding
        }rpx`,
      }
    : {}

  return Object.assign({}, fullscreenStyle, tabbarStyle, paddingStyle)
})

const containerClass = computed(() => {
  const spaceClass = props.space
    ? `space-y-${typeof props.space === 'number' ? props.space : defaultSpace}`
    : ''

  return `${spaceClass}`
})
</script>

<style lang="scss" scoped>
.page-background {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  inset: 0;
  z-index: -1;
  background-size: cover;
}
</style>
