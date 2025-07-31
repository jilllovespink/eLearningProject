<template>
  <section class="py-16 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Top-Selling Courses</h2>
      <p class="text-gray-600 text-lg">
        Discover our most popular courses chosen by thousands of learners
      </p>
    </div>

    <div
      v-if="topCourses.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <CourseCard
        v-for="course in topCourses"
        :key="course.id"
        :course="course"
      />
    </div>
    <div v-else class="text-center text-gray-500">Loading...</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { database } from '../services/firebase'
import { get, ref as dbRef } from 'firebase/database'
import CourseCard from './CourseCard.vue'

const topCourses = ref([])

onMounted(async () => {
  try {
    // 同步抓取所有課程與所有講師
    const [coursesSnap, instructorsSnap] = await Promise.all([
      get(dbRef(database, 'courses')),
      get(dbRef(database, 'instructors')),
    ])

    if (coursesSnap.exists() && instructorsSnap.exists()) {
      const courseData = coursesSnap.val()
      const instructorData = instructorsSnap.val()

      // 把課程物件轉成陣列格式
      const courseArray = Object.entries(courseData).map(([id, value]) => ({
        id,
        ...value,
      }))

      // 按照 students 排序取前 3 名
      const top3 = courseArray
        .filter(c => typeof c.students === 'number')
        .sort((a, b) => b.students - a.students)
        .slice(0, 3)

      // 把對應的 instructor name 補進每堂課的 instructor 欄位
      const topWithInstructor = top3.map(course => {
        const instructorId = course.instructorId
        const instructorInfo = instructorData[instructorId] || { name: 'Unknown' }

        return {
          ...course,
          instructor: instructorInfo, // 包含 name
        }
      })

      topCourses.value = topWithInstructor
    }
  } catch (err) {
    console.error('讀取課程或講師失敗:', err)
  }
})
</script>
