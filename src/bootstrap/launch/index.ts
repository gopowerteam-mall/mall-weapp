import getAppLaunchTasks from '../launch/app.launch'
import getUserLaunchTasks from '../launch/user.launch'
import { useRequest } from 'virtual:http-request'
import { lastValueFrom } from 'rxjs'

const logger = useLogger()
/**
 * 业务启动逻辑
 */
async function appLaunch() {
    // 同步并获取应用
    await Promise.all(getAppLaunchTasks())
}

/**
 * 获取用户信息
 * @returns
 */
async function updateUserToken() {
    const appService = useRequest(service => service.AppService)
    const userStore = useStore(store => store.user)
    return new Promise<void>(resolve => {
        uni.login({
            provider: 'weixin',
            success: ({ code }) => {
                appService
                    .login({
                        code
                    })
                    .subscribe(data => {
                        userStore.updateToken({
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token
                        })

                        resolve()
                    })
            }
        })
    })
}

/**
 * 获取用户信息
 * @returns
 */
async function updateUserInfo() {
    const userStore = useStore(store => store.user)

    if (!userStore.accessToken) {
        return
    }

    const appService = useRequest(service => service.AppService)

    return lastValueFrom(appService.getCurrentUser()).then(data => {
        userStore.updateCurrent(data)
    })
}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
    const store = useStore(store => store.user)
    // 获取用户Token
    await updateUserToken()

    // 更新用户信息
    await updateUserInfo()
    // 同步并获取应用
    if (store.current) {
        await Promise.all(getUserLaunchTasks())
    }
}

/**
 * 系统初始化
 */
export default async function () {
    const store = useStore(store => store.app)
    // 检测系统启动状态
    if (store.ready) return

    // 系统启动逻辑
    await appLaunch()

    // 用户启动逻辑
    await userLaunch()

    // 系统初始化完成
    store.updateReady()
}
