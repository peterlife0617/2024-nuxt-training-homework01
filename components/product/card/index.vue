<script setup lang="ts">
defineProps({
  imageSrc: String,
  altText: String,
  title: String,
  price: String,
  buttonText: String,
})
</script>

<template>
  <div class="product-card">
    <ProductCardImage
      :image-src="imageSrc"
      :alt-text="altText"
    />
    <ProductCardTitle :title="title" />
    <ProductCardPrice :price="price" />
    <ProductCardButton :button-text="buttonText" />
  </div>
</template>

<style scoped lang="scss">
.product-card {
  max-width: 300px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}
</style>
