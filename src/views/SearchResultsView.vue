<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <h2 class="text-xl font-semibold mb-4">🔍「{{ keyword }}」的搜尋結果</h2>

    <section v-if="results.length > 0">
      <ul>
        <li v-for="course in results" :key="course.id" class="mb-4">
          <router-link :to="`/courses/${course.id}`" class="text-purple-600">
            {{ course.title }}
          </router-link>
          <p class="text-sm text-gray-600">{{ course.description }}</p>
        </li>
      </ul>
    </section>
    <p v-else class="text-gray-500">找不到相關課程</p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyword = ref(route.query.q || '')
const results = ref([])

watchEffect(async () => {
  if (!keyword.value.trim()) return

  const res = await fetch('/api/courses')
  const data = await res.json()
  const allCourses = data.courses

  // 在這裡加入過濾邏輯
  results.value = allCourses.filter((course) => {
    return (
      course.title.includes(keyword.value) ||
      course.description.includes(keyword.value)
    )
  })
})
</script>
