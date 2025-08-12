<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-semibold text-center mb-2">
        Popular Instructors
      </h2>
      <p class="text-center text-gray-500 mb-10">
        Learn from industry experts and experienced professionals
      </p>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"
      >
        <InstructorCard
          v-for="instructor in topInstructors"
          :key="instructor.id"
          :instructor="instructor"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InstructorCard from './InstructorCard.vue';
import { getDatabase, ref as dbRef, child, get } from 'firebase/database';

const topInstructors = ref([]);

onMounted(async () => {
  const db = getDatabase();
  const snapshot = await get(child(dbRef(db), 'instructors'));

  if (snapshot.exists()) {
    const instructorData = snapshot.val();

    // 轉成陣列 + 根據 courseCount 排序取前 4 名
    topInstructors.value = Object.values(instructorData)
      .sort((a, b) => b.courseCount - a.courseCount)
      .slice(0, 4);
  } else {
    console.warn("No instructor data found.");
  }
});
</script>
