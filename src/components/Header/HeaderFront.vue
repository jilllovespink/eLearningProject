<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div
      class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3"
    >
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-black">
        Learning<span class="text-blue-600">@</span>
      </router-link>

      <!-- Search -->
      <div class="flex-1 mx-2 max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="submitSearch"
          class="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search courses, instructors, topics..."
        />
      </div>

      <!-- User -->
      <div class="space-x-3 flex items-center">
        <router-link
          to="/login"
          class="text-sm font-medium text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >Register</router-link
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
