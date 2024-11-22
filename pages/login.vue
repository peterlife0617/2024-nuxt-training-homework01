<script setup lang="ts">
import type { FetchError } from 'ofetch'

const { success, error } = useAlert()

// 表單格式
const userLoginObject = ref({
  email: 'example13213123@gmail.com',
  password: 'a12345678',
})

async function loginAccount() {
  /*
  1. 串接旅館的 登入 API
  2. 登入成功後，使用 useCookie() 將 token 寫入名稱為 “auth” 的 cookie
  3. 需使用 try catch 處理請求
  4. 請求成功與失敗皆使用 sweetAlert2 套件顯示訊息
 $swal.fire({
   position: "center",
   icon: ...,
   title: ...,
   showConfirmButton: false,
   timer: 1500,
 });
  */

  try {
    const response = await $fetch<{
      status: true
      exp: number
      token: string
    } | {
      status: false
      message: string
    }>('https://todolist-api.hexschool.io/users/sign_in', {
      method: 'POST',
      body: userLoginObject.value,
    })

    if (!response.status) {
      error(response.message)
      return
    }

    const { exp, token } = response

    const cookie = useCookie('auth', {
      expires: new Date(exp * 1000),
      path: '/',
    })

    cookie.value = token
    success('登入成功')
  }
  catch (e: unknown) {
    const { message } = (e as FetchError).response?._data

    error(message)
  }
}
</script>

<template>
  <div class="py-3 py-md-5 vh-100">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <h2 class="h3 mb-4">
            登入
          </h2>
          <form @submit.prevent="loginAccount">
            <div class="form-floating mb-4">
              <input
                id="email"
                v-model="userLoginObject.email"
                type="email"
                class="form-control"
                placeholder="example@gmail.com"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                required
              >
              <label for="email">信箱 <span class="text-danger">*</span></label>
            </div>

            <div class="form-floating mb-4">
              <input
                id="password"
                v-model="userLoginObject.password"
                type="password"
                class="form-control"
                placeholder="請輸入 8 碼以上密碼"
                pattern=".{8,}"
                required
              >
              <label for="password">密碼 <span class="text-danger">*</span></label>
            </div>
            <button class="btn btn-lg btn-primary w-100" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
