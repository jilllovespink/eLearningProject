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

const handleLogin = async () => {
errorMsg.value = "";
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });


    if (!res.ok) {
    const errorData = await res.json().catch(() => null);
      errorMsg.value = errorData?.error || "登入失敗，請檢查帳號密碼";
      console.log('錯誤訊息：', errorMsg.value);
      return;
    }

    const data = await res.json();
    authStore.login(data); // 寫入 pinia store
    if (data.role === "User") {
      router.push("/user/dashboard");
    } else if (data.role === "Brand") {
      router.push("/brand/dashboard");
    }
  } catch (err) {
    alert(err.message);
    errorMsg.value = "登入失敗，請檢查帳號與密碼是否正確。";
  }
};
</script>
