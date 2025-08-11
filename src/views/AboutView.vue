<!-- src/views/AboutUs.vue -->
<template>
  <div v-if="about">
    <!-- Hero -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4 text-center max-w-2xl">
        <div
          class="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4"
        >
          <span class="text-sm font-medium">{{ `Welcome to Learning @` }}</span>
        </div>
        <h1
          class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
        >
          {{ `Education for the`}}<br />
          <span class="text-blue-600">{{ `Digital Future` }}</span>
        </h1>
        <p class="text-lg text-gray-700">
          {{ `Make high-quality education accessible, engaging, and effective for learners through innovative technology and human-centered design.` }}
        </p>
      </div>
    </section>

    <!-- Who We Are -->
    <section class="bg-white py-12">
      <div
        class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        <!-- 左側：標題、內容、統計指標 -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ about.sections.whoWeAre.title }}
          </h2>
          <div class="space-y-4 mb-4">
            <p
              v-for="(para, idx) in about.sections.whoWeAre.content"
              :key="idx"
              class="text-lg text-gray-700"
            >
              {{ para }}
            </p>
          </div>
          <div class="flex space-x-8 mt-6">
            <div v-for="(m, i) in metrics" :key="i" class="text-center">
              <div class="text-4xl md:text-5xl font-extrabold text-blue-600">
                {{ m.value }}
              </div>
              <div class="text-sm text-gray-600 uppercase mt-1">
                {{ m.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右側：示意圖卡片 -->
        <div class="bg-blue-50 rounded-2xl p-6 flex justify-center">
          <img
            :src="about.sections.whoWeAre.imgURL"
            alt="Who We Are Illustration"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-100 py-12">
      <div class="container mx-auto px-4 max-w-7xl">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">
          {{ about.sections.whyChooseUs.title }}
        </h2>

        <swiper
          :modules="modules"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :space-between="24"
          :loop="true"
          :breakpoints="{
        0: { slidesPerView: 1 },       // 手機：一張
        640: { slidesPerView: 2 },     // 平板：兩張
        1024: { slidesPerView: 3 }     // 桌機：三張
      }"
          navigation
          :pagination="{ clickable: true }"
          class="pb-8"
        >
          <SwiperSlide
            v-for="(f,i) in about.sections.whyChooseUs.features"
            :key="i"
            class="flex flex-col items-start bg-gray-50 rounded-lg p-6"
          >
            <img
              :src="f.imgURL"
              alt="feature image"
              class="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ f.title }}</h3>
            <p class="text-gray-700 text-sm">{{ f.description }}</p>
          </SwiperSlide>
        </swiper>
      </div>
    </section>

    <!-- Satisfaction Guarantee -->
    <Guarantee
      v-if="about?.sections?.guarantee"
      :title="about.sections.guarantee.title"
      :content="about.sections.guarantee.content"
      :metrics="[
        { value: '30 Days', label: 'Money-Back Guarantee' },
        { value: '24/7',     label: 'Customer Support'    },
        { value: 'Lifetime', label: 'Course Access'       },
      ]"
    />

    <section class="relative overflow-hidden">
      <!-- 背景漸層 -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700"
      ></div>

      <div
        class="relative container mx-auto px-4 md:px-8 py-16 md:py-24 text-center text-white"
      >
        <!-- Title -->
        <h2
          class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight whitespace-pre-line"
        >
          {{ about.sections.cta.title }}
        </h2>

        <!-- Content -->
        <p
          class="mx-auto max-w-3xl text-base md:text-xl leading-relaxed opacity-95 mb-10"
        >
          {{ about.sections.cta.content }}
        </p>

        <!-- 單一 CTA 按鈕 -->
        <button
          class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600
             text-white font-semibold rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg transition"
        >
          Start Learning Today
          <i class="fa-solid fa-arrow-right text-sm md:text-base"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, get } from 'firebase/database'
import { app } from '@/services/firebase'         // 你的 firebase 初始化檔
import Guarantee from '@/components/Guarantee.vue'


import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const modules = [Navigation, Pagination, Autoplay];

const about = ref(null)

onMounted(async () => {
  const db = getDatabase(app)
  const snap = await get(dbRef(db, 'about'))
  if (snap.exists()) {
    about.value = snap.val()
  }

})


const metrics = [
  { value: '2M+', label: 'Learners' },
  { value: '500+', label: 'Courses' },
  { value: '99%', label: 'Satisfaction' }
]

const guaranteeMetrics = [
  { value: '30 Days', label: 'Money-Back Guarantee' },
  { value: '24/7',     label: 'Customer Support'    },
  { value: 'Lifetime', label: 'Course Access'       },
]
</script>
