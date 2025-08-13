<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { useRecipes } from '@/composables/useRecipes'
import RecipeCard from './RecipeCard.vue'
import type { Recipe } from '@/types/RecipeTypes'

defineProps<{
  recipeCount: number
  recipeView: 'cards' | 'list'
  filteredRecipes: Recipe[]
  openRecipe: (recipe: Recipe) => void
}>()

const { deleteRecipe } = useRecipes()
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
      @openRecipe="openRecipe"
      @click="openRecipe(recipe)"
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
            class="hover:bg-gray-50 cursor-pointer h-full align-middle"
            @click="openRecipe(recipe)"
          >
            <td class="px-6 py-4 w-3/8">
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
            <td class="px-6 py-4 w-2/8">
              <div class="flex items-center flex-wrap gap-1">
                <span v-if="recipe.categories?.length == 0" class="text-xs text-gray-500">
                  N/A
                </span>
                <span
                  v-for="category in recipe.categories?.slice(0, 5)"
                  :key="category"
                  class="bg-gray-100 px-2 py-1 rounded-full text-xs"
                >
                  {{ category }}
                </span>
                <span v-if="(recipe.categories?.length ?? 0) > 5" class="-ml-1">…</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 w-1/8">{{ recipe.prep_time }} min</td>
            <td class="px-6 py-4 text-sm text-gray-900 w-1/8">
              <div class="flex items-center">
                <Star class="h-4 w-4 text-yellow-400 mr-1" />
                {{ recipe.user_rating }}
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 w-1/8">
              <div class="flex flex-col items-start space-y-1">
                <button
                  @click.stop="$router.push({ name: 'recipe-edit', params: { id: recipe.id } })"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  @click.stop="deleteRecipe(recipe.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
