<!-- <template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-80">
      <h1 class="text-xl font-semibold mb-6 text-center">登入</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <input
          v-model="password"
          type="password"
          placeholder="密碼"
          required
          class="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// 登入成功的函式onLoginSuccess，把登入資料存到pinia的login裡
function onLoginSuccess(response){
    const { token, role, user } = response
    authStore.login({ token, role, user })
}
</script> -->

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-80">
      <h1 class="text-xl font-semibold mb-6 text-center">登入</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <input
          v-model="password"
          type="password"
          placeholder="密碼"
          class="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
        >
          登入
        </button>
      </form>
      <p v-if="errorMsg" class="mt-4 text-sm text-red-500 text-center">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// 暫存帳密
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const authStore = useAuthStore()
const router = useRouter()

// 模擬登入
function handleLogin() {
  if (email.value === 'test@example.com' && password.value === '123456') {
    // 模擬登入回傳資料
    const mockResponse = {
      token: 'mock-token',
      role: 'Brand', // 或改成 'Brand' 試試看
      user: { name: '測試用戶' },
    }

    authStore.login(mockResponse)

    // 根據角色導頁
    if (mockResponse.role === 'User') {
      router.push('/user/dashboard')
    } else if (mockResponse.role === 'Brand') {
      router.push('/brand/dashboard')
    }
  } else {
    errorMsg.value = '帳號或密碼錯誤'
  }
}
</script>
