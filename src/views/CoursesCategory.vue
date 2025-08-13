<template>
  <div class="container mx-auto py-8">
    <div v-if="category">
      <h1>{{ category.name }}</h1>
      <p>{{ category.description }}</p>

      <section v-if="filteredCourses.length > 0">
        <h2>課程列表</h2>
        <ul>
          <li
            v-for="course in filteredCourses"
            :key="course.id"
            class="mb-4 p-4 border rounded cursor-pointer"
            @click="goToCourseDetail(course.id)"
          >
            <CourseCard :course="course" />
          </li>
        </ul>
      </section>
      <section v-else class="text-gray-500">此分類下尚無課程</section>
    </div>
    <div v-else class="text-center text-gray-500 py-10">載入中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CourseCard from '@/components/CourseCard.vue';

import { database } from '@/services/firebase';
import { get, ref as dbRef } from 'firebase/database';

const route = useRoute();
const router = useRouter();

const category = ref(null);
const allCourses = ref([]);

const currentCategoryId = computed(() => route.params.id);

const filteredCourses = computed(() => {
  return allCourses.value.filter(course => course.category?.id === currentCategoryId.value);
});

async function fetchCategory(id) {
  const snap = await get(dbRef(database, `categories/${id}`));
  return snap.exists() ? snap.val() : null;
}

async function fetchCourses() {
  const snap = await get(dbRef(database, 'courses'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, course]) => ({
    id,
    ...course
  }));
}

async function fetchData() {
  try {
    const [categoryData, courseData] = await Promise.all([
      fetchCategory(currentCategoryId.value),
      fetchCourses()
    ]);
    category.value = categoryData;
    allCourses.value = courseData;
  } catch (err) {
    console.error("讀取資料失敗", err);
  }
}

onMounted(fetchData);
watch(() => route.params.id, fetchData);

function goToCourseDetail(id) {
  router.push(`/courses/${id}`);
}
</script>
