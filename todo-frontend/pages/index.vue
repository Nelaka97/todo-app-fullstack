<template>

  <LoadingOverlay v-if="isLoading" />

  <div v-else class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <AppHeader />

    <main class="flex-grow">
      <div class="max-w-3xl mx-auto p-6 space-y-6">
        <h1 class="pt-5 text-3xl font-bold text-center">Add New Task</h1>

        <TaskForm v-model:title="newTask.title" v-model:description="newTask.description" @add="createTask" />

        <TaskFilter v-model="filter" @set-filter="filter = $event" />

        <TransitionGroup name="list" tag="div" class="space-y-3">
          <TaskItem v-for="task in paginatedTasks" :key="task.id" :task="task" @toggle="toggleComplete"
            @delete="deleteTask" />
        </TransitionGroup>

        <!-- No items text -->
        <div v-if="filteredTasks.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
          {{ filterMessage }}
        </div>

        <!-- Pagination Controls -->
        <div v-else class="flex justify-center items-center gap-4 mt-6">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50">
            ◀ Prev
          </button>
          <span class="text-gray-600 dark:text-gray-300">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50">
            Next ▶
          </button>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import TaskForm from '~/components/TaskForm.vue'
import TaskItem from '~/components/TaskItem.vue'
import TaskFilter from '~/components/TaskFilter.vue'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const toast = useToast()

const tasks = ref([])
const newTask = ref({ title: '', description: '' })
const filter = ref('all')

// Pagination
const currentPage = ref(1)
const tasksPerPage = 5

const fetchTasks = async () => {
  try {
    const res = await axios.get(`${apiBase}/tasks`)
    tasks.value = res.data.map(task => ({
      ...task,
      completed: !!task.is_completed
    }))
  } catch (err) {
    toast.error('Failed to load tasks')
  }
}

// create task
const createTask = async () => {
  try {
    const res = await axios.post(`${apiBase}/tasks`, newTask.value)
    tasks.value.unshift({ ...res.data, completed: !!res.data.is_completed })
    newTask.value.title = ''
    newTask.value.description = ''
    toast.success('Task added')
  } catch {
    toast.error('Failed to add task')
  }
}

// toggle complete
const toggleComplete = async (task) => {
  try {
    const updated = { ...task, is_completed: task.completed ? 0 : 1 }
    const res = await axios.put(`${apiBase}/tasks/${task.id}`, updated)
    const updatedTask = { ...res.data, completed: !!res.data.is_completed }

    const index = tasks.value.findIndex(t => t.id === task.id)
    tasks.value[index] = updatedTask
    toast.success(`Marked as ${updatedTask.completed ? 'completed' : 'active'}`)
  } catch {
    toast.error('Failed to update task')
  }
}

// delete task
const deleteTask = async (id) => {
  try {
    await axios.delete(`${apiBase}/tasks/${id}`)
    tasks.value = tasks.value.filter(t => t.id !== id)
    toast.success('Task deleted')
  } catch {
    toast.error('Failed to delete task')
  }
}

// filtered tasks
const filteredTasks = computed(() => {
  const all = tasks.value
  if (filter.value === 'active') return all.filter(t => !t.completed)
  if (filter.value === 'completed') return all.filter(t => t.completed)
  return all
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / tasksPerPage)))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage
  const end = start + tasksPerPage
  return filteredTasks.value.slice(start, end)
})

const filterMessage = computed(() => {
  if (filter.value === 'active') return 'No active tasks!'
  if (filter.value === 'completed') return 'No completed tasks!'
  return 'No tasks to display!'
})

// Reset to page 1 when filter changes
watch(filter, () => {
  currentPage.value = 1
})

onMounted(fetchTasks)

// Loading spinner
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

// Theme settings
const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' || !savedTheme) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
