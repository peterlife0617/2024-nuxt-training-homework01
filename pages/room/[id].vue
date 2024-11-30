<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { id } = route.params

const { selectedRoom: data } = storeToRefs(useBookingStore())
const { setRoomOnServer } = useBookingStore()

// 將房型資料 data 改成使用 Pinia 管理
const { error } = await useAsyncData(`room-data`, async () => {
  if (id) {
    return await setRoomOnServer(id.toString()).then(() => true)
  }

  throw new Error('沒有房型 ID')
})

if (error.value) {
  alert('發生錯誤 ! ')
  router.push('/room')
}

const isProvide = function (isProvideBoolean = false) {
  return isProvideBoolean ? '提供' : '未提供'
}
</script>

<template>
  <div class="container">
    <h2>房型詳細頁面</h2>
    <button class="btn btn-outline-primary" @click="router.go(-1)">
      回上一頁
    </button>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <!-- 以 Pinia 的資料渲染 HTML  -->
        <div v-if="data" class="room-page">
          <div class="room-header">
            <h1 class="room-name">
              {{ data.name }}
            </h1>
            <p class="room-description">
              {{ data.description }}
            </p>
          </div>

          <div class="room-gallery">
            <img
              :src="data.imageUrl"
              :alt="data.name"
              class="room-main-image"
            >
            <ul class="room-image-list">
              <li v-for="(imageUrl, index) in data.imageUrlList" :key="index">
                <img :src="imageUrl" :alt="`${data.name}圖片${index + 1}`">
              </li>
            </ul>
            <NuxtLink class="btn btn-lg btn-warning" to="/booking">
              立即預約
            </NuxtLink>
          </div>

          <div class="room-info">
            <div class="info-block">
              <h2>房間資訊</h2>
              <p>面積: {{ data.areaInfo }}</p>
              <p>床型: {{ data.bedInfo }}</p>
              <p>最多容納人數: {{ data.maxPeople }}</p>
              <p>價格: {{ data.price }}</p>
            </div>

            <div class="info-block">
              <h2>房間配置</h2>
              <ul>
                <li v-for="layout in data.layoutInfo" :key="layout.title">
                  {{ layout.title }}: {{ isProvide(layout.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>房內設施</h2>
              <ul>
                <li v-for="facility in data.facilityInfo" :key="facility.title">
                  {{ facility.title }}: {{ isProvide(facility.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>客房備品</h2>
              <ul>
                <li v-for="amenity in data.amenityInfo" :key="amenity.title">
                  {{ amenity.title }}: {{ isProvide(amenity.isProvide) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.room-page {
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}

.room-header {
  margin-bottom: 30px;
  text-align: center;
}

.room-name {
  font-size: 2rem;
  color: #333;
}

.room-description {
  font-size: 1rem;
  color: #666;
}

.room-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.room-main-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

.room-image-list {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 0;
  list-style: none;
}

.room-image-list img {
  width: 100px;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.3s;
}

.room-image-list img:hover {
  transform: scale(1.1);
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-block {
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.info-block h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #444;
}

.info-block p,
.info-block ul {
  font-size: 1rem;
  color: #555;
}

.info-block ul {
  padding-left: 0;
  list-style: none;
}

.info-block ul li {
  margin-bottom: 5px;
}
</style>
