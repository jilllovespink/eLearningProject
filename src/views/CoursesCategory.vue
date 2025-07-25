<template>
  <div class="container mx-auto py-8">
    <div v-if="categories">
      <h1>{{ categories.name }}</h1>
      <p>{{ categories.description }}</p>

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
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CourseCard from '@/components/CourseCard.vue';

const categories = ref(null);
const filteredCourses = ref([]);
const allCourses = ref([]);


const route = useRoute();
const router = useRouter();

const fetchData = async (categoryId) => {
  try {
    const categoryRes = await fetch(`/api/categories/${categoryId}`);
    const categoryData = await categoryRes.json();
    categories.value = categoryData.category;

    const courseRes = await fetch("/api/courses");
    const courseData = await courseRes.json();
    allCourses.value = courseData.courses;

    filteredCourses.value = allCourses.value.filter((course) => {
      return course.category?.id === categoryId;
    });
  } catch (error) {
    console.error("讀取分類或課程失敗", error);
  }
};
onMounted(() => {
  fetchData(route.params.id);
});

  watch(
  () => route.params.id,
  (newId) => {
    fetchData(newId);
  }
);

const goToCourseDetail = (id) => {
  router.push(`/courses/${id}`);
};
</script>
