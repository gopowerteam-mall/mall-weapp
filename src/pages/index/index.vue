<template lang="pug">
PageContainer
  Banner
  Category
  Recommand
</template>

<script setup lang="ts">
import Banner from './components/banner.vue'
import Category from './components/category.vue'
import Recommand from './components/recommand.vue'

onPageLoad(() => {})
</script>

<style lang="scss" scoped></style>
