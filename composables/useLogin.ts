import type { FetchError } from 'ofetch'

export function useLogin() {
  const exampleMail = 'example0617@gmail.com'
  const examplePw = 'example'

  const auth = useCookie('todo-auth')
  const { public: { apiUrl } } = useRuntimeConfig()

  // 自動登入
  async function autoLogin() {
    const loginResponse = await $fetch<{ status: true, token: string } | { status: false }>('/users/sign_in', {
      method: 'POST',
      baseURL: apiUrl,
      body: {
        email: exampleMail,
        password: examplePw,
      },
    }).catch(() => {
      return null
    })

    if (loginResponse?.status) {
    // 登入成功
      auth.value = loginResponse.token
    }

    await autoSignUp()
  }

  // 檢查 token 是否有效
  async function checkAuth(token: string) {
    const checkResponse = await $fetch<{ status: true, uid: string } | { status: false, message: string }>(
      '/users/checkout',
      {
        baseURL: apiUrl,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    ).catch(() => {
      return null
    })

    if (!checkResponse?.status) {
      // Token 無效
      auth.value = null
      return false
    }
    return true
  }

  // 自動註冊
  async function autoSignUp() {
    const signUpResponse = await $fetch<{ status: true } | { status: false, message: string }>('/users/sign_up', {
      method: 'POST',
      baseURL: apiUrl,
      body: {
        email: exampleMail,
        password: examplePw,
        nickname: 'example',
      },
    }).catch((e: FetchError) => {
      return e.response
    })
    if (signUpResponse?.status) {
      // eslint-disable-next-line no-console
      console.log('重新註冊成功, 請重新整理頁面')
    }
  }

  return {
    auth,
    autoLogin,
    checkAuth,
  }
}
