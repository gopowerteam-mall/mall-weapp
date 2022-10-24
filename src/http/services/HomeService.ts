/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Banner } from '../models/Banner'
import type { Category } from '../models/Category'
import type { Product } from '../models/Product'
import { RequestService, type RequestPlugin } from '@gopowerteam/request'

export class HomeService {
  // 请求实例
  private request = RequestService.getInstance()

  /**
   * 获取Banner列表
   */
  public getBannerList(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Banner[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/home/get-banner-list',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取推荐标签列表
   */
  public getCategoryList(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Category[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/home/get-category-list',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取推荐商品
   */
  public getRecommendList(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Product[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/home/get-recommend-list',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }
}

namespace RequestQueryParams {}
