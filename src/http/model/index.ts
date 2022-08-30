import { Type } from 'class-transformer'
import { Model } from '@/http/core'

export class QiniuConfig extends Model {
    /**
     * 域名
     */
    public domain: string
}

export class AppBaseResponse extends Model {
    /**
     * 授权Token
     */
    public base_time: number
    /**
     * 七牛配置
     */
    public qiniu: QiniuConfig
}

export class TokenResponse extends Model {
    /**
     * 授权Token
     */
    public access_token: string
    /**
     * 刷新Token
     */
    public refresh_token: string
    /**
     * 授权Token过期时间
     */
    public expires_in: number
    /**
     * Token来源
     */
    public token_origin: string
}

export class User extends Model {
    public id: string
    /**
     * 创建日期
     */
    public createdAt: string
    /**
     * 更新日期
     */
    public updatedAt: string
    /**
     * 用户昵称
     */
    public nickname: string
    /**
     * OPENID
     */
    public openid: string
    /**
     * UNIONID
     */
    public unionid: string
    /**
     * 手机号码
     */
    public mobile: string
    /**
     * 用户头像
     */
    public avatar: string
}

export class GetUploadTokenResponse extends Model {
    /**
     * 七牛 Upload Token
     */
    public token: string
}
