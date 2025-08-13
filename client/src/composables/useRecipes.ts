import { ref } from 'vue'
import * as recipeService from '@/services/recipeService'
import type { Recipe } from '@/types/RecipeTypes'

const recipes = ref<Recipe[]>([])

export function useRecipes() {
  async function fetchRecipes() {
    const data = await recipeService.getRecipes()
    recipes.value = data
  }

  return {
    recipes,
    fetchRecipes
  }
}
