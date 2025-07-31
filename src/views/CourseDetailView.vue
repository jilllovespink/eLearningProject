<template>
  <div v-if="course">
    <h1>{{ course.title }}</h1>
    <p>{{ course.description }}</p>

    <section v-if="instructor">
      <h2>講師介紹</h2>
      <router-link
        :to="{ name: 'InstructorDetailView', params: { id: course.instructorId } }"
      >
        {{ instructor.name }}
      </router-link>
      <p>{{ instructor.bio }}</p>
    </section>
  </div>
  <div v-else class="text-center text-gray-500 py-10">載入中...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { database } from "@/services/firebase";
import { ref as dbRef, get } from "firebase/database";

const course = ref(null);
const route = useRoute();
const instructor = ref(null);


onMounted(async () => {
  const courseId = route.params.id;

  try {
  const courseSnap = await get(dbRef(database, `courses/${courseId}`));
    if (courseSnap.exists()) {
      course.value = courseSnap.val();
// 如果有講師 ID，讀取講師資料

      const instructorId = course.value.instructorId;
      if (instructorId) {
        const instructorSnap = await get(
          dbRef(database, `instructors/${instructorId}`)
        );
        if (instructorSnap.exists()) {
          instructor.value = instructorSnap.val();
        }else {
          console.warn(`找不到講師 ID 為 ${instructorId} 的資料`);
      }}
    }else {
      console.warn(`找不到課程 ID 為 ${courseId} 的資料`);
    }

  } catch(error){
        console.error("讀取課程失敗", error);
  }
});
</script>
