import type { FetchOptions } from 'ofetch'

export function apiFactory(fetch: typeof $fetch, apiUrl?: string) {
  const {
    public: { apiUrl: defaultUrl },
  } = useRuntimeConfig()

  const token = useCookie('accountToken')

  const baseUrl = apiUrl ?? defaultUrl

  return {
    get: <TData>(url: string, options?: FetchOptions) => {
      return fetch<TData>(url, {
        ...options,
        method: 'GET',
        baseURL: baseUrl,
        headers: {
          Authorization: `${token.value}`,
        },
      })
    },

    post: <TData>(
      url: string,
      data: Record<string, any>,
      options?: FetchOptions,
    ) =>
      fetch<TData>(url, {
        ...options,
        method: 'POST',
        body: data,
        baseURL: baseUrl,
        headers: {
          Authorization: `${token.value}`,
        },
      }),
  }
}
