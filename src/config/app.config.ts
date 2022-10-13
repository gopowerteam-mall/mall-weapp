export const appConfig = {
  http: {
    gateway: import.meta.env.VITE_APP_GATEWAY as string,
  },
  wechat: {
    appid: import.meta.env.VITE_APP_WECHAT_APPID as string,
  },
  weapp: {
    appid: import.meta.env.VITE_APP_WEAPP_APPID as string,
  },
  qiniu: {
    uploadURL: import.meta.env.VITE_QINIU_UPLOADURL,
  },
} as const
