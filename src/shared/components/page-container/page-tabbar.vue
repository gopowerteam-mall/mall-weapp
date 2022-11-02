<template lang="pug">
SafeAreaBottom
  .tabbar-container.flex
    view.tab.flex-auto.flex.flex-center.flex-col(
      v-for='tab in tabbars'
      :key='tab.pagePath'
      :class='{ "mid-button": tab.midButton }'
      @click='() => onSelectTab(tab)'
    )
      image.icon.py-1(
        :src='currentPath === tab.pagePath ? tab.selectedIconPath : tab.iconPath'
        mode='widthFix'
      )
      .text(
        v-if='tab.text'
        :style='currentPath === tab.pagePath ? selectedTextStyle : unSelectedTextStyle'
      ) {{ tab.text }}
</template>

<script setup lang="ts">
import { onHide } from '@dcloudio/uni-app'
import { tabBar } from '../../../pages.json'

const selectedTextStyle = {
  color: '#4F7CFF',
  fontSize: '20rpx',
}

const unSelectedTextStyle = {
  color: '#818181',
  fontSize: '20rpx',
}

const router = useRouter()
const currentPath = ref('')

const tabbars: {
  text: string
  pagePath: string
  iconPath: string
  selectedIconPath: string
  midButton: boolean
}[] = tabBar.list.map((tabbar) => ({
  text: tabbar.text,
  pagePath: `/${tabbar.pagePath}`,
  iconPath: `/${tabbar.iconPath}`,
  selectedIconPath: `/${tabbar.selectedIconPath}`,
  midButton: false,
}))

function onSelectTab(tab) {
  if (tab.midButton) {
    // TODO
  } else {
    uni.switchTab({ url: tab.pagePath })
  }
}

onMounted(() => {
  const [path] = router.getPath().split('?')
  set(currentPath, path)
})

onHide(() => {
  // TODO
})
</script>

<style lang="scss" scoped>
.tabbar-container {
  background-color: #fff;

  .text {
    font-size: 24rpx;
  }

  .icon {
    width: 50rpx;
    height: 50rpx;
  }

  .mid-button {
    .icon {
      width: 70rpx;
      height: 70rpx;
    }
  }
}
</style>
