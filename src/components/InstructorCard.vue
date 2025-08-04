<template>
  <div
    class="group bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-2xl transition duration-300 w-full max-w-xs"
  >
    <img
      :src="instructor.instructorURL"
      :alt="instructor.name"
      class="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-4 border-blue-100 group-hover:border-blue-400 transition duration-300"
    />
    <h3 class="text-lg font-semibold">{{ instructor.name }}</h3>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ instructor.bio }}
    </p>

    <div class="flex justify-center space-x-4 text-sm text-gray-600 mb-4">
      <div class="flex items-center space-x-1">
        <span class="fa-solid fa-book"></span>
        <span>{{ instructor.courseCount }}</span>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-4">
      <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
        {{ instructor.skills }}
      </span>
    </div>

    <button
      class="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-1 rounded-md text-sm"
    >
      View Profile
    </button>
  </div>
</template>

<script setup>
defineProps({
  instructor: {
    type: Object,
    required: true
  }
});
</script>
