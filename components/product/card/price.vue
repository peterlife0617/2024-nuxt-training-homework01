<script setup lang="ts">
defineProps({
  price: String,
})
</script>

<template>
  <p class="product-price">
    {{ price }}
  </p>
</template>

<style scoped lang="scss">
.product-price {
  margin-bottom: 16px;
  font-size: 16px;
  color: #007bff;
  text-align: center;
}
</style>
