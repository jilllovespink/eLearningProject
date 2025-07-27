<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div
      class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3"
    >
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-blue-600">
        Skill<span class="text-black">Hub</span>
      </router-link>

      <!-- Search -->
      <div class="hidden md:block flex-1 mx-6">
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
        <router-link to="/login" class="text-sm font-medium text-gray-700"
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
