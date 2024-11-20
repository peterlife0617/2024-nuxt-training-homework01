<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const { id } = route.params

const { data: roomObject } = await useFetch(`/rooms/${id}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: { status: boolean, result: Record<string, any> }) => {
    const { result } = response
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    router.push('/')
  },
})

/*
請將 useSeoMeta({ }) 改成 Nuxt3 SEO 元件的寫法
重複邏輯的地方可以使用 computed

useSeoMeta({
  title: roomObject.value.name,
  titleTemplate: (title) => `Freyja | ${title}`,
  description: () => `${roomObject.value.description}`,
  ogTitle: () => `Freyja | ${roomObject.value.name}`,
  ogDescription: () => `${roomObject.value.description}`,
  ogImage: () => `${roomObject.value.imageUrl}`,
  ogUrl: () => `https://freyja.travel.com.tw/room/${roomObject.value._id}`,
  twitterCard: "summary_large_image",
  twitterTitle: () => `Freyja | ${roomObject.value.name}`,
  twitterDescription: () => `${roomObject.value.description}`,
  twitterImage: () => `${roomObject.value.imageUrl}`,
});
*/

const title = computed(() => `Freyja | ${roomObject.value?.name}`)
const description = computed(() => `${roomObject.value?.description}`)
const imageUrl = computed(() => `${roomObject.value?.imageUrl}`)

const isProvide = function (isProvideBoolean = false) {
  return isProvideBoolean ? '提供' : '未提供'
}
</script>

<template>
  <Head>
    <!-- 請在此處作答，使用元件設定頁面的 SEO Meta  -->
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:image" :content="imageUrl" />
    <Meta property="og:url" :content="`https://freyja.travel.com.tw/room/${roomObject?._id}`" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:image" :content="imageUrl" />
  </Head>

  <h2>房型詳細頁面</h2>
  <div class="container">
    <button @click="router.go(-1)">
      回上一頁
    </button>
    <div v-if="roomObject" class="row justify-content-center">
      <div class="col-lg-6">
        <div class="room-page">
          <div class="room-header">
            <h1 class="room-name">
              {{ roomObject.name }}
            </h1>
            <p class="room-description">
              {{ roomObject.description }}
            </p>
          </div>

          <div class="room-gallery">
            <img
              :src="roomObject.imageUrl"
              :alt="roomObject.name"
              class="room-main-image"
            >
            <ul class="room-image-list">
              <li v-for="(url, index) in roomObject.imageUrlList" :key="index">
                <img
                  :src="url"
                  :alt="`${roomObject.name}圖片${index + 1}`"
                >
              </li>
            </ul>
          </div>

          <div class="room-info">
            <div class="info-block">
              <h2>房間資訊</h2>
              <p>面積: {{ roomObject.areaInfo }}</p>
              <p>床型: {{ roomObject.bedInfo }}</p>
              <p>最多容納人數: {{ roomObject.maxPeople }}</p>
              <p>價格: {{ roomObject.price }}</p>
            </div>

            <div class="info-block">
              <h2>房間配置</h2>
              <ul>
                <li v-for="layout in roomObject.layoutInfo" :key="layout.title">
                  {{ layout.title }}: {{ isProvide(layout.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>房內設施</h2>
              <ul>
                <li
                  v-for="facility in roomObject.facilityInfo"
                  :key="facility.title"
                >
                  {{ facility.title }}: {{ isProvide(facility.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>客房備品</h2>
              <ul>
                <li
                  v-for="amenity in roomObject.amenityInfo"
                  :key="amenity.title"
                >
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
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.room-header {
  text-align: center;
  margin-bottom: 30px;
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
  border-radius: 10px;
  margin-bottom: 20px;
}

.room-image-list {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.room-image-list img {
  width: 100px;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
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
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
}

.info-block h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444;
}

.info-block p,
.info-block ul {
  font-size: 1rem;
  color: #555;
}

.info-block ul {
  list-style: none;
  padding-left: 0;
}

.info-block ul li {
  margin-bottom: 5px;
}
</style>
