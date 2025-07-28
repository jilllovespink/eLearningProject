<template>
  <nav class="bg-gray-100 sticky top-0 border-b border-gray-200 z-40">
    <div
      class="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-center relative"
    >
      <div class="hidden md:flex items-center space-x-6 text-sm">
        <DropdownMenu
          label="探索課程"
          :items="courseCategories"
          :onItemClick="goToCategory"
        />

        <!-- Static links -->
        <router-link to="/promotions" class="text-sm hover:text-blue-600"
          >課程套裝</router-link
        >
        <router-link to="/courses/" class="text-sm hover:text-blue-600"
          >所有課程</router-link
        >
        <router-link to="/articles" class="text-sm hover:text-blue-600"
          >部落格</router-link
        >
        <router-link to="/about" class="text-sm hover:text-blue-600"
          >關於我們</router-link
        >
      </div>
      <!-- Mobile toggle -->
      <div class="absolute left-4 md:hidden">
        <button
          @click="toggleMenu"
          class="p-2 rounded-md hover:bg-gray-200 transition"
        >
          <MenuIcon class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
    <MobileMenu
      md:hidden
      v-if="isMenuOpen"
      :isOpen="isMenuOpen"
      @close="isMenuOpen = false"
    />
  </nav>
</template>

<script setup>
import DropdownMenu from '@/components/DropdownMenu.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Menu as MenuIcon } from 'lucide-vue-next'
import MobileMenu from './MobileMenu.vue'


const router = useRouter()
const courseCategories = ref([])
const isMenuOpen = ref(false)


onMounted(async () => {
  const res = await axios.get('/api/categories')
  courseCategories.value = res.data.categories
})

function goToCategory(item) {
  router.push({ name: 'CoursesCategories', params: { id: item.id } })
}
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function handleResize() {
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
