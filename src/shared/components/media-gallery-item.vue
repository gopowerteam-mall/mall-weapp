<template lang="pug">
.media-gallery-item.absolute.inset-0
    UploadProgress(:value='task')
        .media-wrapper.flex-center.absolute.inset-0
            .image-gallery-item.w-full.h-full
                ImagePreview(:src='url' preview)
    .action.flex.justify-end.space-x-2.p-1
        .remove(@click='emits("delete", src || task?.key || "")')
            fui-icon(:size='30' name='close')
</template>

<script setup lang="ts">
import { UploadTask } from '../utils/upload.service'
import UploadProgress from './upload-progress.vue'
import ImagePreview from './image-preview.vue'
import type { UnwrapRef } from 'vue'
const props = defineProps<{
    task?: UploadTask | UnwrapRef<UploadTask>
    src?: string
}>()

const url = computed(() => {
    return props.task?.localUrl || (props.src as string)
})

const emits = defineEmits({
    delete: (key: string) => key
})

const mediaGallery = getRootCompoent()

function getRootCompoent() {
    const currentInstance = getCurrentInstance()

    let component = currentInstance?.parent

    while (component && component?.type?.name !== 'MediaGallery') {
        component = component.parent
    }

    return component
}
</script>

<style lang="scss" scoped>
.media-gallery-item {
    font-size: 0;

    .action {
        position: absolute;
        top: 0;
        right: 0;
    }
}

.media-wrapper {
    overflow: hidden;
    background-color: rgb(0 0 0 / 10%);
}
</style>
