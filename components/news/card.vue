<script setup lang="ts">
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: String,
  title: String,
  image: String,
  description: String,
  createdAt: String,
  updatedAt: String,
})
</script>

<template>
  <div class="card">
    <div class="card-image">
      <img :src="image" :alt="title">
    </div>
    <div class="card-body">
      <h3 class="card-title">
        {{ title }}
      </h3>
      <p class="card-description">
        {{ description }}
      </p>
      <div class="card-timestamps">
        <p><strong>Created At:</strong> {{ createdAt?.split("T")[0] }}</p>
        <p><strong>Updated At:</strong> {{ updatedAt?.split("T")[0] }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  margin: 20px 0;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);

  &-image {
    flex: 1;
    max-width: 40%;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-body {
    flex: 2;
    padding: 20px;
  }
  &-title {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  &-description {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
  }

  &-timestamps {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 0.875rem;
    color: #888;

    p {
      margin: 5px 0;
    }
  }
}
</style>
