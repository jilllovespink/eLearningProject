<!-- src/components/VideoPlayer.vue -->
<template>
  <div
    class="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-white"
  >
    <iframe
      :src="videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      class="w-full h-full"
    ></iframe>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
})
</script>
