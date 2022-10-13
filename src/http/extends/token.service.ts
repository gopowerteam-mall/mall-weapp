import { ExtendService } from '@/http/core'

export class TokenService extends ExtendService {
  public before = (params: any) => {
    const store = useStore((store) => store.user)
    const options = params.getOptions()

    const token = store.accessToken

    if (token) {
      const header = {
        ['Authorization']: `Bearer ${token}`,
        ...(options.header || {}),
      }

      // 更新header配置
      params.setOptions({
        ...options,
        header,
      })
    }
  }
}
