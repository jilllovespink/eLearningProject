<template>
  <div class="flex flex-col min-h-screen">
    <SmartHeader />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import SmartHeader from '@/components/Header/SmartHeader.vue'

import Footer from '@/components/Footer.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
</script>
