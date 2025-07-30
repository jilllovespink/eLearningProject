<template>
  <section class="relative">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="{ clickable: true }"
      :modules="[Autoplay, Pagination]"
      class="h-[300px] md:h-[400px] lg:h-[500px]"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div
          class="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules' // ✅ 引入 Pagination

import 'swiper/css'
import 'swiper/css/pagination'

// 用圖片作為內容（文字已內嵌在圖內）
const slides = [
  {
    image: 'https://i.ibb.co/BHjKX4vb/Screenshot-2025-07-28-163239.png',
  },
  {
    image: 'https://i.ibb.co/BHjKX4vb/Screenshot-2025-07-28-163239.png',
  },
  {
    image: 'https://i.ibb.co/BHjKX4vb/Screenshot-2025-07-28-163239.png',
  },
]
</script>
