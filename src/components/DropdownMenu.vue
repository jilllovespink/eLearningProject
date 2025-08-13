<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button
      class="text-sm font-medium hover:text-blue-600 px-10 py-1 rounded transition-colors"
      @click="!isDesktop && (show = !show)"
    >
      {{ label }} ▼
    </button>

    <div
      v-if="show"
      ref="dropdownRef"
      class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 min-w-[180px] z-50"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @click="handleClick(item)"
          class="px-10 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer whitespace-nowrap"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref as vueRef, onMounted, onBeforeUnmount } from 'vue'
import { database } from '@/services/firebase'
import { get, ref as dbRef } from 'firebase/database'

const items = vueRef([])
const show = vueRef(false)
const isDesktop = vueRef(true)
const dropdownRef = vueRef(null)

const props = defineProps({
  label: String,             // 選單標題，例如「探索課程」
  onItemClick: Function      // 點擊選項後的處理函式
})

let hideTimeout = null  // 延遲關閉用的 timeout ID


function updateDeviceType() {
  isDesktop.value = window.innerWidth >= 768
}

function handleClick(item) {
  props.onItemClick?.(item)
  show.value = false
}

function handleClickOutside(e) {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target) &&
    !e.target.closest('button')
  ) {
    show.value = false
  }
}
function handleMouseEnter() {
  if (isDesktop.value) {
    clearTimeout(hideTimeout)
    show.value = true
  }
}

function handleMouseLeave() {
  if (isDesktop.value) {
    hideTimeout = setTimeout(() => {
      show.value = false
    }, 200)
  }
}


onMounted(async () => {
  updateDeviceType()
  window.addEventListener('resize', updateDeviceType)
  document.addEventListener('click', handleClickOutside)


try {
    const snapshot = await get(dbRef(database, 'categories'))
    if (snapshot.exists()) {
      const data = snapshot.val()
      items.value = Object.entries(data).map(([id, value]) => ({
        id,
        name: value.name
      }))
    }
  } catch (err) {
    console.error('無法讀取 categories:', err)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDeviceType)
  document.removeEventListener('click', handleClickOutside)
    clearTimeout(hideTimeout)
})
</script>
