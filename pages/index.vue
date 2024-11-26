<script setup lang="ts">
import type { Modal, Offcanvas } from 'bootstrap'

const { $modal, $offcanvas } = useNuxtApp()

// modal
const modalRef = ref<HTMLElement | null>(null)
const modal = shallowRef<Modal | null>(null)
function showModal() {
  // 開啟 modal
  modal.value?.show()
}
function closeModal() {
  // 關閉 modal
  modal.value?.hide()
}

// offcanvas

const offcanvasRef = ref<HTMLElement | null>(null)
const offcanvas = shallowRef<Offcanvas | null>(null)

function showOffcanvas() {
  // 開啟 offcanvas
  offcanvas.value?.show()
}
function closeOffcanvas() {
  // 關閉 offcanvas
  offcanvas.value?.hide()
}

onMounted(() => {
  // 初始化 modal 與 offcanvas 元件
  if (modalRef.value) {
    modal.value = new $modal(modalRef.value)
  }
  if (offcanvasRef.value) {
    offcanvas.value = new $offcanvas(offcanvasRef.value)
  }
})
</script>

<template>
  <div class="container mb-5">
    <button type="button" class="btn btn-primary" @click="showModal">
      開啟 Modal
    </button>
  </div>
  <!-- modal 元件 -->
  <div
    id="staticBackdrop"
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">
            Modal title
          </h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          />
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button type="button" class="btn btn-primary">
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <button type="button" class="btn btn-secondary" @click="showOffcanvas">
      開啟 Offcanvas
    </button>
  </div>
  <!-- Offcanvas  元件 -->
  <div
    id="offcanvasBottom"
    ref="offcanvasRef"
    class="offcanvas offcanvas-bottom"
    tabindex="-1"
    aria-labelledby="offcanvasBottomLabel"
  >
    <div class="offcanvas-header">
      <h3 id="offcanvasBottomLabel" class="offcanvas-title">
        Offcanvas bottom
      </h3>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeOffcanvas"
      />
    </div>
    <div class="offcanvas-body small">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius
      perferendis illum cum vero cumque totam repudiandae accusantium facere est
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
