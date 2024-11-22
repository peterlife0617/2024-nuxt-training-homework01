export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()

  const isClientHydrating = import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered
  if (
    isClientHydrating
  ) {
    return
  }

  // middleware 要執行的 code 寫在這邊

  const token = useCookie('auth')

  try {
    const response = await $fetch<{ status: true, token: string } | { status: false, message: string }>(
      '/user/check',
      {
        baseURL: 'https://nuxr3.zeabur.app/api/v1',
        method: 'GET',
        headers: {
          Authorization: token.value ?? '',
        },
      },
    ).catch(() => {
      return null
    })

    if (response?.status) {
      return
    }

    return navigateTo('/login')
  }
  catch {
    return navigateTo('/login')
  }
})
