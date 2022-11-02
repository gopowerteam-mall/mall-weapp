<template lang="pug">
.safe-area-bottom
  .safe-area-bottom-content(:class='contentClass')
    slot
</template>

<script setup lang="ts">
import { provides } from '@/config/provide.config'
import type { Ref } from 'vue'

const appStore = useStore((store) => store.app)

defineProps<{
  contentClass?: string
}>()

const spaceBottom = inject<Ref<number>>(provides.pageContainer.spaceBottom)
const defulatSpaceBottom = 0

if (spaceBottom) {
  set(
    spaceBottom,
    Math.abs(appStore.systemInfo.safeAreaInsets?.bottom || defulatSpaceBottom),
  )
}
</script>

<style lang="scss" scoped>
.safe-area-bottom {
  margin: 0 !important;
  z-index: 1;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
