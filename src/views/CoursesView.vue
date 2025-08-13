<template>
  <div>
    <section class="bg-white">
      <div class="container mx-auto px-4 md:px-8 py-6 md:py-8 text-center">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">
          {{ headerTitle }}
        </h1>
        <p
          v-if="headerSubtitle"
          class="hidden sm:block mx-auto max-w-3xl text-gray-600 text-base md:text-lg mt-2"
        >
          {{ headerSubtitle }}
        </p>
      </div>

      <!-- Sticky categories bar -->
      <div
        class="sticky top-14 z-20 bg-white/90 backdrop-blur border-t border-b border-gray-200"
      >
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar"
          >
            <button
              v-for="c in normalizedCategories"
              :key="c.id"
              @click="setActive(c.id)"
              class="shrink-0 rounded-full border transition px-3 py-1.5 text-sm hover:bg-blue-50"
              :class="c.id === activeCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'"
            >
              {{ c.label }}
              <span class="ml-1 text-xs opacity-80">({{ c.total }})</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 課程清單 ===== -->
    <section class="bg-gray-50">
      <div class="container mx-auto px-4 md:px-8 py-8">
        <!-- Loading / Error -->
        <div v-if="loading" class="text-center text-gray-500 py-10">
          Loading courses…
        </div>
        <div v-else-if="error" class="text-center text-red-600 py-10">
          {{ error }}
        </div>

        <!-- Grid -->
        <div v-else>
          <div
            v-if="pagedCourses.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <CourseCard v-for="c in pagedCourses" :key="c.id" :course="c" />
          </div>
          <div v-else class="text-center text-gray-500 py-10">
            No courses found.
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-2 mt-6"
          >
            <button
              class="px-3 py-1.5 rounded border"
              :disabled="page===1"
              @click="page--"
            >
              Prev
            </button>

            <button
              v-for="n in totalPages"
              :key="n"
              class="w-9 h-9 rounded-full border"
              :class="n===page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'"
              @click="page=n"
            >
              {{ n }}
            </button>

            <button
              class="px-3 py-1.5 rounded border"
              :disabled="page===totalPages"
              @click="page++"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
    <Guarantee
      :title="guaranteeTitle"
      :content="guaranteeContent"
      :metrics="[
        { value: '30 Days', label: 'Money-Back Guarantee' },
        { value: '24/7',     label: 'Customer Support'    },
        { value: 'Lifetime', label: 'Course Access'       },
      ]"
    />
  </div>
</template>

<script setup>


import { ref, computed, watch, onMounted } from 'vue'
import CourseCard from '@/components/CourseCard.vue'

import { getApp } from 'firebase/app'
import { getDatabase, ref as dbRef, child, get } from 'firebase/database'

const app = getApp()
const database = getDatabase(app)  // 從既有 app 取得 RTDB

import Guarantee from '@/components/Guarantee.vue'

const guaranteeTitle = '30-Day Money-Back Guarantee'
const guaranteeContent = 'Enroll with confidence. If the course isn’t right for you, get a full refund within 30 days.'


/* Header 文案（原 CoursesHeader 的 props） */
const headerTitle = 'Browse All Courses'
const headerSubtitle = 'Discover our most popular courses chosen by thousands of learners.'

/* 狀態 */
const loading = ref(true)
const error = ref('')

/* Firebase 資料（標準化後） */
const categories = ref([]) // [{ id:'c1', name:'Digital Marketing', icon?, description? }]
const courses = ref([])    // [{ id:'algorithms-data-structures', title, description, instructorId, categoryId:'c2', categoryName:'...', ... }]

/* 互動 */
const activeCategory = ref('all')  // 使用 categories 的 id（例如 'c2'）
const searchQuery = ref('')

/* 類別映射（id -> 顯示名稱） */
const categoryNameById = computed(() => {
  const map = new Map()
  for (const c of categories.value) map.set(c.id, c.name || c.id)
  return map
})

/* 類別按鈕（依實際 courses 計數；加上 All） */
const normalizedCategories = computed(() => {
  const counts = new Map()
  for (const course of courses.value) {
    const cid = course.categoryId || 'uncategorized'
    counts.set(cid, (counts.get(cid) || 0) + 1)
  }

  const list = categories.value.map(c => ({
    id: c.id,
    label: c.name || c.id,
    total: counts.get(c.id) || 0
  }))

  // 只顯示存在於 courses 的分類（若某分類沒有任何課程，可視需求保留/隱藏）
  // 這裡選擇保留（即使 0），若你想隱藏，把下面 filter 打開：
  // const list = categories.value
  //   .filter(c => (counts.get(c.id) || 0) > 0)
  //   .map(c => ({ id: c.id, label: c.name || c.id, total: counts.get(c.id) || 0 }))

  const totalAll = courses.value.length
  return [{ id: 'all', label: 'All Courses', total: totalAll }, ...list]
})

function setActive(id) {
  activeCategory.value = id
}

/* 分頁 */
const page = ref(1)
const perPage = 9

/* 篩選（依分類 id 與關鍵字） */
const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return courses.value.filter(c => {
    const inCategory = activeCategory.value === 'all'
      ? true
      : (c.categoryId === activeCategory.value)

    if (!q) return inCategory

    const haystack = [
      c.title,
      c.description,
      c.instructorId,
      c.categoryName
    ].filter(Boolean).join(' ').toLowerCase()

    return inCategory && haystack.includes(q)
  })
})

/* 分頁計算 */
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const pagedCourses = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

/* 條件變更回到第一頁 */
watch([activeCategory, searchQuery], () => { page.value = 1 })

/* 讀取 RTDB 資料（/courses 與 /categories） */
onMounted(async () => {
  try {
    loading.value = true
    error.value = ''

    const root = dbRef(database)
    const [coursesSnap, categoriesSnap] = await Promise.all([
      get(child(root, 'courses')),
      get(child(root, 'categories'))
    ])

    // 讀 courses：/courses/<slug>
    const rawCourses = coursesSnap.exists() ? coursesSnap.val() : {}
    const courseArr = objectToArrayWithKey(rawCourses) // [{ _key, ...course }]
    // 先把 categoryId 抽出，稍後補上 categoryName
    let tmpCourses = courseArr.map(item => {
      const categoryId =
        item?.category?.id ??
        item?.categoryId ??
        (typeof item?.category === 'string' ? item.category : '') // 若是字串
      return {
        id: item.id ?? item._key,
        ...item,
        categoryId
      }
    })

    // 讀 categories：/categories/<id>
    const rawCategories = categoriesSnap.exists() ? categoriesSnap.val() : {}
    const cats = objectToArrayWithKey(rawCategories).map(c => ({
      id: c.id ?? c._key,
      name: c.name ?? String(c.id ?? c._key),
      icon: c.icon ?? '',
      description: c.description ?? ''
    }))

    categories.value = cats

    // 依 categories map 補每門課的 categoryName（顯示/搜尋）
    const nameMap = new Map(cats.map(c => [c.id, c.name]))
    tmpCourses = tmpCourses.map(item => ({
      ...item,
      categoryName: nameMap.get(item.categoryId) || ''
    }))

    courses.value = tmpCourses
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load courses. Please try again later.'
  } finally {
    loading.value = false
  }
})

/* 工具：把 RTDB 的 object 轉陣列，並保留原 key（有些節點不一定有 id 欄位） */
function objectToArrayWithKey(obj) {
  if (!obj || typeof obj !== 'object') return []
  return Object.entries(obj).map(([k, v]) => ({ _key: k, ...v }))
}
</script>
