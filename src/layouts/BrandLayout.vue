<template>
  <div class="min-h-screen flex flex-col">
    <SmartHeader />

    <div class="flex flex-1">
      <SmartSidebar />
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import SmartHeader from '@/components/Header/SmartHeader.vue'
import SmartSidebar from '@/components/Sidebar/SmartSidebar.vue'
</script>
