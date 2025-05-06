<template>
  <div class="bg-white dark:bg-gray-800 shadow p-4 rounded flex justify-between items-center transition-all">
    <div>
      <h2 :class="{ 'line-through text-gray-400': task.completed }" class="font-semibold text-gray-800 dark:text-white">{{ task.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-300">{{ task.description }}</p>
      <p class="text-[11px] text-gray-500 dark:text-gray-300 pt-2">
        {{ formatDate(task.created_at) }}
      </p>
    </div>
    <div class="flex gap-2 items-center">
      <button
        @click="$emit('toggle', task)"
        class="w-20 py-1 text-sm rounded bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 transition flex items-center justify-center gap-1"
      >
        <FontAwesomeIcon :icon="task.completed ? ['fas', 'rotate-left'] : ['fas', 'check']" />
        {{ task.completed ? 'Undo' : 'Done' }}
      </button>
      <button
        @click="$emit('delete', task.id)"
        class="w-20 py-1 text-sm rounded bg-rose-500 dark:bg-rose-600 text-white hover:bg-rose-600 dark:hover:bg-rose-700 transition"
      >
        <FontAwesomeIcon :icon="['fas', 'trash']" /> Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['task'])

// date formatting
function formatDate(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const time = `${String(hours).padStart(2, '0')}.${minutes}${ampm}`

  return `${day}.${month}.${year} at ${time}`
}
</script>
