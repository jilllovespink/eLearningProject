<template>
  <main class="min-h-[70vh] flex items-center">
    <section class="container mx-auto px-4 md:px-8 text-center">
      <!-- 細線 -->
      <div
        class="h-1 w-24 md:w-40 bg-blue-600/70 mx-auto my-6 rounded-full"
      ></div>

      <!-- 標題與說明 -->
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
        This page is still under construction.
      </h1>
      <p class="text-gray-600 mt-3 max-w-2xl mx-auto">
        Sorry, we couldn't find the page you're looking for. The page may have
        been moved, deleted, or you may have entered an incorrect URL.
      </p>

      <!-- 按鈕 -->
      <div class="mt-8 flex items-center justify-center gap-3">
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
        >
          Back to Homepage
        </router-link>

        <router-link
          to="/courses"
          class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 transition"
        >
          Browse All Courses
        </router-link>
      </div>
    </section>
  </main>
</template>
