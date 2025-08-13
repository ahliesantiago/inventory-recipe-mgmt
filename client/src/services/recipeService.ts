import axios from 'axios'
import type { Recipe } from '@/types/RecipeTypes'

const API_URL = 'http://localhost:3000/api/recipes'

export async function getRecipes() {
  const res = await axios.get(API_URL)
  return res.data
}

export async function getRecipeById(id: string) {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export async function createRecipe(inputData: Recipe) {
  const res = await axios.post(API_URL, inputData)
  return res.data
}

export async function updateRecipe(recipeId: string, inputData: Recipe) {
  const res = await axios.put(`${API_URL}/${recipeId}`, inputData)
  return res.data
}

export async function deleteRecipe(recipeId: string) {
  await axios.delete(`${API_URL}/${recipeId}`)
}
