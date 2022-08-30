/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestAction, RequestParams } from '@/http/core'
import type { Observable } from 'rxjs'
import { AppController } from '@/http/controllers/app.controller'
import { AppBaseResponse, TokenResponse, User } from '@/http/model/.model'

export class AppService {
    /**
     * 获取系统基本信息
     */
    @RequestAction({
        server: AppController.appBase
    })
    public appBase(
        params?: RequestParams | { [key: string]: any }
    ): Observable<AppBaseResponse> {
        return RequestParams.create(params).request()
    }
    /**
     * 用户登录
     */
    @RequestAction({
        server: AppController.login
    })
    public login(
        params?: RequestParams | { [key: string]: any }
    ): Observable<TokenResponse> {
        return RequestParams.create(params).request()
    }
    /**
     * 刷新Token
     */
    @RequestAction({
        server: AppController.token
    })
    public token(
        params?: RequestParams | { [key: string]: any }
    ): Observable<TokenResponse> {
        return RequestParams.create(params).request()
    }
    /**
     * 获取当前用户信息
     */
    @RequestAction({
        server: AppController.getCurrentUser
    })
    public getCurrentUser(
        params?: RequestParams | { [key: string]: any }
    ): Observable<User> {
        return RequestParams.create(params).request()
    }
}
