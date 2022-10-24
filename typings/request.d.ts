declare module 'virtual:http-request' {
  import { AppService } from '@/http/services/AppService'
  import { HomeService } from '@/http/services/HomeService'
  import { QiniuService } from '@/http/services/QiniuService'

  const serviceMap = {
      AppService,
    HomeService,
    QiniuService
    }

  export function useRequest<T>(
    select: (services: typeof serviceMap) => { new (): T }
  ): T
}
