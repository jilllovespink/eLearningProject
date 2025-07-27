<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full px-4 py-2 rounded-md border"
    />
    <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>

    <p v-if="emailMeta.touched && emailError" class="text-red-500 text-sm">
      {{ emailError }}
    </p>
    <p
      v-if="passwordMeta.touched && passwordError"
      class="text-red-500 text-sm"
    >
      {{ passwordError }}
    </p>

    <input
      v-model="password"
      type="password"
      placeholder="密碼"
      class="w-full px-4 py-2 rounded-md border"
    />
    <p v-if="passwordError" class="text-red-500 text-sm">
      {{ passwordError }}
    </p>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
    >
      登入
    </button>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'

import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('請輸入有效的 Email').required('Email 為必填'),
  password: yup
    .string()
    .required('密碼為必填')
    .min(6, '密碼至少 6 碼')
    .max(15, '密碼最多 15 碼')
    .matches(/^[a-zA-Z0-9]+$/, '只能包含大小寫英文字母與數字'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
    validateOnMount: true,

})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const emit = defineEmits(['submit'])

const submitForm = handleSubmit((formData) => {

  emit('submit', formData)
})
</script>
