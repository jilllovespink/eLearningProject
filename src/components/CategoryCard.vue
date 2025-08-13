<template>
  <div
    class="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition duration-300 group"
  >
    <div
      class="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-50 overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105"
    >
      <!-- 直接用傳入的 icon class -->
      <i :class="icon" class="text-2xl text-blue-600"></i>
    </div>
    <h3
      class="text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-blue-600"
    >
      {{ name }}
    </h3>
    <p class="text-gray-500 text-sm">{{ total }} courses</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  icon: String,
  total: Number,
})
</script>
