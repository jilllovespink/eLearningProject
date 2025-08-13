<template>
  <div v-if="instructor">
    <h1 class="text-2xl font-bold">{{ instructor.name }}</h1>
    <p class="mt-2 text-gray-700">{{ instructor.bio }}</p>
  </div>
  <div v-else class="text-center text-gray-500 py-10">載入中...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { database } from "@/services/firebase";
import { ref as dbRef, get } from "firebase/database";

const instructor = ref(null);
const route = useRoute();

onMounted(async () => {
  const id = route.params.id;

  try {
  const instructorSnap = await get(dbRef(database, `instructors/${id}`));
    if (instructorSnap.exists()) {
      instructor.value = instructorSnap.val();
    } else {
      console.warn("找不到講師資料");
    }
  } catch(error){
        console.error("讀取講師資料失敗", error);
  }
});
</script>
