<template>
  <div
    class="course-card p-4 border rounded shadow hover:shadow-md cursor-pointer"
  >
    <h2 class="text-xl font-semibold mb-2">{{ course.name }}</h2>
    <p class="text-gray-600">{{ course.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
  },
});
</script>
