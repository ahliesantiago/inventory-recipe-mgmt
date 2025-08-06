<script setup lang="ts">
import { Clock, Star } from 'lucide-vue-next'

defineProps<{
  recipe: {
    id: number
    name: string
    description: string
    image: string
    rating: number
    category: string
    prepTime: number
  }
}>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
  >
    <div class="aspect-video bg-gray-200 relative">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
        <Star class="h-3 w-3 text-yellow-400 mr-1" />
        {{ recipe.rating }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ recipe.name }}</h3>
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ recipe.description }}</p>
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span class="bg-gray-100 px-2 py-1 rounded-full">{{ recipe.category }}</span>
        <div class="flex items-center">
          <Clock class="h-3 w-3 mr-1" />
          {{ recipe.prepTime }}min
        </div>
      </div>
    </div>
  </div>
</template>