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

      <!-- Explore Dropdown -->
      <div
        class="relative"
        @mouseenter="showMenu = true"
        @mouseleave="showMenu = false"
      >
        <button class="text-sm font-medium">使用者後台</button>
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 bg-white shadow-lg rounded p-2 w-48 z-50"
        >
          <ul>
            <li
              v-for="item in userMenu"
              :key="item.name"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              @click="goTo(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Buttons -->

      <button class="text-sm font-medium text-red-500" @click="logout">
        登出
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const showMenu = ref(false);
const searchQuery = ref('');
const courseCategories = ref([]);

// make後台首頁變首項 突出顯眼
const userMenu = [
    { name: '後台首頁', path: '/user/dashboard' },
  { name: '使用者資料', path: '/user/dashboard/profile' },
  { name: '我的課程', path: '/user/dashboard/courses' },
  // { name: '觀看課程', path: '/user/player' },
]


function goTo(path) {
  showMenu.value = false
  router.push(path)
}

function logout() {
  authStore.logout()
  router.push('/')
}
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
