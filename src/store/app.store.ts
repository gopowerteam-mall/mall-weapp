import { ToastType } from '@/shared/types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Ref } from 'vue'

/**
 * State数据结构
 */
interface State {
    /**
     * 系统准备状态
     */
    ready: boolean
    keyboard: AppKeyboard
    message: AppMessage
    basis: Ref<AppBasisData>
    systemInfo: AppSystemInfo
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    ready: false,
    basis: useStorage('app.basis', {
        base_time: 0,
        qiniu: {
            domain: ''
        }
    }),
    keyboard: {
        visiable: false,
        height: 0
    },
    message: {
        visiable: 0,
        type: 'info'
    },
    systemInfo: {
        pixelRatio: 2,
        screenWidth: 0,
        screenHeight: 0,
        windowWidth: 0,
        windowHeight: 0
    }
})

export const store = defineStore('app', {
    state: createState,
    actions: {
        /**
         * 更新系统准备状态
         */
        updateReady() {
            this.ready = true
        },
        /**
         * 更新键盘显示状态
         */
        updateKeyboard(keyboard: AppKeyboard) {
            this.keyboard = keyboard
        },
        /**
         * 更新基础信息
         * @param data
         */
        updateBasis(data: AppBasisData) {
            this.basis = data
        }
    }
})

/**
 * 键盘显示状态
 */
interface AppKeyboard {
    visiable: boolean
    height: number
}

/**
 * 应用消息状态
 */
interface AppMessage {
    visiable: number
    type: ToastType
}

interface AppBasisData {
    base_time: number
    qiniu: {
        domain: string
    }
}

interface AppSystemInfo {
    platform?: string
    screenWidth: number
    screenHeight: number
    windowWidth: number
    windowHeight: number
    pixelRatio: number
    safeAreaInsets?: UniApp.SafeAreaInsets
}
