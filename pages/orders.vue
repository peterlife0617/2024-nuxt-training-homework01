<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const token = useCookie('auth')
const router = useRouter()
function logout() {
  token.value = ''
  router.push('/login')
}
</script>

<template>
  <div>Page: orders</div>
  <button @click="logout">
    登出
  </button>
</template>

<style scoped lang="scss"></style>
