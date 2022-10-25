<template lang="pug">
.page-login
  fui-modal(:buttons='[]' :show='loginVisiable')
    .content.space-y-10.py-2
      .header.space-y-5
        .title.text-center 您还未登录
        .description.text-center 请先登录后进行更多操作
      .actions.flex.flex-gap-10
        fui-button.cancel(
          border-color='#5bbaf7'
          color='#5bbaf7'
          height='60rpx'
          plain
          size='24'
          width='200rpx'
        ) 暂不登录

        // #ifdef MP-WEIXIN
        fui-button.submit(
          height='60rpx'
          size='24'
          width='200rpx'
          @click='loginForWeapp'
        ) 立即登录
        // #endif

        // #ifdef H5
        fui-button.submit(
          height='60rpx'
          size='24'
          width='200rpx'
          @click='loginForWechat'
        ) 立即登录
        // #endif

        // #ifdef APP-PLUS
        fui-button.submit(
          height='60rpx'
          size='24'
          width='200rpx'
          @click='loginForApp'
        ) 立即登录
        // #endif

        fui-button.cancel(
          height='60rpx'
          size='24'
          width='200rpx'
          @click='onCancel'
        ) 取消
</template>

<script setup lang="ts">
import { events } from '@/config/event.config'
import { useRequest } from 'virtual:request'

const logger = useLogger()
const store = useStore((store) => store.user)
const router = useRouter()
const loginVisiable = ref(false)
const appService = useRequest((service) => service.AppService)

const showEvent = ref('')
const resultEvent = ref('')

/**
 * 登录小程序
 */
function loginForWeapp() {
  uni.login({
    provider: 'weixin',
    success: ({ code }) => {
      appService.login({ code }).then(({ access_token, refresh_token }) => {
        store.updateToken({
          accessToken: access_token,
          refreshToken: refresh_token,
        })
        submitLoginResult(true)
      })
    },
    fail: (ex) => {
      logger.error(ex)
      submitLoginResult('登录失败')
    },
  })
}

function loginForWechat() {}

function loginForApp() {
  onTestLogin()
  // TODO:App登录
}

function onTestLogin() {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
    .then(() => {
      submitLoginResult(true)
    })
    .catch(() => {
      submitLoginResult('登录失败')
    })
}

function onCancel() {
  submitLoginResult('取消登录')
}

function submitLoginResult(state: boolean | string) {
  set(loginVisiable, false)
  uni.$emit(get(resultEvent), state)
}

onMounted(() => {
  set(showEvent, `${router.getPath()}:${events.login.show}`)
  set(resultEvent, `${router.getPath()}:${events.login.result}`)

  uni.$on(get(showEvent), () => {
    set(loginVisiable, true)
  })
})
</script>

<style lang="scss" scoped>
.page-login {
  .title {
    font-weight: bold;
  }

  .description {
    font-size: 20rpx;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
