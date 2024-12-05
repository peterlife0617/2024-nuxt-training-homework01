<script setup lang="ts">
import { ServiceOrder } from '~/api/services/order'

definePageMeta({
  middleware: ['auth'],
})

const router = useRouter()
const route = useRoute()

const bookingStore = useBookingStore()
const { room: roomInfo, bookingResult, bookingDays } = storeToRefs(bookingStore)
const { setOrder } = bookingStore

if (!bookingResult.value) {
  navigateTo(`/rooms/${route.params.roomId}`)
}

const { fetchData } = useApi()
const { createOrder: apiCreateOrder } = ServiceOrder()

const submitButtonRef = useTemplateRef('submitButtonRef')

const bookingInfo = computed(() => {
  return {
    bookingDays: bookingDays.value,
  }
})

const discountPrice = 1000

async function createOrder(userInfo: Record<string, any> = {}) {
  if (!bookingResult.value) {
    return
  }
  const bookingResultValue = bookingResult.value

  const response = await fetchData(() => apiCreateOrder({
    ...bookingResultValue,
    userInfo: {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      address: {
        ...userInfo.address,
        zipcode: 800,
      },
    },
  }))

  if (response.status) {
    const { result } = response
    setOrder(result)
    router.push(`/booking/${result._id}`)
  }
}

function onConfirm() {
  submitButtonRef.value?.click()
}
</script>

<template>
  <main>
    <DevOnly>
      <div>{{ bookingResult }}</div>
    </DevOnly>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <section>
            <h2 class="mb-4 fw-bold">
              訂房人資訊
            </h2>
            <VForm
              v-slot="{ errors, values }" :initial-values="{
                name: '123',
                phone: '0912345678',
                email: 'example@example.com',
                address: {
                  city: '高雄市',
                  district: '前金區',
                  detail: '123',
                },
              }" @submit="createOrder"
            >
              <DevOnly>
                <div>{{ values }}</div>
              </DevOnly>
              <div class="mb-4">
                <label for="name" class="form-label fw-bold">姓名</label>
                <VField
                  id="name"
                  name="name"
                  label="姓名"
                  rules="required|min:2"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="請輸入姓名"
                />
                <VErrorMessage name="name" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="phone" class="form-label fw-bold">手機號碼</label>
                <VField
                  id="phone"
                  name="phone"
                  label="手機號碼"
                  rules="required|phone_number"
                  type="tel"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors.phone }"
                  placeholder="請輸入手機號碼"
                />
                <VErrorMessage name="phone" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="email" class="form-label fw-bold">電子信箱</label>
                <VField
                  id="email"
                  name="email"
                  label="電子信箱"
                  rules="required|email"
                  type="email"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="請輸入電子信箱"
                />
                <VErrorMessage name="email" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="road" class="form-label fw-bold">地址</label>
                <div className="d-flex gap-2 mb-4">
                  <VField
                    as="select"
                    name="address.city"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['address.city'] }"
                  >
                    <option selected disabled value="">
                      請選擇縣市
                    </option>
                    <option value="高雄市">
                      高雄市
                    </option>
                  </VField>
                  <VField
                    as="select"
                    name="address.district"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['address.district'] }"
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
                  name="address.detail"
                  rules="required"
                  label="詳細地址"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['address.detail'] }"
                  placeholder="請輸入詳細地址"
                />
                <VErrorMessage name="address.detail" class="invalid-feedback" />
              </div>
              <button
                ref="submitButtonRef"
                type="submit"
                class="d-none"
              />
            </VForm>
          </section>
        </div>
        <div v-if="roomInfo" class="col-md-5">
          <img
            class="img-fluid rounded-3"
            :src="roomInfo.imageUrl"
            :alt="roomInfo.name"
          >
          <div class="my-5">
            <h2 className="mb-3 fw-bold">
              價格詳情
            </h2>
            <div
              class="d-flex justify-content-between align-items-center mb-3 fw-medium"
            >
              <span>NT$ {{ roomInfo.price }} X {{ bookingInfo.bookingDays }}晚
              </span>
              <span>NT$ {{ roomInfo.price * bookingInfo.bookingDays }}</span>
            </div>
            <div
              class="d-flex justify-content-between align-items-center fw-medium"
            >
              <p class="mb-0">
                住宿折扣
              </p>
              <span class="text-info">-NT$ {{ discountPrice }}</span>
            </div>
            <hr class="my-3">
            <div
              class="d-flex justify-content-between align-items-center fw-bold"
            >
              <p class="mb-0">
                總價
              </p>
              <span>NT$
                {{
                  roomInfo.price * bookingInfo.bookingDays - discountPrice
                }}</span>
            </div>
          </div>

          <button
            class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
            type="button"
            @click="onConfirm"
          >
            確認訂房
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
