<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const { data: rooms } = await useFetch<{ status: true, result: any[] }>('/api/v1/rooms', {
  baseURL: 'https://nuxr3.zeabur.app',
})
</script>

<template>
  <div class="container mt-5">
    <ul class="list-unstyled">
      <li
        v-for="room in rooms?.result"
        :key="room._id"
        class="card flex-lg-row mb-3"
      >
        <div class="row w-100">
          <div class="col-lg-6">
            <Swiper
              :loop="true"
              :slides-per-view="1"
              :pagination="{ el: '.swiper-pagination', type: 'bullets', clickable: true }"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
              :autoplay="{ delay: 5000 }"
              :modules="[Navigation, Pagination, Autoplay]"
            >
              <SwiperSlide v-for="(imageUrl, index) in room.imageUrlList" :key="index">
                <img
                  :src="imageUrl"
                  :alt="`圖片${index}`"
                >
              </SwiperSlide>
              <pre>
              {{ room.imageUrlList }}
            </pre>
            </swiper>
          </div>
          <div class="col-lg-6">
            <div class="card-body">
              <h3 class="card-title fs-2 fw-bold">
                {{ room.name }}
              </h3>
              <p class="card-text fw-medium">
                {{ room.description }}
              </p>
              <ul class="d-flex gap-4 list-unstyled mb-5">
                <li class="card-info border rounded-3 p-3">
                  <Icon
                    class="mb-2 fs-5 text-primary-100"
                    icon="fluent:slide-size-24-filled"
                  />
                  <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                    {{ room.areaInfo }}
                  </p>
                </li>
                <li class="card-info border rounded-3 p-3">
                  <Icon class="mb-2" icon="material-symbols:king-bed" />
                  <p class="mb-0 fw-bold">
                    {{ room.bedInfo }}
                  </p>
                </li>
                <li class="card-info border rounded-3 p-3">
                  <Icon class="mb-2" icon="ic:baseline-person" />
                  <p class="mb-0 fw-bold">
                    2-{{ room.maxPeople }} 人
                  </p>
                </li>
              </ul>
              <p class="mb-0 fw-bold">
                NT$ {{ room.price }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
