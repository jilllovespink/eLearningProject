<template>
  <!-- Satisfaction Guarantee -->
  <section class="bg-blue-600 py-16 text-white">
    <div class="container mx-auto px-6 text-center">
      <!-- 白色圓形 Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-white p-6 rounded-full">
          <i :class="iconClass" :style="{ color: iconColor }"></i>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {{ title }}
      </h2>

      <!-- Content -->
      <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed">
        {{ content }}
      </p>

      <!-- Three Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(g, i) in metrics" :key="i" class="space-y-1">
          <div class="text-2xl md:text-3xl font-extrabold">
            {{ g.value }}
          </div>
          <div class="text-sm opacity-80">
            {{ g.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * 可重用保證區塊
 * - 由父層傳入 title / content / metrics
 * - Icon 可用 Font Awesome class 與顏色微調
 */
const props = defineProps({
  title: {
    type: String,
    default: '30-Day Satisfaction Guarantee',
  },
  content: {
    type: String,
    default:
      'Try any course for 30 days. If it’s not a fit, get a full refund—no questions asked.',
  },
  metrics: {
    type: Array,
    default: () => ([
      { value: '30 Days', label: 'Money-Back Guarantee' },
      { value: '24/7',     label: 'Customer Support'    },
      { value: 'Lifetime', label: 'Course Access'       },
    ]),
  },
  iconClass: {
    type: String,
    default: 'fa-solid fa-shield-halved fa-beat text-4xl',
  },
  iconColor: {
    type: String,
    default: '#0a57db',
  },
})
</script>
