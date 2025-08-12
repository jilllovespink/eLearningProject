<template>
  <section class="relative m-0 p-0">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="{ clickable: true }"
      :modules="[Autoplay, Pagination]"
      class="h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div
          class="h-full w-full flex items-center justify-center bg-gray-50 overflow-hidden"
        >
          <img
            :src="slide.image"
            :alt="slide.alt || 'banner'"
            class="w-full h-full object-contain block"
            loading="eager"
            decoding="async"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// 用圖片作為內容（文字已內嵌在圖內）
const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/course-platform-3fe65.firebasestorage.app/o/Screenshot%202025-08-12%20134703.png?alt=media&token=66b56dab-3c83-476f-9f75-4fd80eb710c3',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/course-platform-3fe65.firebasestorage.app/o/Screenshot%202025-08-12%20134724.png?alt=media&token=9b1e9875-24a1-440a-ac3c-cac20ed3508d',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/course-platform-3fe65.firebasestorage.app/o/Screenshot%202025-08-12%20134712.png?alt=media&token=07a2822b-7bb5-4a4a-8557-9f9d3e7f4ddc',
  },
]
</script>
