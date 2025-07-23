<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div
      class="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto"
    >
      <!-- Logo
      <router-link to="/" class="text-xl font-bold text-purple-600">
        <img src="/logo.png" alt="Logo" class="h-6 inline-block" />
      </router-link> -->

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

      <div class="flex items-center space-x-6">
        <!-- 下拉選單 -->
        <div
          class="relative"
          @mouseenter="showMenu = true"
          @mouseleave="showMenu = false"
        >
          <button class="text-sm font-medium">品牌後台</button>
          <div
            v-if="showMenu"
            class="absolute right-0 mt-2 bg-white shadow-lg rounded p-2 w-56 z-50"
          >
            <ul>
              <li
                v-for="item in brandMenu"
                :key="item.name"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                @click="goTo(item.path)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 登出 -->
      <button class="text-sm font-medium text-red-500" @click="logout">
        登出
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'

import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore()

const showMenu  = ref(false);
const searchQuery = ref('');
const courseCategories = ref([]);


const brandMenu = [
  { name: 'Dashboard', path: '/brand/dashboard' },
  { name: '數據分析', path: '/brand/dashboard/analytics' },
  { name: '文章管理', path: '/brand/dashboard/articles' },
  { name: '新增文章', path: '/brand/dashboard/articles/new' },
  { name: '編輯文章', path: '/brand/dashboard/articles/edit' },
  { name: '編輯課程', path: '/brand/courses/:id/edit' },
  { name: '編輯講師', path: '/brand/dashboard/instructors/:id/edit' },
  { name: '優惠管理', path: '/brand/dashboard/discounts' },
]

function goTo(path) {
  showMenu.value = false
  router.push(path)
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
function logout() {
  authStore.logout()
  router.push('/')
}
</script>
