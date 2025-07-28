<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button
      class="text-sm font-medium hover:text-biue-600 px-2 py-1 rounded transition-colors"
      @click="!isDesktop && (show = !show)"
    >
      {{ label }} ▼
    </button>

    <div
      v-if="show"
      ref="dropdownRef"
      class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md p-2 min-w-[180px] z-50"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @click="handleClick(item)"
          class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  label: String,             // 選單標題，例如「探索課程」
  items: Array,              // 要顯示的選項，格式：[{ id, name }]
  onItemClick: Function      // 點擊選項後的處理函式
})

const show = ref(false)
const isDesktop = ref(true)
const dropdownRef = ref(null)

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


onMounted(() => {
  updateDeviceType()
  window.addEventListener('resize', updateDeviceType)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDeviceType)
  document.removeEventListener('click', handleClickOutside)
    clearTimeout(hideTimeout)
})
</script>
