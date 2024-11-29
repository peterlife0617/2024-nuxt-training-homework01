const exampleMail = 'example0617@gmail.com'
const examplePw = 'example'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const { public: { apiUrl } } = useRuntimeConfig()

  const isClientHydrating = import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered
  if (
    isClientHydrating
  ) {
    return
  }

  // middleware 要執行的 code 寫在這邊

  const auth = useCookie('todo-auth')

  // 1. 自動登入
  if (!auth.value) {
    const loginResponse = await $fetch<{ status: true, token: string } | { status: false }>('/users/sign_in', {
      method: 'POST',
      baseURL: apiUrl,
      body: {
        email: exampleMail,
        password: examplePw,
      },
    })

    if (loginResponse.status === false) {
    // 自動登入失敗
      return
    }

    auth.value = loginResponse.token
  }

  // 2. 檢查 token 是否有效
  const checkResponse = await $fetch<{ status: true, uid: string } | { status: false, message: string }>(
    '/users/checkout',
    {
      baseURL: apiUrl,
      method: 'GET',
      headers: {
        Authorization: auth.value,
      },
    },
  ).catch(() => {
    return null
  })

  if (!checkResponse?.status) {
    // Token 無效
    auth.value = null

    // 3. Token 無效有可能是資料被清除，重新註冊
    const signUpResponse = await $fetch<{ status: true } | { status: false, message: string }>('/users/sign_up', {
      method: 'POST',
      baseURL: apiUrl,
      body: {
        email: exampleMail,
        password: examplePw,
        nickname: 'example',
      },
    })
    if (signUpResponse.status) {
      // 重新註冊成功
      // eslint-disable-next-line no-console
      console.log('重新註冊成功, 請重新整理頁面')
    }
  }
})
