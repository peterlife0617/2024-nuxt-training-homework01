<script setup lang="ts">
defineProps({
  buttonText: String,
})
</script>

<template>
  <button class="product-button">
    {{ buttonText }}
  </button>
</template>

<style scoped lang="scss">
.product-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  text-align: center;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  border-radius: 0 0 8px 8px;
}

.product-button:hover {
  background-color: #0056b3;
}
</style>
