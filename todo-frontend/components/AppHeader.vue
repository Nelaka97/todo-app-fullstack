<template>
  <header class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">📝 ToDo App</h1>
    <button
      @click="toggleDarkMode"
      class="text-sm px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {{ isDark ? '☀ Light' : '🌙 Dark' }}
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
