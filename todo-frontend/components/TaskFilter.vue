<template>
  <h1 class="pt-5 text-3xl font-bold text-center">My Tasks</h1>
  <div class="flex justify-center gap-4">
    <button
      v-for="type in ['all', 'active', 'completed']"
      :key="type"
      @click="$emit('set-filter', type)"
      :class="btnClass(type)"
    >
      <FontAwesomeIcon :icon="getIcon(type)" />
      {{ type.charAt(0).toUpperCase() + type.slice(1) }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["set-filter"]);

const btnClass = (type) =>
  `w-40 px-4 py-2 rounded transition-colors duration-200 ${
    props.modelValue === type
      ? "bg-indigo-500 text-white"
      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
  }`;

// Function to return the relevant icon based on the type
const getIcon = (type) => {
  switch (type) {
    case 'all':
      return 'list' // List icon for "All"
    case 'active':
      return 'circle' // Circle icon for "Active"
    case 'completed':
      return 'check-circle' // Check-circle for "Completed"
    default:
      return 'list'
  }
}
</script>
