<template>
  <div class="flex flex-col min-h-screen">
    <HeroCarousel />
    <main class="flex-1">
      <router-view />
      <BestSellingSection />
    </main>
  </div>
</template>
<script setup>
import BestSellingSection from '@/components/BestSellingSection.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
</script>
