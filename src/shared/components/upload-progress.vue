<template lang="pug">
.upload-progress.h-full.w-full.relative
  .progress.flex.flex-center(v-if='value') {{ value?.progress }}%
  slot
</template>

<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { UploadTask } from '../utils/upload.service'

defineProps<{
  value?: UploadTask | UnwrapRef<UploadTask>
}>()
</script>

<style lang="scss" scoped>
.progress {
  z-index: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
  border-radius: 15rpx 0 0 0;
  transform: scale(0.8);
  transform-origin: 100% 100%;
  width: 80rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
