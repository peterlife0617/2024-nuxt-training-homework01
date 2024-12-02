<script setup lang="ts">
import type { SubmissionContext } from 'vee-validate'

const submitButtonRef = useTemplateRef('submitButtonRef')

function confirmReservation() {
  submitButtonRef.value?.click()
}

function onSubmit(value = {}, { resetForm }: SubmissionContext) {
  console.log('送出的值:', value)
  alert('送出訂房!')
  // 改成用 VeeValidate  的 resetForm 方法將表單重置
  resetForm()
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <section>
          <h2 class="mb-4 fw-bold">
            訂房人資訊
          </h2>

          <VForm v-slot="{ errors }" @submit="onSubmit">
            <div class="mb-4">
              <label for="name" class="form-label fw-bold">姓名</label>
              <VField
                id="name" name="name" class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.name }"
                type="text"
                placeholder="請輸入姓名"
                rules="required|min:2"
                label="姓名"
              />
              <VErrorMessage name="name" class="invalid-feedback" />
            </div>

            <div class="mb-4">
              <label for="phone" class="form-label fw-bold">手機號碼</label>
              <VField
                id="phone" name="phone" class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.phone }"
                type="tel"
                placeholder="請輸入手機號碼"
                rules="required|phone_number"
                label="手機號碼"
              />
              <VErrorMessage name="phone" class="invalid-feedback" />
            </div>

            <div class="mb-4">
              <label for="email" class="form-label fw-bold">電子信箱</label>
              <VField
                id="email" name="email" class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.email }"
                type="email"
                placeholder="請輸入電子信箱"
                rules="required|email"
                label="電子信箱"
              />
              <VErrorMessage name="email" class="invalid-feedback" />
            </div>

            <div class="mb-4">
              <label for="road" class="form-label fw-bold">地址</label>
              <div class="d-flex gap-2 mb-4">
                <VField
                  id="county" name="county" class="form-select w-50 p-3 fw-medium rounded-3"
                  :class="{ 'is-invalid': errors.county }"
                  type="county"
                  placeholder="請選擇縣市"
                  rules="required"
                  label="縣市"
                  as="select"
                >
                  <option selected disabled value="">
                    請選擇縣市
                  </option>
                  <option value="高雄市">
                    高雄市
                  </option>
                </VField>
                <VField
                  id="district" name="district" class="form-select w-50 p-3 fw-medium rounded-3"
                  :class="{ 'is-invalid': errors.district }"
                  type="district"
                  placeholder="請選擇行政區"
                  rules="required"
                  label="行政區"
                  as="select"
                >
                  <option selected disabled value="">
                    請選擇行政區
                  </option>
                  <option value="前金區">
                    前金區
                  </option>
                  <option value="鹽埕區">
                    鹽埕區
                  </option>
                  <option value="新興區">
                    新興區
                  </option>
                </VField>
              </div>
              <VField
                id="road"
                name="road"
                type="text"
                class="form-control p-3 rounded-3"
                placeholder="請輸入詳細地址"
                :class="{ 'is-invalid': errors.road }"
                label="地址"
                rules="required"
              />
              <VErrorMessage name="road" class="invalid-feedback" />
            </div>
            <button ref="submitButtonRef" type="submit" class="d-none" />
          </VForm>
        </section>
      </div>
      <div class="col-md-5">
        <img
          class="img-fluid rounded-3"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png"
          alt="尊爵雙人房"
        >
        <div class="my-5">
          <h2 className="mb-3 fw-bold">
            價格詳情
          </h2>
          <div
            class="d-flex justify-content-between align-items-center mb-3 fw-medium"
          >
            <span>NT$ 10,000 X 2 晚 </span>
            <span>NT$ 20,000</span>
          </div>
          <div
            class="d-flex justify-content-between align-items-center fw-medium"
          >
            <p class="mb-0">
              住宿折扣
            </p>
            <span class="text-info">-NT$ 1,000</span>
          </div>
          <hr class="my-3">
          <div
            class="d-flex justify-content-between align-items-center fw-bold"
          >
            <p class="mb-0">
              總價
            </p>
            <span>NT$ 19,000</span>
          </div>
        </div>

        <button
          class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
          type="button"
          @click="confirmReservation"
        >
          確認訂房
        </button>
      </div>
    </div>
  </div>
</template>
