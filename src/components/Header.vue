<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-lg font-bold">線上課程後台</h1>
    <button @click="handleLogout" class="text-sm text-gray-600 hover:underline">
      登出
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
