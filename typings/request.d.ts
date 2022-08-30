declare module 'virtual:http-request' {
    import { AppService } from '@/http/services/app.service'
    import { QiniuService } from '@/http/services/qiniu.service'

    const serviceMap = {
        AppService,
        QiniuService
    }

    export function useRequest<T>(
        select: (services: typeof serviceMap) => { new (): T }
    ): T
}
