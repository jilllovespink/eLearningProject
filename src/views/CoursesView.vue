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


const courses = ref([])
const router = useRouter();


onMounted(async () => {
  const res = await fetch('/api/courses')
  const data = await res.json()
  courses.value = data.courses
});

function goToCourseDetail(id){
  router.push(`/courses/${id}`)
}
</script>
