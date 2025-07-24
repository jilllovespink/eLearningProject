<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-80">
      <h1 class="text-xl font-semibold mb-6 text-center">登入</h1>

      <LoginForm @submit="handleLogin" />

      <p v-if="errorMsg" class="mt-4 text-sm text-red-500 text-center">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginForm from '@/components/LoginForm.vue'


const errorMsg = ref('')
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()



const handleLogin = async ({ email, password }) => {
errorMsg.value = "";
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    if (!res.ok) {
    const errorData = await res.json().catch(() => null);
      errorMsg.value = errorData?.error || "登入失敗，請檢查帳號密碼";
      return;
    }

    const data = await res.json();
    authStore.login(data); // 寫入 pinia store

    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (err) {
    alert(err.message);
    errorMsg.value = "登入失敗，請檢查帳號與密碼是否正確。";
  }
};
</script>
