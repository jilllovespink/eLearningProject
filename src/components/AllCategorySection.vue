<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          All Categories
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our wide range of course categories
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :name="category.name"
          :icon="category.icon"
          :total="category.total"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database'
import { app } from '@/services/firebase'
import CategoryCard from '@/components/CategoryCard.vue'

const categories = ref([])

onMounted(() => {
  const db = getDatabase(app)
  const categoriesRef = dbRef(db, 'categories')

  onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {

     const loadedCategories = Object.entries(data).map(([id, cat]) => ({
        id,
        name: cat.name,
        icon: cat.icon,
        total: cat.total,
      }))
    loadedCategories.push({
        id: 'all',
        name: 'All Courses',
        icon: 'fa-solid fa-globe', // 可根據設計更換
        total: loadedCategories.reduce((sum, c) => sum + (c.total || 0), 0) // 全部課程數量總和
      })

      categories.value = loadedCategories
    } else {
      categories.value = []
    }
  })
})
</script>
