import type { FetchOptions } from 'ofetch'
import type { CreateOrderRequest, CreateOrderResponse } from '../models/order'
import type { ApiResponse } from '../types/api-response'
import { apiInstance } from '../api'
import { apiFactory } from '../helper/factory'

export function ServiceOrder() {
  const api = apiFactory(apiInstance)

  return {
    /** 新增訂單 */
    createOrder: (data: CreateOrderRequest, options?: FetchOptions) => api.post<ApiResponse<CreateOrderResponse>>('/orders', data, options),
  }
}
