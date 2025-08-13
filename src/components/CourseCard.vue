<template>
  <div
    class="group rounded-xl overflow-hidden shadow-md border hover:shadow-2xl transition duration-300 relative bg-white w-full max-w-sm"
  >
    <div class="relative overflow-hidden">
      <img
        :src="course.imgURL"
        :alt="course.title"
        class="w-full h-48 object-cover rounded mb-4  transform transition-transform duration-300 group-hover:scale-105"
      />
      <div class="p-4">
        <h2
          class="text-lg font-semibold mb-1  transition-colors duration-300 group-hover:text-blue-600"
        >
          {{ course.title }}
        </h2>
        <p class="text-sm text-gray-600 mb-3">{{ course.description }}</p>
        <p v-if="course.instructor?.name" class="text-sm text-gray-500">
          by {{ course.instructor.name }}
        </p>
        <br />
        <div class="flex items-center text-sm text-gray-500 space-x-4 mb-4">
          <div class="flex items-center">
            <span class="text-yellow-500">★</span>
            <span class="ml-1">{{ course.rating }}</span>
          </div>
          <div class="flex items-center">
            <span class="fas fa-user mr-1"></span>
            <span class="ml-1">{{ course.students }}</span>
          </div>
          <div class="flex items-center">
            <span class="fas fa-clock mr-1"></span>
            <span class="ml-1">{{ course.duration }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold text-gray-900">${{ course.price }}</div>
          <button
            class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
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
