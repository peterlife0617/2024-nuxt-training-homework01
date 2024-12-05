import type { FetchOptions } from 'ofetch'
import type { UserLoginRequest } from '../models/user'
import type { ApiResponseWithToken } from '../types/api-response'
import { apiInstance } from '../api'
import { apiFactory } from '../helper/factory'

export function ServiceUser() {
  const api = apiFactory(apiInstance)

  return {
    /** 登入 */
    login: (data: UserLoginRequest, options?: FetchOptions) => api.post<ApiResponseWithToken>('/user/login', data, options),
  }
}
