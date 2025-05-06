export function useTasks() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // Fetch all tasks
  const fetchTasks = () => useFetch(`${apiBase}/tasks`)

  // Create a task
  const createTask = (task: { title: string; description: string }) => {
    return $fetch(`${apiBase}/tasks`, {
      method: 'POST',
      body: task
    })
  }

  // Update task (mark as complete/incomplete)
  const updateTask = (id: number, data: { completed: boolean }) => {
    return $fetch(`${apiBase}/tasks/${id}`, {
      method: 'PUT',
      body: data
    })
  }

  // Delete task
  const deleteTask = (id: number) => {
    return $fetch(`${apiBase}/tasks/${id}`, {
      method: 'DELETE'
    })
  }

  // Get single task
  const getTask = (id: number) => useFetch(`${apiBase}/tasks/${id}`)

  return {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
  }
}
