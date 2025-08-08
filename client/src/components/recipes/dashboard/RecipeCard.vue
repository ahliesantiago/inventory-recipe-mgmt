<script setup lang="ts">
import { Clock, Star, UtensilsCrossed } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Recipe } from '@/types/RecipeTypes'

const props = defineProps<{
  recipe: Recipe
}>()

const formattedTime = computed(() => {
  const totalMinutes = props.recipe.total_time
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}min`
  } else if (minutes === 0) {
    return `${hours}h`
  } else {
    return `${hours}h ${minutes}min`
  }
})
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
  >
    <div class="aspect-video bg-gray-200 relative">
      <img
        v-if="recipe.image"
        :src="recipe.image"
        :alt="recipe.recipe_name"
        class="w-full h-full object-cover"
      />
      <UtensilsCrossed v-if="!recipe.image" class="w-full h-full text-gray-400 flex items-center justify-center" />
      <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
        <Star class="h-3 w-3 text-yellow-400 mr-1" />
        {{ recipe.user_rating }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ recipe.recipe_name }}</h3>
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ recipe.description }}</p>
      <div class="flex items-center justify-between text-xs text-gray-500">
        <div class="flex items-center space-x-2">
          <span v-for="category in recipe.categories?.slice(0, 3)" class="bg-gray-100 px-2 py-1 rounded-full">
            {{ category }}
          </span>
          <span v-if="(recipe.categories?.length ?? 0) > 3" class="-ml-2">…</span>
        </div>
        <div class="flex items-center">
          <Clock class="h-3 w-3 mr-1" />
          {{ formattedTime }}
        </div>
      </div>
    </div>
  </div>
</template>