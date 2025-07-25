<template>
  <SidebarBrand v-if="isBrandDashboard" />
  <SidebarUser v-else-if="isUserDashboard" />
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import SidebarBrand from './SidebarBrand.vue'
import SidebarUser from './SidebarUser.vue'

const authStore = useAuthStore()
const route = useRoute()

const role = computed(() => authStore.role)

const isBrandDashboard = computed(() =>
  role.value === 'Brand' && route.path.startsWith('/brand/dashboard')
)

const isUserDashboard = computed(() =>
  role.value === 'User' && route.path.startsWith('/user/dashboard')
)
</script>
