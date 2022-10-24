/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppBaseResponse } from '../models/AppBaseResponse'
import type { TokenResponse } from '../models/TokenResponse'
import type { User } from '../models/User'
import { RequestService, type RequestPlugin } from '@gopowerteam/request'

export class AppService {
  // 请求实例
  private request = RequestService.getInstance()

  /**
   * 获取系统基本信息
   */
  public appBase(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<AppBaseResponse> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/app/app-base',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 用户登录
   */
  public login(
    requestQuery: RequestQueryParams.Login,
    requestPlugins: RequestPlugin[] = [],
  ): Promise<TokenResponse> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/app/weapp-login',
        method: 'get',
        paramsQuery: requestQuery,
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 刷新Token
   */
  public token(requestPlugins: RequestPlugin[] = []): Promise<TokenResponse> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/app/weapp-token',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取当前用户信息
   */
  public getCurrentUser(requestPlugins: RequestPlugin[] = []): Promise<User> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/app/current',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }
}

namespace RequestQueryParams {
  export type Login = {
    code: string
  }
}
