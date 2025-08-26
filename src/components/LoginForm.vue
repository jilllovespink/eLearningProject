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
      placeholder="password"
      class="w-full px-4 py-2 rounded-md border"
    />
    <p v-if="passwordError" class="text-red-500 text-sm">
      {{ passwordError }}
    </p>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
    >
      Login
    </button>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'

import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Please enter a valid Email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed'),
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
