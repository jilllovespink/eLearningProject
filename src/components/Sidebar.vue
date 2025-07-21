<template>
  <aside class="w-64 bg-white border-r p-4">
    <nav>
      <ul class="space-y-2">
        <!-- for user     -->
        <li v-if="authStore.role === 'User'">
          <router-link to="/user/dashboard" class="block hover:underline"
            >使用者首頁</router-link
          >
        </li>

        <!-- for brand     -->
        <li v-if="authStore.role === 'Brand'">
          <router-link to="/brand/dashboard" class="block hover:underline"
            >品牌後台</router-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
