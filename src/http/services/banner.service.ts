/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestAction, RequestParams } from '@/http/core'
import type { Observable } from 'rxjs'
import { BannerController } from '@/http/controllers/banner.controller'
import { Banner } from '@/http/model'

export class BannerService {
  /**
   * 查询Banner列表
   */
  @RequestAction({
    server: BannerController.findBanner,
  })
  public findBanner(
    params?: RequestParams | { [key: string]: any },
  ): Observable<Banner[]> {
    return RequestParams.create(params).request()
  }
}
