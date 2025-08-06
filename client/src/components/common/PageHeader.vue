<script setup lang="ts">
import { Grid3X3, List } from 'lucide-vue-next'

defineProps<{
  title: string
  description: string
  hasToggles?: boolean
  view?: 'cards' | 'list'
}>()

defineEmits<{
  (e: 'update:view', view: 'cards' | 'list'): void
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
    <div>
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
      <p class="text-gray-600">{{ description }}</p>
    </div>

    <!-- Optional View Toggle -->
    <div v-if="hasToggles" class="flex items-center space-x-4 mt-4 sm:mt-0">
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
          @click="$emit('update:view', 'cards')"
          :class="[
            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
            view === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          ]"
        >
          <Grid3X3 class="h-4 w-4" />
        </button>
        <button
          @click="$emit('update:view', 'list')"
          :class="[
            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
            view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          ]"
        >
          <List class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>