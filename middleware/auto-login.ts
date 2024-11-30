export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const { auth, autoLogin, checkAuth } = useLogin()

  const isClientHydrating = import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered
  if (
    isClientHydrating
  ) {
    return
  }

  // middleware 要執行的 code 寫在這邊

  if (!auth.value) {
    await autoLogin()
    return
  }

  const isValid = await checkAuth(auth.value)

  if (!isValid) {
    await autoLogin()
  }
})
