<template>
  <div class="flex flex-col min-h-screen">
    <HeroCarousel />
    <main class="flex-1">
      <router-view />
      <BestSellingSection />
      <PopularInstructors />
      <HotArticles />
      <AllCategorySection />
    </main>
  </div>
</template>
<script setup>
import BestSellingSection from '@/components/BestSellingSection.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
import PopularInstructors from '@/components/PopularInstructors.vue'
import HotArticles from '@/components/HotArticles.vue'
import AllCategorySection from '@/components/AllCategorySection.vue'
</script>
