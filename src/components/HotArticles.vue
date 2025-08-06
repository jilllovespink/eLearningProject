<template>
  <div class="bg-gray-50">
    <section class="max-w-screen-xl mx-auto py-20 px-4">
      <h2 class="text-3xl font-bold text-center mb-2">Hot Articles</h2>
      <p class="text-center text-gray-600 mb-8">
        Stay updated with the latest trends and insights in learning
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArticleCard
          v-for="article in displayedArticles"
          :key="article.site"
          :article="article"
          :categoriesMap="categoriesMap"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDatabase, ref as dbRef, get, child } from "firebase/database";
import ArticleCard from "@/components/ArticleCard.vue";

// Firebase refs
const db = getDatabase();
const displayedArticles = ref([]);
const categoriesMap = ref({});

onMounted(async () => {
  const snapshot = await get(child(dbRef(db), "/"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    const allArticles = Object.values(data.articles || {});
    const allCategories = Object.values(data.categories || {});

    // 🔁 Create category ID → name mapping
    categoriesMap.value = allCategories.reduce((map, cat) => {
      map[cat.id] = cat.name;
      return map;
    }, {});

    // 🔀 Randomly pick 4 articles
    displayedArticles.value = allArticles
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }
});
</script>
