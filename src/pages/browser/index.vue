<template lang="pug">
view
  web-view(:src='url')
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>
