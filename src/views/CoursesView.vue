<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">所有課程</h1>
    <ul>
      <li
        v-for="course in courses"
        :key="course.id"
        class="mb-4 p-4 border rounded"
        @click="goToCourseDetail(course.id)"
      >
        <CourseCard :course="course" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CourseCard from '@/components/CourseCard.vue';
import { useRouter } from 'vue-router';
import { getAllCourses } from '@/services/firebaseCourseService'



const courses = ref([])
const router = useRouter();


onMounted(async () => {
  courses.value = await getAllCourses()
});

function goToCourseDetail(id){
  router.push(`/courses/${id}`)
}
</script>
