<script setup lang="ts">
import type { Recipe } from '@/types/RecipeTypes'
import RecipeCard from './RecipeCard.vue'
import { Star } from 'lucide-vue-next'

defineProps<{
  recipeCount: number
  recipeView: 'cards' | 'list'
  filteredRecipes: Recipe[]
}>()
</script>

<template>
  <p v-if="recipeCount === 0" class="text-gray-500 text-center mt-6">
    No recipes found. Add your first recipe to get started!
  </p>

  <p v-if="recipeCount > 0 && filteredRecipes.length === 0" class="text-gray-500 text-center mt-6">
    No recipes found matching your criteria.
  </p>

  <!-- Recipe Cards View -->
  <div v-if="recipeView === 'cards' && filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <RecipeCard
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>

  <!-- Recipe List View -->
  <div v-else-if="recipeView === 'list' && filteredRecipes.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prep Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            class="hover:bg-gray-50 cursor-pointer"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img
                  v-if="recipe.image"
                  :src="recipe.image"
                  :alt="recipe.recipe_name"
                  class="h-12 w-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ recipe.recipe_name }}</div>
                  <div class="text-sm text-gray-500 line-clamp-1">{{ recipe.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 flex items-center space-x-2 space-y-1 flex-wrap">
              <span
                v-for="category in recipe.categories?.slice(0, 5)"
                class="bg-gray-100 px-2 py-1 rounded-full text-xs"
              >
                {{ category }}
              </span>
              <span v-if="(recipe.categories?.length ?? 0) > 5" class="-ml-1">…</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ recipe.prep_time }} min</td>
            <td class="px-6 py-4 text-sm text-gray-900">
              <div class="flex items-center">
                <Star class="h-4 w-4 text-yellow-400 mr-1" />
                {{ recipe.user_rating }}
              </div>
            </td>
            <!-- To be implemented -->
            <td class="px-6 py-4 text-sm text-gray-900">
              <button class="text-blue-600 hover:text-blue-800 mr-3">
                Edit
              </button>
              <button class="text-red-600 hover:text-red-800">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>