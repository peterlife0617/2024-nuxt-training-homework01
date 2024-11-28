<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <h2 class="product-title">
    {{ title }}
  </h2>
</template>

<style scoped lang="scss">
.product-title {
  margin: 16px 0 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
