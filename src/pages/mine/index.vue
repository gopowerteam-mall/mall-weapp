<template lang="pug">
PageContainer(tabbar)
</template>

<script setup lang="ts">
const logger = useLogger()

onPageLoad(() => {
  logger.info('页面启动')
})
</script>

<style lang="scss" scoped></style>
