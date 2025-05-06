<template>
  <form @submit.prevent="$emit('add')" class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
    <input
      type="text"
      v-model="title"
      placeholder="Task title"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required
    />
    <textarea
      v-model="description"
      placeholder="Task description (optional)"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    ></textarea>
    <button
      type="submit"
      class="w-40 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
    >
      <FontAwesomeIcon icon="plus" /> Add Task
    </button>
  </form>
</template>

<script setup>
const title = defineModel('title')
const description = defineModel('description')
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>