<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        Navbar
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">
              首頁
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/room">
              房型
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="container">
    <slot />
  </main>
</template>

<style scoped lang="scss"></style>
