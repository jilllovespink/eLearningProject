<template>
  <div
    v-if="isOpen"
    class="absolute top-full left-0 w-full bg-white shadow-md z-50  px-4 py-3"
  >
    <nav class="flex flex-col space-y-3 text-gray-800 text-base">
      <router-link
        to="/courses/"
        class="block px-4 py-2 rounded hover:bg-gray-100 transition
"
        @click="$emit('close')"
        >All Courses</router-link
      >

      <router-link
        to="/about"
        class="block px-4 py-2 rounded hover:bg-gray-100 transition
"
        @click="$emit('close')"
        >About Us</router-link
      >
    </nav>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
})
</script>
