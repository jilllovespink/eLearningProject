<template>
  <nav class="bg-gray-100 border-b">
    <div class="max-w-screen-xl mx-auto px-6 py-2 flex space-x-6 relative">
      <DropdownMenu
        label="探索課程"
        :items="courseCategories"
        :onItemClick="goToCategory"
      />

      <!-- Static links -->
      <router-link to="/courses/latest" class="text-sm hover:text-purple-600"
        >課程套裝</router-link
      >
      <router-link to="/courses/" class="text-sm hover:text-purple-600"
        >所有課程</router-link
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
import DropdownMenu from '@/components/DropdownMenu.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
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
