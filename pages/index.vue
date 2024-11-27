<script setup lang="ts">
const isLoading = ref(false)

function openLoading() {
  isLoading.value = true

  // 開啟讀取效果
  // ($loading as any).show()
  setTimeout(() => {
    // 關閉讀取效果
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <button type="button" @click="openLoading">
    開啟 Loading 效果
  </button>
  <ClientOnly>
    <Loading
      v-model:active="isLoading"
    />
  </ClientOnly>
</template>

<style scoped lang="scss"></style>
