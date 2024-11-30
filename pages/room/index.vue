<script setup lang="ts">
import type { Room } from '~/models/room'

const route = useRoute()
const router = useRouter()

const { public: {
  apiUrl,
} } = useRuntimeConfig()

// 使用 useFetch 或是 useAsyncData 串接 API 取得房型詳細資料
// API path : https://nuxr3.zeabur.app/api/v1/rooms

const { data: roomsList } = await useFetch('/rooms', {
  baseURL: apiUrl,
  transform: (response: {
    status: true
    result: Room[]
  }) => {
    const { result } = response
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    router.push('/')
  },
})
</script>

<template>
  <div class="container mt-4">
    <h2>房型 index {{ route.fullPath }}</h2>
    <div class="row justify-content-center gy-3">
      <div v-for="room in roomsList" :key="room._id" class="col-8 col-md-6 col-lg-3">
        <div
          class="card h-100 shadow-sm"
          @click="router.push(`/room/${room._id}`)"
        >
          <img :src="room.imageUrl" class="card-img-top" alt="Room Image">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">
              {{ room.name }}
            </h3>
            <p class="card-text flex-grow-1">
              {{ room.description }}
            </p>
            <ul class="list-unstyled">
              <li><strong>面積:</strong> {{ room.areaInfo }}</li>
              <li><strong>床型:</strong> {{ room.bedInfo }}</li>
              <li><strong>最大容納人數:</strong> {{ room.maxPeople }}</li>
              <li><strong>價格:</strong> {{ room.price }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-img-top {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
