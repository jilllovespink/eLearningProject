<template>
  <header class="bg-[rgb(250,253,255)] shadow sticky top-0 z-50">
    <div
      class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3"
    >
      <!-- Mobile: menu button -->
      <button
        class="md:hidden p-2 rounded-md hover:bg-gray-100"
        @click="toggleMenu"
        aria-label="Open Menu"
      >
        <MenuIcon class="w-6 h-6 text-gray-700" />
      </button>

      <RouterLink to="/" class="shrink-0 flex items-center gap-3">
        <img
          class="h-12 w-auto"
          alt="公司 Logo"
          src="https://firebasestorage.googleapis.com/v0/b/course-platform-3fe65.firebasestorage.app/o/logo%2FScreenshot%202025-08-08%20143740.png?alt=media&token=89412ffa-1484-4931-b05e-eabf9d1d188d"
        />
      </RouterLink>

      <!-- Middle group (Discover → Search → links) -->
      <div class="flex-1 hidden md:flex items-center gap-6 min-w-0">
        <!-- Discover Dropdown -->
        <DropdownMenu
          label="Discover"
          :onItemClick="(item) => router.push({ name: 'AllCourses', query: { category: item.id } })"
        />

        <!-- Search -->
        <div class="flex-shrink-0 w-full max-w-sm">
          <form @submit.prevent="submitSearch">
            <input
              type="text"
              v-model="searchQuery"
              @keyup.enter="submitSearch"
              class="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              placeholder="Search courses, instructors, topics..."
            />
          </form>
        </div>

        <!-- Static links -->
        <router-link
          to="/courses"
          class="text-sm hover:text-blue-600 whitespace-nowrap"
        >
          All Courses
        </router-link>
        <router-link
          to="/about"
          class="text-sm hover:text-blue-600 whitespace-nowrap"
        >
          About Us
        </router-link>
      </div>

      <!-- User -->
      <div class="ml-auto flex items-center gap-3">
        <router-link
          to="/login"
          class="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >Login</router-link
        >
      </div>
    </div>

    <!-- Mobile drawer -->
    <MobileMenu
      v-if="isMenuOpen"
      :isOpen="isMenuOpen"
      @close="isMenuOpen = false"
    >
    </MobileMenu>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount  } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import DropdownMenu from '@/components/DropdownMenu.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import { Menu as MenuIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const router = useRouter()

function submitSearch() {
  const q = searchQuery.value.trim()
  if (q) router.push({ name: 'SearchResults', query: { q } })
  }

/* discover categories */
const courseCategories = ref([])
onMounted(async () => {
  const res = await axios.get('/api/categories')
  courseCategories.value = res.data.categories
})
function goToCategory(item) {
  router.push({ name: 'CoursesCategories', params: { id: item.id } })
}

/* mobile menu */
const isMenuOpen = ref(false)
function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
function handleResize() {
  if (window.innerWidth >= 768 && isMenuOpen.value) isMenuOpen.value = false
}
onMounted(() => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
</script>
