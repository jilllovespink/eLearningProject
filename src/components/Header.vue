<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div
      class="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto"
    >
      <!-- Logo -->
      <router-link to="/" class="text-xl font-bold text-purple-600">
        <img src="/logo.png" alt="Logo" class="h-6 inline-block" />
      </router-link>

      <!-- Explore Dropdown -->
      <div
        class="relative"
        @mouseenter="showExplore = true"
        @mouseleave="showExplore = false"
      >
        <button class="text-sm font-medium">Explore</button>
        <div
          v-if="showExplore"
          class="absolute bg-white shadow-lg mt-2 rounded p-3 w-60"
        >
          <ul>
            <li
              v-for="category in courseCategories"
              :key="category.id"
              class="hover:bg-gray-100 px-2 py-1 cursor-pointer"
              @click="goToCategory(category.id)"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="flex-1 px-6">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="submitSearch"
          class="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
          placeholder="Search for courses, instructors, articles..."
        />
      </div>

      <!-- Buttons -->
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showExplore = ref(false);
const searchQuery = ref('');

// 假資料 - 你可從後端 API 獲得
const courseCategories = ref([
  { id: 'dev', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
]);

function submitSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchResults', query: { q: searchQuery.value } });
  }
}

function goToCategory(id) {
  router.push({ name: 'CoursesCategory', params: { categoryId: id } });
  showExplore.value = false;
}
</script>
