<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div
      class="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto"
    >
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-purple-600">
        <img
          src="https://i.ibb.co/zdvz158/Screenshot-2025-07-24-161321.png"
          alt="Logo"
          class="h-6 inline-block"
        />
      </router-link>

      <!-- Search -->
      <div class="flex-1 px-6">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="submitSearch"
          class="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
          placeholder="搜尋課程、講師或文章"
        />
      </div>

      <!-- User -->
      <div class="flex items-center space-x-4">
        <router-link to="/login" class="text-sm font-medium">登入</router-link>
        <router-link to="/register" class="text-sm font-medium text-purple-600"
          >註冊</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

function submitSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchResults', query: { q: searchQuery.value } })
  }
}
</script>
