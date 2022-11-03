/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category'
import { RequestService, type RequestPlugin } from '@gopowerteam/request'

export class CategoryService {
  // 请求实例
  private request = RequestService.getInstance()

  /**
   * 获取分类列表
   */
  public getCategoryList(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Category[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/category/get-category-list',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }

  /**
   * 获取分类树形结构
   */
  public getCategoryTree(
    requestPlugins: RequestPlugin[] = [],
  ): Promise<Category[]> {
    // 请求数据
    const result = this.request.send(
      {
        path: '/api/client/category/get-category-tree',
        method: 'get',
      },
      requestPlugins,
    )

    return result
  }
}

namespace RequestQueryParams {}
