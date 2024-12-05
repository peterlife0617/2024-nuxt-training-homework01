<script setup lang="ts">
import type { FetchError } from 'ofetch'
import { ServiceUser } from '~/api/services/user'

const router = useRouter()
const accountToken = useCookie('accountToken')
const { fetchData, isFetch } = useApi()
const { login } = ServiceUser()

async function loginAccount(userData: Record<string, any> = {}) {
  if (isFetch.value) {
    return
  }

  try {
    const loginResponse = await fetchData(() => login({
      email: userData.email,
      password: userData.password,
    }))

    if (loginResponse.status) {
      const { token } = loginResponse
      accountToken.value = token
      alert('登入成功 ! ')
      router.push('/rooms')
    }
  }
  catch (error) {
    alert((error as FetchError).data?.message)
  }
}
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="px-5 px-md-0">
            <p class="mb-2 fw-bold">
              享樂酒店，誠摯歡迎
            </p>
            <h1 class="fw-bold">
              立即開始旅程
            </h1>
          </div>
          <VForm
            v-slot="{ errors }" :initial-values="{
              email: 'example@example.com',
              password: 'a12345678',
            }"
            @submit="loginAccount"
          >
            <div class="mb-4">
              <label class="mb-2 fw-bold" for="email"> 電子信箱 </label>
              <VField
                id="email"
                name="email"
                rules="required|email"
                class="form-control p-3 fw-medium"
                :class="{ 'is-invalid': errors.email }"
                placeholder="請輸入信箱"
                type="email"
              />
              <VErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="mb-4">
              <label class="mb-2 fw-bold" for="password"> 密碼 </label>
              <VField
                id="password"
                name="password"
                rules="required|min:8"
                class="form-control p-3 fw-medium"
                :class="{ 'is-invalid': errors.password }"
                placeholder="請輸入password"
                type="password"
              />
              <VErrorMessage name="password" class="invalid-feedback" />
            </div>
            <button
              type="submit"
              :disabled="isFetch"
              class="btn btn-primary w-100 py-3 fw-bold"
            >
              會員登入
            </button>
          </VForm>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
