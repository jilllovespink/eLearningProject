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

const instructor = ref(null);
const route = useRoute();

onMounted(async () => {
  const id = route.params.id;

  try {
  const res = await fetch(`/api/instructors/${id}`);
  const data = await res.json();
  instructor.value = data.instructor;
  } catch(error){
        console.error("讀取講師資料失敗", error);
  }
});
</script>
