<template>
  <div v-if="course">
    <h1>{{ course.name }}</h1>
    <p>{{ course.description }}</p>

    <h2>講師介紹</h2>
    <!-- <router-link
        :to="{ name: 'InstructorDetailView', params: { id: course.instructor.id } }"
      > -->
    <p>{{ course.instructor }}</p>
    <!-- </router-link> -->
    <!-- <p>{{ course.instructor.bio }}</p> -->
    <!-- </section> -->
  </div>
  <div v-else class="text-center text-gray-500 py-10">載入中...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const course = ref(null);
const route = useRoute();

onMounted(async () => {
  const id = route.params.id;

  try {
  const res = await fetch(`/api/courses/${id}`);
  const data = await res.json();
  course.value = data.course;
  } catch(error){
        console.error("讀取課程失敗", error);
  }
});
</script>
