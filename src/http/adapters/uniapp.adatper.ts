import {
  RequestAdapter,
  RequestAdapterOptions,
  AdapterResponse,
} from '@gopowerteam/request'

export class UniappAdapter implements RequestAdapter {
  /**
   * 发送请求
   * @param options 请求参数
   * @returns AxiosResponse
   */
  public request({
    baseURL,
    pathURL,
    headers,
    method,
    paramsQuery,
    paramsBody,
  }: RequestAdapterOptions) {
    return new Promise((resolve, reject) => {
      uni.request({
        // 默认配置对象
        url: `${baseURL}${pathURL}`,
        method: method.toUpperCase() as UniNamespace.RequestOptions['method'],
        header: headers,
        data: paramsQuery || paramsBody,
        success(result) {
          resolve(result)
        },
        fail(result) {
          reject(result)
        },
      })
    })
  }

  /**
   * 转换Response
   * @param response
   * @returns
   */
  public transformResponse(
    response: UniApp.RequestSuccessCallbackResult,
  ): AdapterResponse {
    return {
      data: response.data as any,
      statusText: '',
      status: response.statusCode,
      headers: response.header,
    }
  }
}
