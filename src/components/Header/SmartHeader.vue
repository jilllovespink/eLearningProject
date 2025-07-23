<template>
  <HeaderUser v-if="authStore.token && authStore.role === 'User'" />
  <HeaderBrand v-else-if="authStore.token && authStore.role === 'Brand'" />
  <HeaderFront v-else />
</template>

<script setup>
import HeaderFront from './HeaderFront.vue';
import HeaderUser from './HeaderUser.vue';
import HeaderBrand from './HeaderBrand.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>
