<template>
  <nav class="bg-gray-100 border-b">
    <div class="max-w-screen-xl mx-auto px-6 py-2 flex space-x-6">
      <!-- Explore dropdown -->
      <div
        class="relative"
        @mouseenter="showExplore = true"
        @mouseleave="showExplore = false"
      >
        <button class="text-sm font-medium">探索課程 ▼</button>
        <div
          v-if="showExplore"
          class="absolute bg-white shadow-md rounded mt-2 p-3 z-10"
        >
          <ul>
            <li
              v-for="category in courseCategories"
              :key="category.id"
              @click="goToCategory(category.id)"
              class="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Static links -->
      <router-link to="/courses/latest" class="text-sm hover:text-purple-600"
        >課程套裝</router-link
      >
      <router-link to="/courses/" class="text-sm hover:text-purple-600"
        >推薦課程</router-link
      >
      <router-link to="/blog" class="text-sm hover:text-purple-600"
        >部落格</router-link
      >
      <router-link to="/about" class="text-sm hover:text-purple-600"
        >關於我們</router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const showExplore = ref(false)
const courseCategories = ref([])

onMounted(async () => {
  const res = await axios.get('/api/categories')
  courseCategories.value = res.data.categories
})

function goToCategory(id) {
  router.push({ name: 'CoursesCategory', params: { categoryId: id } })
  showExplore.value = false
}
</script>
