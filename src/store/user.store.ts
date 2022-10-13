import { User } from '@/http/model'
import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
interface State {
  accessToken: Ref<string>
  refreshToken: Ref<string>
  // 用户信息
  current?: User
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
  accessToken: useStorage('user.access-token', ''),
  refreshToken: useStorage('user.refresh-token', ''),
  // 用户信息
  current: undefined,
})

export const store = defineStore('user', {
  state: createState,
  actions: {
    updateToken({
      accessToken,
      refreshToken,
    }: {
      accessToken: string
      refreshToken: string
    }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    updateCurrent(user: User) {
      this.current = user
    },
  },
})
