import { ref } from 'vue'
import * as recipeService from '@/services/recipeService'
import type { Recipe } from '@/types/RecipeTypes'

const recipes = ref<Recipe[]>([])

export function useRecipes() {
  const singleRecipe = ref<Recipe | null>(null)

  async function fetchRecipes() {
    const data = await recipeService.getRecipes()
    recipes.value = data
  }

  async function fetchRecipe(id: string) {
    const data = await recipeService.getRecipeById(id)
    singleRecipe.value = data
  }

  async function addRecipe(payload: any) {
    await recipeService.createRecipe(payload)
    await fetchRecipes()
  }

  async function editRecipe(recipeId: string, inputData: Recipe) {
    await recipeService.updateRecipe(recipeId, inputData)
    await fetchRecipes()
  }

  async function deleteRecipe(recipeId: string) {
    await recipeService.deleteRecipe(recipeId)
    await fetchRecipes()
  }

  return {
    recipes,
    singleRecipe,
    fetchRecipes,
    fetchRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe
  }
}
