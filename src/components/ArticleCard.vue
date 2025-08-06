<template>
  <RouterLink
    :to="`/articles/${article.site}`"
    class="group flex bg-white rounded-2xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md"
  >
    <div class="w-1/3 min-w-[120px] aspect-[4/3] relative overflow-hidden">
      <img
        :src="article.pictureURL || '/placeholder.jpg'"
        :alt="article.title"
        class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div class="p-4 flex flex-col justify-center w-2/3">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-1">
        <span
          class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full capitalize"
        >
          {{ categoryName }}
        </span>
        <span>3 min read</span>
      </div>

      <h3
        class="text-base font-semibold mb-1 line-clamp-2 transition-colors duration-300 group-hover:text-blue-600"
      >
        {{ article.title }}
      </h3>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ previewText }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
import { marked } from "marked";
import { computed } from "vue";

const { article, categoriesMap } = defineProps({
  article: { type: Object, required: true },
  categoriesMap: { type: Object, required: true },
});

// 將 category id 轉為 readable name
const categoryName = computed(() => {
  return categoriesMap[article.category] || "Unknown";
});

// 將 markdown 轉為純文字預覽內容
const previewText = computed(() => {
  const html = marked(article.content || "");
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").slice(0, 100) + "...";
});
</script>
