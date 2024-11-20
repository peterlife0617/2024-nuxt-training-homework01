<script setup lang="ts">
const { success, error } = useAlert()
const { register } = useRegister()

// 表單格式
const userRegisterObject = ref({
  name: '王小明',
  email: 'example@gmail.com',
  password: '12345678',
  phone: '0912345678',
  birthday: '2000-01-01',
  address: {
    zipcode: '100',
    detail: '台北市中正區重慶南路一段',
  },
})

async function onSubmit() {
  try {
    const response = await register(Object.assign(userRegisterObject.value, {
      nickname: userRegisterObject.value.name,
    }))

    if (response.status) {
      success(response.message || '註冊成功')
      return
    }

    error(response.message)
  }
  catch (e: any) {
    error(e.response?._data?.message || '註冊失敗')
  }
}
</script>

<template>
  <div class="bg-light py-3 py-md-5 vh-100">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <h2 class="h3 mb-4">
              會員註冊
            </h2>
            <form @submit.prevent="onSubmit">
              <div class="form-floating mb-4">
                <input
                  id="firstName"
                  v-model="userRegisterObject.name"
                  type="text"
                  class="form-control"
                  placeholder="王小明"
                  required
                >
                <label for="firstName">姓名 <span class="text-danger">*</span></label>
              </div>

              <div class="form-floating mb-4">
                <input
                  id="email"
                  v-model="userRegisterObject.email"
                  type="email"
                  class="form-control"
                  placeholder="example@gmail.com"
                  required
                >
                <label for="email">信箱 <span class="text-danger">*</span></label>
              </div>

              <div class="form-floating mb-4">
                <input
                  id="password"
                  v-model="userRegisterObject.password"
                  type="password"
                  class="form-control"
                  placeholder="請輸入 8 碼以上密碼"
                  pattern=".{8,}"
                  required
                >
                <label for="password">密碼 <span class="text-danger">*</span></label>
              </div>

              <div class="form-floating mb-4">
                <input
                  id="phone"
                  v-model="userRegisterObject.phone"
                  type="tel"
                  class="form-control"
                  placeholder="0912345678"
                  pattern="(\+886|0)?9\d{8}|(\+886|0)?2\d{8}|\d{3}-\d{4}-\d{4}"
                  required
                >
                <label for="phone">電話</label>
              </div>

              <div class="form-floating mb-4">
                <input
                  id="dateInput"
                  v-model="userRegisterObject.birthday"
                  type="date"
                  class="form-control"
                  required
                >
                <label for="dateInput">出生年月日</label>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <input
                      id="zipcode"
                      v-model="userRegisterObject.address.zipcode"
                      type="text"
                      class="form-control"
                      placeholder="100"
                      pattern="\d{3,}"
                      required
                    >
                    <label for="zipcode">郵遞區號</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <input
                      id="address"
                      v-model="userRegisterObject.address.detail"
                      type="text"
                      class="form-control"
                      placeholder="台北市中正區重慶南路一段"
                      required
                    >
                    <label for="address">詳細地址</label>
                  </div>
                </div>
              </div>

              <button class="btn btn-lg btn-primary w-100" type="submit">
                註冊
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
