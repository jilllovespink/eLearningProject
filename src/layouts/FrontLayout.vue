<template>
  <div class="flex flex-col min-h-screen">
    <SmartHeader />
    <HeroCarousel />
    <main class="flex-1">
      <router-view />
      <BestSellingSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import SmartHeader from '@/components/Header/SmartHeader.vue'
import BestSellingSection from '@/components/BestSellingSection.vue'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
</script>
